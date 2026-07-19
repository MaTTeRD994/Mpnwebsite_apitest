export function getOrigin(request: Request): string {
  // 1. If NEXTAUTH_URL is explicitly set to a production domain (e.g., https://mpnhost.com or https://mpnwebsite-apitest.vercel.app)
  // Use it whenever we are NOT running on local development (localhost)
  if (process.env.NEXTAUTH_URL && !process.env.NEXTAUTH_URL.includes('localhost') && !process.env.NEXTAUTH_URL.includes('127.0.0.1')) {
    const rawHost = (request.headers.get('x-forwarded-host') || request.headers.get('host') || '').split(',')[0].trim();
    if (!rawHost.includes('localhost') && !rawHost.includes('127.0.0.1')) {
      return process.env.NEXTAUTH_URL.replace(/\/$/, '');
    }
  }

  // 2. Check standard reverse proxy / Vercel forwarding headers (split by comma in case multiple proxies append headers)
  const forwardedHost = request.headers.get('x-forwarded-host');
  const forwardedProto = request.headers.get('x-forwarded-proto') || 'https';
  if (forwardedHost) {
    const cleanHost = forwardedHost.split(',')[0].trim();
    const cleanProto = forwardedProto.split(',')[0].trim();
    return `${cleanProto}://${cleanHost}`;
  }

  // 3. Check Host header if available
  const host = request.headers.get('host');
  if (host) {
    const cleanHost = host.split(',')[0].trim();
    const proto = (cleanHost.includes('localhost') || cleanHost.includes('127.0.0.1')) ? 'http' : 'https';
    return `${proto}://${cleanHost}`;
  }

  // 4. Check Vercel system environment variables
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // 5. Fallback to NEXTAUTH_URL or request origin
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL.replace(/\/$/, '');
  }

  return new URL(request.url).origin;
}

export function getAuthRedirectUri(request: Request): string {
  return `${getOrigin(request)}/api/auth/callback`;
}
