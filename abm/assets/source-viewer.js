/* Read bundled Python sources only when their native details toggle opens. */
(() => {
  "use strict";
  const sources = new Map();

  function message(element, ja, en) {
    const japanese = document.createElement("span");
    japanese.className = "ja";
    japanese.textContent = ja;
    const english = document.createElement("span");
    english.className = "en";
    english.lang = "en";
    english.textContent = en;
    element.replaceChildren(japanese, english);
  }

  function fetchSource(url) {
    if (!sources.has(url)) {
      sources.set(url, fetch(url).then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      }).catch(error => {
        sources.delete(url);
        throw error;
      }));
    }
    return sources.get(url);
  }

  document.querySelectorAll("details[data-source-url]").forEach(details => {
    const code = details.querySelector("pre code");
    const status = details.querySelector(".source-status");
    const retry = details.querySelector(".source-retry");
    let state = "idle";

    async function load() {
      if (state === "loading" || state === "loaded") return;
      state = "loading";
      retry.hidden = true;
      status.hidden = false;
      message(status, "Python元コードを読み込み中…", "Loading Python source…");
      try {
        code.textContent = await fetchSource(details.dataset.sourceUrl);
        code.parentElement.hidden = false;
        status.hidden = true;
        state = "loaded";
      } catch (error) {
        state = "error";
        message(status,
          "コードを読み込めませんでした。再試行するか、上のファイルリンクから開いてください。",
          "Could not load the source. Retry or use the file link above.");
        retry.hidden = false;
      }
    }

    details.addEventListener("toggle", () => { if (details.open) load(); });
    retry.addEventListener("click", load);
    if (details.open) load();
  });

  // Use the actual Python driver defined by the experiment, without a second copy.
  if (typeof DRIVER !== "undefined") {
    document.querySelectorAll("details[data-source-driver]").forEach(details => {
      details.querySelector("pre code").textContent = DRIVER.trim();
      details.hidden = false;
    });
  }
})();
