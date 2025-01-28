import { NextRequest, NextResponse } from 'next/server';

/**
 * Removes any subpaths or paramaters from an URL and returns just the protocol, host name and the port, if present.
 * @param url The URL as a string
 * @returns the base URL as a string
 */
function getBaseUrl(url?: string) {
  try {
    const parsedUrl = new URL(url ?? '');
    return `${parsedUrl.protocol}//${parsedUrl.hostname}${parsedUrl.port ? `:${parsedUrl.port}` : ''}`;
  } catch {
    return '';
  }
}

// if you want to fetch data from a new API, add it to this array
const usedHosts = [
  'https://region1.google-analytics.com',
  'https://static.hungermapdata.org',
  'https://cdn.hungermapdata.org',
  process.env.NEXT_PUBLIC_API_URL,
  process.env.NEXT_PUBLIC_V3_API_URL,
  process.env.NEXT_PUBLIC_FORECAST_API_URL,
  process.env.NEXT_PUBLIC_CHATBOT_API_URL,
  process.env.NEXT_PUBLIC_EMAIL_SERVICE,
];

export function middleware(request: NextRequest) {
  // scripts with this nonce will be allowed to run. Used for the Google Analytics scripts
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  // if you want to show images from a different source, add it to img-src
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'sha256-q1+DaXsZUnEJs3jpN9ZoWp6ypK1xBwXiRxG+C31xOUA=' 'strict-dynamic' 'unsafe-eval' 'unsafe-inline' ${getBaseUrl(process.env.NEXT_PUBLIC_API_URL)};
    style-src 'self' 'unsafe-inline';
    connect-src 'self' ${usedHosts
      .filter((host): host is string => !!host)
      .map(getBaseUrl)
      .join(' ')};
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
