MAG1 GUIDE — GITHUB PREVIEW / WEBMASTER HANDOFF
Updated: 2026-10-14

CURRENT DELIVERY
Revision 2026.10.14-review.15; 82 feature chapters plus 7 supporting pages per locale, English and Traditional Chinese. Internal review labels and noindex remain. Five narrowly scoped operation verifications; drafted content is not proof of operation testing.

GITHUB PREVIEW
Repository: https://github.com/jerrysohigh-create/magne-web
Existing Pages branch: task/magne-ai-local-delivery-20260728, root directory.
Traditional Chinese: https://jerrysohigh-create.github.io/magne-web/MAGNE.AI/mag1-guide/index.html
English: https://jerrysohigh-create.github.io/magne-web/MAGNE.AI/en/mag1-guide/index.html
GitHub Pages serves the checked-in HTML. It does not run the Node build.

WEBMASTER
From MAGNE.AI run npm run build, then npm run audit. Upload the CONTENTS of dist/client to the existing website root. This includes both guides, main-site header/footer, CSS, scripts, screenshots and MP4 media. Production server upload is separate from GitHub Pages preview.

EDITING
Update content/mag1-guide/MAG1WW53/en.json and zh-Hant.json together, then rebuild and commit generated mag1-guide/ and en/mag1-guide/ pages. Keep firmware identity separate from guideRevision; recheck changed functions after firmware updates.

UPLOAD BOUNDARY
Only current referenced guide media is included. Superseded videos, obsolete Simplified Chinese metadata, raw ADB logs, account/device identifiers, backups and local output folders are excluded. Source remains in the main-site repository; no separate website or repository is created.

HISTORICAL LOCAL NOTES
MAG1 GUIDE — MAIN-SITE SOURCE / LOCAL REVIEW
Updated: 2026-10-14

STATUS
The existing 77-page guide is integrated into the MAGNE.AI static website.
It shares the site's fonts, assets/site.css, assets/site.js, and the Header /
Footer extracted from phone.html at build time. It is not a separate deployment.
Current content: English and Traditional Chinese review drafts, 77 pages each,
sharing English device captures. Editorial/device verification remains pending.
Both locales have corresponding-page language switching. No GitHub push or server
publication is included in this change. Review pages remain noindex,nofollow
and are excluded from sitemap.xml. Noindex is not access control.

EDIT / BUILD
1. Edit content/mag1-guide/MAG1WW53/en.json and zh-Hant.json together.
2. Edit assets/mag1-guide/guide.css or guide.js for guide-only behavior.
3. Edit main-site phone.html and en/phone.html for shared Header / Footer changes.
4. Run npm run build from the MAGNE.AI directory, then npm run audit.
Generated mag1-guide/ and en/mag1-guide/ HTML pages are overwritten on build.
The build requires Node.js and no Python, translation library, or absolute
developer-machine paths. Existing main-site build dependencies are unchanged.

MAIN-SITE ENTRY POINTS
phone.html, phone-specs.html and resource footers link to mag1-guide/index.html
in both English and Traditional Chinese. Quick start: mag1-guide/quickstart.html
and en/mag1-guide/quickstart.html.
All guide pages and 84 screenshots / 13 active videos are included in dist/client.
Raw captures are shown inside the same white/silver MAG1 device presentation.

LANGUAGES
Traditional Chinese route: /mag1-guide/
English route: /en/mag1-guide/
Both locales are configured in scripts/mag1-guide-config.mjs and use their
corresponding main-site phone page as the shell. Search, captions, accessible
labels and the media viewer are localized. Guide pages receive language
destinations only when a corresponding content page exists. Screenshots and
silent videos are shared, not duplicated. English structured article data is
also available in assets/mag1-guide/data/manual.en.json. Recheck both locales
after firmware or editorial changes; language availability is not approval.

FIRMWARE UPDATES
Current verified capture build: MAG1WW53 (Android 15).
Editorial revision: 2026.10.14-review.12; it is not a firmware version.
Keep captures under assets/mag1-guide/<firmware>/ and content under
content/mag1-guide/<firmware>/. Never overwrite old-build evidence with new
captures. For a new firmware, add its content/assets, compare affected paths,
mark changed procedures as awaiting verification, and update the manifest
only after review. Unaffected captures may be reused only when checked and
identified as applicable. An end-user firmware selector is not implemented.

