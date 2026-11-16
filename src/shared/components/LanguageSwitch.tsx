"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import TooltipIconButton from "@/shared/components/TooltipIconButton";

// Page translation uses Google Translate's cookie method: picking a language writes the
// `googtrans` cookie ("/en/fr") and reloads; when that cookie is set, Google's script translates
// the page as it loads. (The site's own `messages/fr.json` is not used: Next has no locale routing yet.)

type Props = { mode?: "dark" | "light" | string; className?: string };

const languages = [
  { name: "English", flag: "flag:us-1x1", code: "en" },
  { name: "French", flag: "flag:fr-1x1", code: "fr" },
  { name: "Swahili", flag: "flag:ke-1x1", code: "sw" },
  { name: "Arabic", flag: "flag:sa-1x1", code: "ar" },
  { name: "Hausa", flag: "flag:ng-1x1", code: "ha" },
];

const SCRIPT_ID = "google-translate-script";

/** Language the visitor chose, from the cookie Google reads ("/en/fr" -> "fr"). */
function readCurrentCode(): string {
  const match = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]*\/([a-zA-Z-]+)/);
  return match?.[1] ?? "en";
}

/** Set (or, for English, clear) the translation cookie on every domain scope Google may read. */
function writeCookie(code: string) {
  const host = window.location.hostname;
  const value = code === "en" ? "" : `/en/${code}`;
  const expires = code === "en" ? "expires=Thu, 01 Jan 1970 00:00:00 GMT;" : "";
  for (const domain of ["", `domain=${host};`, `domain=.${host};`]) {
    document.cookie = `googtrans=${value}; path=/; ${expires} ${domain}`;
  }
}

/**
 * Load Google's translate script once. Only done when a non-English language is active: loading
 * it on every page was causing "Maximum call stack size exceeded" inside Google's own script on
 * pages with frequently updating content.
 */
function loadGoogleTranslate() {
  if (document.getElementById(SCRIPT_ID)) return;

  const container = document.createElement("div");
  container.id = "google_translate_element";
  container.style.cssText = "position:absolute;height:0;overflow:hidden;top:-9999px;left:-9999px";
  document.body.appendChild(container);

  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      { pageLanguage: "en", includedLanguages: languages.map((l) => l.code).join(","), autoDisplay: false },
      "google_translate_element"
    );
  };

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
}

const LanguageSwitch = ({ mode }: Props) => {
  const [currentCode, setCurrentCode] = useState("en");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Read the saved language after mount (the server always renders English)
  useEffect(() => {
    const code = readCurrentCode();
    setCurrentCode(code);
    if (code !== "en") loadGoogleTranslate();
  }, []);

  // Close the dropdown when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectLanguage = (code: string) => {
    setIsOpen(false);
    if (code === currentCode) return;
    writeCookie(code);
    window.location.reload();
  };

  const current = languages.find((l) => l.code === currentCode) ?? languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <TooltipIconButton label="Change Language" mode={mode} onClick={() => setIsOpen(!isOpen)} className="bg-white/50">
        <Icon icon={current.flag} className="h-5 w-5 rounded-lg " />
      </TooltipIconButton>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-10 ${
            mode === "dark" ? "bg-gray-800 text-white" : "bg-white text-[#231812]"
          }`}
        >
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => selectLanguage(language.code)}
              className={`flex items-center w-full px-4 py-2 text-left hover:bg-opacity-10 hover:bg-gray-500 ${
                currentCode === language.code ? "bg-opacity-5 bg-gray-500" : ""
              }`}
            >
              <Icon icon={language.flag} className="h-5 w-5 mr-2" />
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitch;
