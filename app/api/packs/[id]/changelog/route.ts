import { NextResponse } from 'next/server';
import { mpnPacks } from '../../../../../config/packs';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const pack = mpnPacks.find((p) => p.id === id);

  if (!pack?.changelogRepo) {
    return NextResponse.json({ error: 'No changelog configured for this pack' }, { status: 404 });
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${pack.changelogRepo}/contents/CHANGELOG.md`, {
      headers: {
        Accept: 'application/vnd.github.raw+json',
        'User-Agent': 'mpnhost.com',
      },
      // Re-fetched from GitHub at most once an hour; Next serves the cached
      // result to every visitor in between, so a new commit to CHANGELOG.md
      // shows up here within the hour with zero redeploy needed.
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Changelog not found on GitHub' }, { status: 502 });
    }

    const markdown = await res.text();
    return NextResponse.json({ markdown });
  } catch (err) {
    console.error('Changelog fetch error:', err);
    return NextResponse.json({ error: 'Failed to fetch changelog' }, { status: 500 });
  }
}
