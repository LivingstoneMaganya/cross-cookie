import { describe, it, expect } from 'vitest';
import { parseCookies, serializeCookie } from './index';

describe('cross-cookie', () => {
  describe('parseCookies()', () => {
    it('parses raw cookie strings correctly', () => {
      const parsed = parseCookies('theme=dark; session=xyz123; user=Owiny');
      expect(parsed).toEqual({
        theme: 'dark',
        session: 'xyz123',
        user: 'Owiny',
      });
    });

    it('extracts cookies directly from Web Standard Headers object', () => {
      const headers = new Headers();
      headers.set('cookie', 'token=abc_999; lang=en');

      const parsed = parseCookies(headers);
      expect(parsed).toEqual({ token: 'abc_999', lang: 'en' });
    });

    it('extracts cookies from a Web Standard Request object', () => {
      const req = new Request('https://example.com', {
        headers: { cookie: 'auth=true' },
      });

      const parsed = parseCookies(req);
      expect(parsed).toEqual({ auth: 'true' });
    });
  });

  describe('serializeCookie()', () => {
    it('formats a basic cookie', () => {
      const result = serializeCookie('session', '12345');
      expect(result).toBe('session=12345');
    });

    it('handles modern flags (SameSite, Partitioned, HttpOnly)', () => {
      const result = serializeCookie('token', 'secret', {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        partitioned: true,
        path: '/',
      });

      expect(result).toBe(
        'token=secret; Path=/; HttpOnly; Secure; SameSite=Strict; Partitioned'
      );
    });

    it('throws error for invalid cookie names', () => {
      expect(() => serializeCookie('invalid name', 'val')).toThrow(TypeError);
    });
  });
});