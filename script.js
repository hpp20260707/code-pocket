(() => {
  const key = "code-pocket-language";
  const buttons = Array.from(document.querySelectorAll("[data-language-button]"));
  const supported = new Set(["zh-Hans", "en"]);

  function preferredLanguage() {
    const saved = localStorage.getItem(key);
    if (saved && supported.has(saved)) return saved;
    return navigator.language.toLowerCase().startsWith("zh") ? "zh-Hans" : "en";
  }

  function applyLanguage(language) {
    document.documentElement.lang = language;
    document.querySelectorAll("[data-lang]").forEach((node) => {
      node.hidden = node.dataset.lang !== language;
    });
    buttons.forEach((button) => {
      const selected = button.dataset.languageButton === language;
      button.setAttribute("aria-pressed", String(selected));
    });
    localStorage.setItem(key, language);
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.languageButton));
  });

  applyLanguage(preferredLanguage());
})();
