MAG1 USER GUIDE — VERSION 1.0
Updated: 2026-10-16

EDITION AND SCOPE
Guide version: 1.0. Target software: MAG1WW60-1 (development build).
Firmware package filename: MAG1CW60-1.pac.
Software comparison names: MAG1WW60 / MAG1WW60-1 / MAG1WW64.
82 feature chapters; 90 pages per locale, English and Traditional Chinese.
Tested scope and limitations remain stated per chapter. Version 1.0 does not
mean every function, accessory, network, or transaction has been tested.

SOURCE AND BUILD
Edit content/mag1-guide/review-20261016/{en,zh-Hant}.json.
Structured data: assets/mag1-guide/data/manual.{en,zh-Hant}.json.
Build configuration: scripts/mag1-guide-config.mjs and version-names.json.
The historical source directory name is retained; guideRevision is 1.0.
Run npm run build, then npm run audit from MAGNE.AI.
Generated mag1-guide/ and en/mag1-guide/ HTML must be committed for Pages.

MEDIA
Only assets referenced by the current guide are included in this update.
MAG1CM60-1 is a legacy asset-folder name for the current MAG1WW60-1 captures;
it is not a separate software version. New console assets use MAG1WW60-1.
Phone captures have English UI; captions and manual text are bilingual.
PC-console recordings use chronological browser frame sampling. Their audio
is the generated phone WAV aligned with playback, not a live microphone.
The website contains demonstrations, not a publicly callable device console.
Raw device logs, firmware packages, APKs, models and account data are excluded.

GITHUB PREVIEW
Repository: jerrysohigh-create/magne-web
Pages branch: task/magne-ai-local-delivery-20260728, root directory.
Traditional Chinese:
https://jerrysohigh-create.github.io/magne-web/MAGNE.AI/mag1-guide/index.html
English:
https://jerrysohigh-create.github.io/magne-web/MAGNE.AI/en/mag1-guide/index.html
Preview pages retain noindex,nofollow. GitHub Pages serves committed HTML.

SERVER HANDOFF
Upload the CONTENTS of dist/client to the main website root after build/audit.
GitHub preview publication and production-server upload are separate actions.
