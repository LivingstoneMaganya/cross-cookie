# @maganya/cross-cookie

[![npm version](https://img.shields.io/npm/v/@maganya/cross-cookie.svg)](https://www.npmjs.com/package/@maganya/cross-cookie)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/@maganya/cross-cookie.svg)](https://www.npmjs.com/package/@maganya/cross-cookie)
[![Types](https://img.shields.io/badge/Types-TypeScript-blue.svg)](https://www.npmjs.com/package/@maganya/cross-cookie)

> Zero-dependency Web-Standards cookie parser & serializer for Node.js, Bun, Deno, Cloudflare Workers, and Next.js Edge Runtime.

---

## Features

- ⚡ **Web-Standards Native:** Directly accepts `Request` or `Headers` objects from the Fetch API.
- 🌐 **Cross-Runtime:** Zero Node.js-specific dependencies (`http`/`net`).
- 🛡️ **Modern Security:** Full support for `Partitioned` (CHIPS), `SameSite`, `HttpOnly`, and `Secure` attributes.
- 📦 **Microscopic Footprint:** Dual ESM + CommonJS builds with TypeScript declaration maps included out of the box.

---

## Environment Support

| Runtime | Support |
| :--- | :--- |
| **Node.js** | >= 18.0.0 |
| **Bun** | >= 1.0.0 |
| **Deno** | >= 1.30.0 |
| **Cloudflare Workers / Edge** | ✅ Native |
| **Next.js Edge Middleware** | ✅ Native |

---

## Installation

```bash
npm install @maganya/cross-cookie

```

Or using alternative package managers:

```bash
pnpm add @maganya/cross-cookie
# or
yarn add @maganya/cross-cookie
# or
bun add @maganya/cross-cookie

```

---

## Quick Start

### 1. Parsing Cookies

You can parse cookies directly from standard Web `Request` objects, `Headers` maps, or raw string headers:

```typescript
import { parseCookies } from '@maganya/cross-cookie';

// From Next.js Edge Middleware / Cloudflare Workers
export async function middleware(request: Request) {
  const cookies = parseCookies(request);
  console.log(cookies.session); // 'abc12345'
}

// From a standard Fetch API Headers object
const headers = new Headers({ cookie: 'theme=dark; lang=en' });
const cookiesFromHeaders = parseCookies(headers);

// From a raw string
const cookiesFromString = parseCookies('theme=dark; session=abc12345');

```

### 2. Serializing Cookies (`Set-Cookie`)

Format `Set-Cookie` header strings with modern security flags:

```typescript
import { serializeCookie } from '@maganya/cross-cookie';

const cookieHeader = serializeCookie('session_id', 'abc12345', {
  httpOnly: true,
  secure: true,
  sameSite: 'Strict',
  partitioned: true, // CHIPS (Cookies Having Independent Partitioned State)
  path: '/',
  maxAge: 3600
});

// Output:
// session_id=abc12345; Max-Age=3600; Path=/; HttpOnly; Secure; SameSite=Strict; Partitioned

```

---

## API Reference

### `parseCookies(input)`

Parses incoming cookie headers into a key-value record object.

* **Parameters:**
* `input`: `string | Request | Headers`


* **Returns:** `Record<string, string>`

### `serializeCookie(name, value, options?)`

Serializes a cookie name and value into a valid `Set-Cookie` header value.

* **Parameters:**
* `name`: `string`
* `value`: `string`
* `options`: `CookieOptions` *(optional)*


* **`CookieOptions` Properties:**
* `path?: string`
* `domain?: string`
* `maxAge?: number`
* `expires?: Date`
* `secure?: boolean`
* `httpOnly?: boolean`
* `sameSite?: 'Strict' | 'Lax' | 'None'`
* `partitioned?: boolean`



---

## License

[MIT](https://www.google.com/search?q=./LICENSE) © Owiny Livingstone Maganya

