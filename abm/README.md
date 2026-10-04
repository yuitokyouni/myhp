# Financial ABM learning notes

Six browser experiments from the author's earlier learning site, with
expandable explanations and Python source viewers.

Public URL: https://yuitokyouni.github.io/myhp/abm/

YH005_1 is an analysis view of the YH005 Speculation Game, rather than a
separate sixth model.

## Provenance

Source repository: [yuitokyouni/financial-abm-lab](https://github.com/yuitokyouni/financial-abm-lab).
Imported project: [`imported/speculation-game-info`](https://github.com/yuitokyouni/financial-abm-lab/tree/34492e2b954e38f96f81f1f251434fe232f3548a/imported/speculation-game-info).
Snapshot commit: `34492e2b954e38f96f81f1f251434fe232f3548a`.
Migration date: 2026-10-04.

The original `playground/yh001.html` through `yh005_1.html` supply the
simulation drivers and plots. `playground/assets/runner.js` supplies the browser
runtime. `playground/assets/sf.py` supplies the statistical helpers. The Python
models are local copies of the corresponding `experiments/` sources, not a
JavaScript reimplementation. Their Git blob IDs match the source:

| Local file | Source Git blob |
| --- | --- |
| `models/YH001/model.py` | `8dc8baa60e00e10cfaff5bfec53a483a8637d0a2` |
| `models/YH002/model.py` | `ea72ede3b49e8ff7d771cf547581753e62b03224` |
| `models/YH003/model.py` | `72d35115484486ddef3912c7bd775aa126e1d244` |
| `models/YH004/model.py` | `82efb0c5ebf3161e8186e54246adb9254d698f2d` |
| `models/YH005/history.py` | `bf67f8d35a35389ee0ccaa7151b259c0eb16c559` |
| `models/YH005/simulate.py` | `92501695ad12f05cb2d6e3144e48d1d230642161` |
| `assets/sf.py` | `6419fe09c5b94398bd409c4c6e975138683f0414` |
| `models/YH001/run_simulation.py` | `8377495ff15635c645016417c0a76df8754b2bc6` |
| `models/YH002/run_simulation.py` | `07eda6396ad9db6922c0bbf98055ffb16f3acf65` |
| `models/YH003/run_simulation.py` | `9da65c6980e79780903744fbdb094bee56c0ece6` |
| `models/YH004/run_simulation.py` | `edba4188f20f946d0435553a5f386c3cf53c9ef4` |
| `models/YH005/run_simulation.py` | `d2eca3cd16890400eaa6f679a25e67de19af938c` |
| `models/YH005_1/phase1_mechanism_figures.py` | `233e26ec02c0d7d05f5bb48978be3cadec675533` |

`LICENSE` preserves the imported project's MIT license verbatim, including its
original `Copyright (c) 2026 [YOUR NAME]` placeholder. No new author identity is
asserted for that notice. The model names and source links identify the prior
literature; no publisher figures or paper PDFs are copied.

## What changed

- A bilingual catalogue and brief ABM introduction replace the old development
  landing page. Individual experiment interfaces remain Japanese and are marked
  `lang="ja"`, so they stay readable when site navigation is switched to English.
- All pages share myHP's header, affiliation text links, page links, language selection, and visual
  style. Experiment-specific CSS is contained in `style.css`.
- Source URLs now load bundled `models/` files. The pages do not fetch changing
  model source from the remote repository at runtime.
- Simulation drivers and model algorithms are retained. Historical numeric
  claims and assertions of successful reproduction were removed from the visible
  explanatory notes; newly computed charts describe only the current run.
- Runtime changes associate controls with their labels, announce status updates,
  prevent overlapping runs, validate numeric input, and display undefined metrics
  as `—`. Non-finite Python JSON values become `null` for Plotly rather than
  causing JSON parsing errors. Plot colors support the site's light/dark colors.

## Explanations and source code

Each catalogue entry and experiment page has a native HTML `details` toggle
covering the model's basic idea, simulation steps, parameters, and observations.
The source viewer loads full local Python files on demand, independently of
Pyodide and Plotly, with file/download links and a retry control for failed loads.
Explanations and source controls are bilingual; experiment controls remain Japanese.

The original entry scripts above are unchanged reading copies, not the browser
runtime. Running them requires the upstream helper files and dependencies, which
are not all bundled here. Their settings and comments describe the source
experiments, not newly computed browser results. Links point to the fixed source
snapshot. The imported MIT license also covers these files.

Experiment pages additionally display their actual embedded Python `DRIVER`,
which reads UI parameters, calls the local model and computes plotting data.
The viewer reads that existing string, rather than maintaining another copy.

## Runtime and limitations

- **No backend required.** The public site serves static files over HTTPS.
  The browser runs Python through Pyodide and renders plots with Plotly.
- External runtime downloads are pinned to Pyodide **0.26.4** from
  `cdn.jsdelivr.net` and Plotly **2.35.2** from `cdn.plot.ly`. Internet access and
  permission to load those CDNs are required. Pyodide loads NumPy for all demos
  and SciPy for YH001. The CDN projects retain their own licenses; their code is
  not vendored here. Simulation results are not transmitted to a backend.
- The first run can take tens of seconds. Python currently runs on the main
  browser thread: larger runs or scans may make the interface temporarily
  unresponsive. There is no background worker or cancellation control.
- Browser defaults intentionally use smaller populations/shorter periods than
  the source research experiments. Short runs, finite samples, and random seeds
  affect estimated tail indices, correlations, and other statistics. This is a
  learning interface, not a newly validated replication or market forecast.
- Use the public URL above to open the experiments. Python source viewing and
  simulation both fetch model files over HTTP/HTTPS.
- YH006 and YH006_1 were intentionally excluded: the original pages are viewers
  for precomputed results with PAMS/Parquet dependencies. Their research
  artifacts, parameter sweeps, and claims were not copied.

## Validation

`python3 abm/_selftest.py` (with NumPy and SciPy installed) exercises all six
upstream model/helper integrations with small parameters. It does not cover
Pyodide downloads, browser rendering, or the full scientific claims.

During migration, all six self-tests passed. JavaScript syntax was checked and
the actual embedded Python drivers, including the three scan/sweep drivers,
were executed with small representative parameters. Source-model byte hashes
were checked against the GitHub blobs above. Browser QA is performed alongside
the parent site's integration checks.

For the explanation/source-viewer update, all six model self-tests passed again.
Chromium checks covered the catalogue and all six experiment pages: displayed
files match the bundled sources, drivers match the actual embedded strings,
source fetching is lazy and shared files are cached, failed fetches can be
retried, and language selection is preserved in links. Source viewing also
worked with simulation CDNs blocked. Keyboard toggles, a 390px dark-mode viewport,
and explanation/file-link fallbacks with JavaScript disabled were checked.
