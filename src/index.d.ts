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
export declare function parseCookies(input: string | Request | Headers): Record<string, string>;
/**
 * Serializes a cookie name-value pair with options into a valid Set-Cookie header string.
 */
export declare function serializeCookie(name: string, value: string, options?: CookieOptions): string;
