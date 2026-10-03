/* Language toggle + current year.
   Content for both languages lives in the HTML; CSS hides the inactive one,
   so the page still reads correctly with JavaScript disabled. */
(function () {
  "use strict";

  var KEY = "lang";
  var root = document.documentElement;
  var button = document.getElementById("lang");
  var titles = {
    ja: "長谷川結音 | 研究・学歴",
    en: "Yuito Hasegawa | Research & Education"
  };
  var descriptions = {
    ja: "長谷川結音の研究・学歴。ペロブスカイト太陽電池の卒業研究、東京大学での学歴、モデリング・プログラミングのスキル。",
    en: "Research and education of Yuito Hasegawa: undergraduate work on perovskite solar cells, education at the University of Tokyo, and modeling and programming skills."
  };

  function supported(lang) {
    return lang === "ja" || lang === "en";
  }

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function remember(lang) {
    try { localStorage.setItem(KEY, lang); } catch (e) { /* private mode */ }
  }

  function apply(lang) {
    root.setAttribute("lang", lang);
    document.title = titles[lang];
    var description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", descriptions[lang]);
    if (button) button.setAttribute("aria-label", lang === "ja" ? "Switch to English" : "日本語に切り替える");
    Array.prototype.forEach.call(document.querySelectorAll("[data-label-ja]"), function (el) {
      el.setAttribute("aria-label", el.getAttribute("data-label-" + lang));
    });
  }

  // Priority: ?lang= → previous choice → browser language → Japanese.
  var fromQuery = new URLSearchParams(location.search).get("lang");
  var initial = supported(fromQuery) ? fromQuery : stored();
  if (!supported(initial)) {
    initial = /^ja\b/i.test(navigator.language || "") ? "ja" : "en";
  }
  apply(initial);

  if (button) {
    button.hidden = false;
    button.addEventListener("click", function () {
      var next = root.getAttribute("lang") === "ja" ? "en" : "ja";
      apply(next);
      remember(next);
    });
  }

  var year = String(new Date().getFullYear());
  Array.prototype.forEach.call(document.querySelectorAll(".year"), function (el) {
    el.textContent = year;
  });
})();
