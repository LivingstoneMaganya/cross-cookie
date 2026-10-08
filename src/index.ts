export interface CookieOptions {
  path?: string;
  domain?: string;
  maxAge?: number;
  expires?: Date;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
  partitioned?: boolean;
}

/**
 * Parses a Cookie header string or Web Standard Request/Headers object into a key-value record.
 */
export function parseCookies(input: string | Request | Headers): Record<string, string> {
  let cookieString = '';

  if (typeof input === 'string') {
    cookieString = input;
  } else if (input instanceof Headers) {
    cookieString = input.get('cookie') || '';
  } else if (input && typeof input === 'object' && 'headers' in input) {
    cookieString = input.headers.get('cookie') || '';
  }

  const cookies: Record<string, string> = {};
  if (!cookieString.trim()) return cookies;

  const pairs = cookieString.split(';');
  for (const pair of pairs) {
    const idx = pair.indexOf('=');
    if (idx < 0) continue;

    const key = pair.slice(0, idx).trim();
    let val = pair.slice(idx + 1).trim();

    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1);
    }

    try {
      cookies[key] = decodeURIComponent(val);
    } catch {
      cookies[key] = val;
    }
  }

  return cookies;
}

/**
 * Serializes a cookie name-value pair with options into a valid Set-Cookie header string.
 */
export function serializeCookie(name: string, value: string, options: CookieOptions = {}): string {
  if (!/^[a-zA-Z0-9_!#$%&'*+\-.^`|~]+$/.test(name)) {
    throw new TypeError(`Invalid cookie name: "${name}"`);
  }

  const encodedVal = encodeURIComponent(value);
  let cookieStr = `${name}=${encodedVal}`;

  if (options.maxAge !== undefined) {
    if (!Number.isInteger(options.maxAge) || options.maxAge < 0) {
      throw new TypeError('maxAge must be a positive integer');
    }
    cookieStr += `; Max-Age=${options.maxAge}`;
  }

  if (options.domain) cookieStr += `; Domain=${options.domain}`;
  if (options.path) cookieStr += `; Path=${options.path}`;
  if (options.expires) cookieStr += `; Expires=${options.expires.toUTCString()}`;
  if (options.httpOnly) cookieStr += '; HttpOnly';
  if (options.secure) cookieStr += '; Secure';
  if (options.sameSite) cookieStr += `; SameSite=${options.sameSite}`;
  if (options.partitioned) cookieStr += '; Partitioned';

  return cookieStr;
}