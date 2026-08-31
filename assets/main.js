/* Language toggle + current year.
   Content for both languages lives in the HTML; CSS hides the inactive one,
   so the page still reads correctly with JavaScript disabled. */
(function () {
  "use strict";

  var KEY = "lang";
  var root = document.documentElement;

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function remember(lang) {
    try { localStorage.setItem(KEY, lang); } catch (e) { /* private mode */ }
  }

  function apply(lang) {
    root.setAttribute("lang", lang === "en" ? "en" : "ja");
  }

  // Priority: ?lang= → previous choice → browser language → Japanese.
  var fromQuery = new URLSearchParams(location.search).get("lang");
  var initial = fromQuery || stored();
  if (!initial) {
    initial = /^ja\b/i.test(navigator.language || "") ? "ja" : "en";
  }
  apply(initial);

  var button = document.getElementById("lang-toggle");
  if (button) {
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