GITHUB / WEBMASTER HANDOFF (LATER)
Keep this feature in the existing magne-web repository under MAGNE.AI.
Include content/mag1-guide, assets/mag1-guide, both generated guide directories,
scripts/build-mag1-guide.mjs, scripts/mag1-guide-config.mjs, the changes to
scripts/build.mjs, scripts/site-pages.mjs, assets/site.js and the main-site
HTML entry links. Preserve unrelated changes already present in the checkout.
Do not commit local phone evidence logs, account/device identifiers, backups,
or this machine's outputs directory. dist/ remains ignored by Git.
After final content and bilingual review, the webmaster runs the two commands
above and uploads the CONTENTS of dist/client to the existing static web root.
The server must resolve nested index.html files and serve MP4 files correctly;
verify media playback/range requests on the actual server. Existing worker
deployment is a separate main-site concern and is not changed here.
Keep the internal review labels until editorial approval. Public release also
requires deciding indexability and adding reviewed guide URLs to the sitemap.

LOCAL VALIDATION
Main build: 199 pages. Structural audit: PASS.
Browser comparison: Header, Logo, navigation and Footer computed typography,
colors, spacing and widths match the main phone page at desktop size.
390px mobile viewport: no horizontal overflow; navigation opens and closes.
Image enlargement and embedded video playback checked; no page script errors.

MEDIA SUPPLEMENT / 2026-10-14
29 new raw English screenshots and 8 silent recordings added to 20 feature
pages, the media gallery and full manual. Five existing matching screenshots
were also linked to relevant pages. Calculator 9.3 (967717812): 2 + 3 = 5,
scientific keypad expansion/collapse and AC were demonstrated. Other new
videos demonstrate menu navigation, not hardware or service operation.
The guide now contains 56 drafted pages and 3 narrowly scoped operation
verifications. English prose is translated; peer review remains pending.

All 11 videos passed browser playback checks after switching to on-demand
loading. Starting another clip pauses the previous clip and preserves its
position. Image enlargement and mobile layout checks passed; 77 guide pages
showed no horizontal overflow or broken images. Build/audit: 122 pages PASS.

ENGLISH EDITION / 2026-10-14
77 English pages and 70 structured articles translated. Main build and audit:
199 pages PASS. All 77 English pages checked at 390px with no horizontal
overflow, Chinese guide-text residue, broken loaded images or script errors.
87 referenced media files responded successfully. All 11 videos played.
English search, category filtering, ledger search and image enlargement passed.
English / Traditional Chinese round trips preserve both a general page and a
nested feature page. Desktop and mobile screenshots were visually reviewed.
Device verification scope is unchanged by translation; peer review is pending.

TOUCH-TRACE RE-RECORDING / 2026-10-14
All 11 guide videos were re-recorded on MAG1WW53 with native Android touch
markers, swipe traces and the coordinate strip retained as approved. Input
was injected through authorized ADB; this is not physical-finger photography.
Videos remain silent, use the full 720 x 1592 screen and are shown inside the
existing white device frame. New assets end in -touch.mp4 / -touch.jpg.
The previous files are retained; 14 pages in each locale reference the new
recordings. media-touch-rerecord.json maps all replacements and their scope.
Refresh rate Auto -> 60Hz -> Auto was checked and restored. Calculator 2+3=5,
scientific keypad expansion/collapse and AC were reproduced. Existing history
was not opened or deleted. Both temporary touch-display settings were restored
to their original values (off). No feature-verification claim was expanded.
Validation: all 11 complete files decoded and played in the browser; enlarged
video playback passed. Both locale galleries passed 390px layout checks with
no broken loaded images or script errors. No old MP4 references remain in
either guide source. Main build and structural audit: 199 pages PASS.

GEMINI / 2026-10-14
Added a dedicated Gemini chapter in both locales (78 pages / 71 feature pages
per locale; 57 drafted, 4 narrowly scoped operation verifications). Two silent
recordings and six raw screenshots cover ADB-simulated side-key invocation,
Live screen sharing of the public MAG1 English page, scrolling, stopping and
ending Live, plus an actual webpage-summary response. Microphone access was
blocked during capture; no spoken exchange or camera demonstration is claimed.
The Android microphone prompts are intentionally cancelled in the recordings.
Gemini was restored through App info to disabled-user (enabled=3); the original
state was enabled=2 (disabled), which Android shell would not permit restoring
exactly. Disabled behavior is restored without clearing data. Temporary touch, microphone and
caption settings restored; assistant defaults matched the saved baseline.
See media-gemini.json. All features remain pending peer review and publication.

Gemini QA: main build and structural audit passed (201 pages). Both new videos
fully decoded and played in both locales (80.54s and 41.60s). Six screenshots
and all poster/video URLs returned HTTP 200. Sixteen affected locale/page
combinations passed 390px overflow and loaded-image checks; no script errors.
Gemini search, image enlargement and EN/Traditional Chinese same-page language
switching passed. No Chinese guide-text residue on the English Gemini page.
No GitHub push or server deployment was performed.

