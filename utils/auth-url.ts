export function getOrigin(request: Request): string {
  // 1. Check standard reverse proxy / Vercel forwarding headers
  const forwardedHost = request.headers.get('x-forwarded-host');
  const forwardedProto = request.headers.get('x-forwarded-proto') || 'https';
  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  // 2. Check Host header if available and not localhost when in production
  const host = request.headers.get('host');
  if (host) {
    const proto = (host.includes('localhost') || host.includes('127.0.0.1')) ? 'http' : 'https';
    if (!host.includes('localhost') && !host.includes('127.0.0.1')) {
      return `${proto}://${host}`;
    }
    if (process.env.NODE_ENV !== 'production') {
      return `${proto}://${host}`;
    }
  }

  // 3. Check Vercel system environment variable
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // 4. Check NEXTAUTH_URL or NEXT_PUBLIC_SITE_URL
  if (process.env.NEXTAUTH_URL && (!process.env.NEXTAUTH_URL.includes('localhost') || process.env.NODE_ENV !== 'production')) {
    return process.env.NEXTAUTH_URL.replace(/\/$/, '');
  }

  // 5. Fallback to request origin
  return new URL(request.url).origin;
}

export function getAuthRedirectUri(request: Request): string {
  return `${getOrigin(request)}/api/auth/callback`;
}
