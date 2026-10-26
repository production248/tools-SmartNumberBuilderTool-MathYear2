# Smart Number Builder Tool - Math Year 2

Independent Math Year 2 edition generated from the shared Smart Number Builder Tool source.

- Fixed curriculum level: Math Year 2
- Number range and place values: controlled by the existing d2 configuration
- Languages: Bahasa Melayu, Chinese and English
- Input: tap-to-place, keyboard and drag-and-drop

## Shared correct-answer celebration

`shared-components-loader.js` starts loading the correct celebration and
operation guide before `app.js`. Local development uses the unified sibling
`../edcloud-shared-components/` project. Production first requests the matching
modules below `/edcloud-shared-components/v1/components/` and retains the old
standalone component paths as migration fallbacks.

The original success dialog remains in the page as a no-network/load-failure
fallback. A successful answer uses only one celebration path, so the shared MP3
and the original synthesized success tones never play together.

## Shared operation guide

The fixed helper character opens a spotlight walkthrough with BM, Chinese, and
English narration. Changing a mode does not open the walkthrough. Clicking the
helper explains only the selected mode in five steps: one learning goal and
four mode-specific operation cues. The selected mode remains locked until the
walkthrough closes.

Apple mobile browsers and iOS WebViews use transparent Animated WebP. Other
modern browsers use transparent VP9 WebM. Character media is silent; the 18
generic and 42 contextual narration files live under
`assets/operation-guide/voices/`. Contextual files use the
`{bm|zh|en}/contextual/` subfolders.
The learning tool continues normally if the shared package cannot be loaded.

The year selector is intentionally hidden in this edition. Shared interface and interaction
changes should be made in the source project and exported again so all editions stay consistent.

## EdCloud authentication

`index.html` is the production entry. The learning interface starts only after
the EdCloud Tool protocol v1 handshake succeeds.
`auth-bootstrap.js` accepts the trusted EdCloud web launchers and the opaque parent used by the
native StudentApp wrapper, validates the short-lived Tools token through the same-origin
`/api/auth/me` endpoint, and then loads the shared components followed by `app.js`.

The token remains in memory only. Do not add it to URLs, browser storage, logs, analytics, or
error messages. Any future protected request should use `createToolsAuthorizationHeader()` from
`edcloud-tool-auth.js` and a server endpoint protected by the EdCloud Tools authorization policy.

Direct navigation is intentionally denied. Local browser testing requires an EdCloud-compatible
launcher on the same `localhost` origin and a reverse proxy for `/api/auth/me`; serving these
static files by themselves is not enough to complete authentication.

`index-preview.html` is the developer-only, no-authorization preview entry for
direct local viewing and visual smoke tests. It must not be published as a
public production route because it intentionally bypasses the EdCloud launch gate.