PRIVATE SPACE / 2026-10-14
Added English and Traditional Chinese private-space chapters and links from
the catalog, quick start, permissions, screen lock, Web3, media, full manual
and verification ledger. 79 pages / 72 feature pages per locale, 58 drafted.
The 4 operation verifications are unchanged. The Settings entry reached a
device-PIN prompt; successful unlock and launcher operations await owner
authentication. A protected all-black authentication capture is excluded.
No private-space media is claimed or published. General Google instructions
are explicitly separated from actual MAG1 evidence. Revision review.8.

Private-space chapter QA: build and structural audit passed (203 pages).
Twenty affected locale/page combinations passed 390px overflow and loaded
image checks, with no script errors. Dedicated chapter search and same-page
English/Traditional Chinese switching passed. No Chinese text residue in the
English chapter. Device recording remains pending owner authentication.

PRIVATE SPACE FOLLOW-UP / review.9 / 2026-10-14
Owner authenticated locally. Existing-space settings and unlocked launcher
observed; manual Lock collapsed private apps; re-entry requested fingerprint
or PIN and was cancelled. Space left locked. Five PNGs and two silent MP4s
added with native touch traces and white phone frames in both locales.
Hide stays Off; automatic lock stays Every time device locks. Neither policy
was changed or behavior-tested. No private app opened; no credentials filmed.
Counts: 79 pages / 72 feature pages per locale; 58 drafted; 5 narrow operation
verifications; 0 peer-reviewed/published. Local build only; no push/deploy.

Private-space QA: build 203 pages and structural audit passed; 20 affected
locale/page checks passed at 390px, with no horizontal overflow or script
errors. All 5 images loaded and modal worked in both locales. Both videos
played in both locales; full decode passed with no detected black segments.
Durations: settings 20.33s; manual lock 13.45s. Desktop/mobile frames inspected.

PRIVATE SPACE PRIVACY RECAPTURE / review.10 / 2026-10-14
Supersedes ALL review.9 private-space media. Nine old image/video/poster
files withdrawn from source and distribution, with fresh -clean filenames
to avoid stale caches. Notification icons hidden before recording. All app
list areas concealed in the launcher clip; its PNGs come from that redacted
clip. Unredacted and withdrawn originals remain outside the website only.
Settings screenshots have no touch-coordinate strip. Videos retain touch
feedback. Microphone access is enabled at user request; videos have no audio.
Demo mode and touch settings restored; private space left locked. No push.

Recapture QA passed: 203-page structural audit; both videos decoded and
played in both locales; 20 responsive page checks; image modals passed.
All nine withdrawn media URLs return 404 and active source references are
removed. New durations 18.96s and 8.16s; all five release images inspected.

PRIVATE SPACE CORRECTION / review.11 / 2026-10-14
User clarified: hide only status-bar notification icons, not app icons.
Restored the unmasked original of the already completed new recording,
with two frame grabs. Replaced and withdrew the four masked clip/poster/PNG
files. The three clean Settings screenshots and Settings clip are unchanged.
All app labels remain as installed; system locale verified en-US. English
system language does not guarantee English app names. Authentication is
excluded, microphone access enabled. No additional owner authentication
was needed because the full original of the new recording remained available.

Final review.11 media replaces the recovered clip with another fresh
recording after the owner completed authentication. Both launcher PNGs are
native screencaps, not video frame grabs. Full app list and labels retained.

ACTIVATION REFERENCE / review.12 / 2026-10-14
Integrated the local read-only activation audit into EN and Traditional
Chinese first-boot and Web3 chapters, quickstart, source and status pages,
related Google/reset/wallet links, structured data and full manual. Android
initial setup, FRP and device wallet binding are separate. Static evidence
does not count as a completed operation: still 5 verified operations.
No reset, signing, binding, FRP change, account access or server request.
Current FRP state, real binding state/time, production service, warranty
and node/reward rules remain unverified. Detailed internal diagnostics
remain outside the website in the local activation-reference evidence.
79 pages per locale; no publication or GitHub push.

FIND HUB / review.14 / 2026-10-14
Added English and Traditional Chinese Find Hub chapter, catalog, search entry, ledger, quick-start link and full-manual chapter. 73 features, 59 drafted; 5 operation verifications unchanged. Settings state read only; remote actions remain untested. No new captures or deployment. Evidence remains outside site at outputs/mag1-guide-20261014/evidence/find-hub.

COVERAGE / review.15 / 2026-10-14
9 new chapters, 14 framework chapters drafted, and targeted supplements based on the read-only ADB coverage audit. English and Traditional Chinese catalogs, search, status, full manuals and structured data updated. 82 features / 82 drafted / 5 narrow operation verifications unchanged. Existing media preserved. No phone configuration changes, push or deployment. Evidence: outputs/mag1-guide-20261014/evidence/feature-audit-20261014.
