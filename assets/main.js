/* Language toggle + current year.
   Content for both languages lives in the HTML; CSS hides the inactive one,
   so the page still reads correctly with JavaScript disabled. */
(function () {
  "use strict";

  var KEY = "lang";
  var root = document.documentElement;
  var button = document.getElementById("lang");

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
    var title = document.querySelector('title[data-ja]');
    if (title) document.title = title.getAttribute("data-" + lang);
    var description = document.querySelector('meta[name="description"]');
    if (description && description.hasAttribute("data-" + lang)) {
      description.setAttribute("content", description.getAttribute("data-" + lang));
    }
    if (button) button.setAttribute("aria-label", lang === "ja" ? "Switch to English" : "日本語に切り替える");
    Array.prototype.forEach.call(document.querySelectorAll("[data-label-ja]"), function (el) {
      el.setAttribute("aria-label", el.getAttribute("data-label-" + lang));
    });
    Array.prototype.forEach.call(document.querySelectorAll("a[data-page-link]"), function (el) {
      var path = el.getAttribute("data-page-link") || el.getAttribute("href");
      el.setAttribute("data-page-link", path);
      var target = new URL(path, location.href);
      target.searchParams.set("lang", lang);
      el.href = target.href;
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
      try {
        var current = new URL(location.href);
        current.searchParams.set("lang", next);
        history.replaceState(null, "", current.href);
      } catch (e) { /* Local file previews may not allow history changes. */ }
    });
  }

  var year = String(new Date().getFullYear());
  Array.prototype.forEach.call(document.querySelectorAll(".year"), function (el) {
    el.textContent = year;
  });

  // Older standalone education/skills URLs now lead to the home sections.
  var redirect = document.body.getAttribute("data-redirect");
  if (redirect) {
    var destination = new URL(redirect, location.href);
    destination.searchParams.set("lang", initial);
    location.replace(destination.href);
  }
})();
