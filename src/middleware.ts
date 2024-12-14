import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'sha256-q1+DaXsZUnEJs3jpN9ZoWp6ypK1xBwXiRxG+C31xOUA=' 'strict-dynamic' 'unsafe-eval' 'unsafe-inline' ${process.env.NEXT_PUBLIC_API_URL?.slice(0, -3)};
    style-src 'self' 'unsafe-inline';
    connect-src 'self' https://region1.google-analytics.com ${process.env.NEXT_PUBLIC_API_URL?.slice(0, -3)} ${process.env.NEXT_PUBLIC_V3_API_URL?.slice(0, -3)} ${process.env.NEXT_PUBLIC_CHATBOT_API_URL ?? ''};
    img-src 'self' blob: data: https://static.hungermapdata.org https://dev.api.earthobservation.vam.wfp.org;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  requestHeaders.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
