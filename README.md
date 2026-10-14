# Smart Number Builder Tool - Math Year 2

Independent Math Year 2 edition generated from the shared Smart Number Builder Tool source.

- Fixed curriculum level: Math Year 2
- Number range and place values: controlled by the existing d2 configuration
- Languages: Bahasa Melayu, Chinese and English
- Input: tap-to-place, keyboard and drag-and-drop

The year selector is intentionally hidden in this edition. Shared interface and interaction
changes should be made in the source project and exported again so all editions stay consistent.

## EdCloud authentication

The learning interface starts only after the EdCloud Tool protocol v1 handshake succeeds.
`auth-bootstrap.js` accepts the trusted EdCloud web launchers and the opaque parent used by the
native StudentApp wrapper, validates the short-lived Tools token through the same-origin
`/api/auth/me` endpoint, and then loads `app.js`.

The token remains in memory only. Do not add it to URLs, browser storage, logs, analytics, or
error messages. Any future protected request should use `createToolsAuthorizationHeader()` from
`edcloud-tool-auth.js` and a server endpoint protected by the EdCloud Tools authorization policy.

Direct navigation is intentionally denied. Local browser testing requires an EdCloud-compatible
launcher on the same `localhost` origin and a reverse proxy for `/api/auth/me`; serving these
static files by themselves is not enough to complete authentication.
