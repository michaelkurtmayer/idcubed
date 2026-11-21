// Languages, interface text and URL helpers.
// To change a menu label or any small piece of interface text, edit it here.
// English is the source; every French label is translated from it with DeepL
// (FR-CA), see CLAUDE.md.

export const langs = ['en', 'fr'] as const;
export type Lang = (typeof langs)[number];

// The default: the bare address always opens this language.
export const defaultLang: Lang = 'en';

export const languageNames: Record<Lang, string> = {
  en: 'English',
  fr: 'Français',
};

const ui = {
  en: {
    'nav.system': 'System',
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.language': 'Language',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'slides.previous': 'Previous image',
    'slides.next': 'Next image',
    'about.contact': 'Contact',
    'site.tagline': 'Affordable, high-quality modular mass timber buildings at scale.',
    'notFound': 'Page not found.',
    'skip': 'Skip to content',
  },
  fr: {
    'nav.system': 'Système',
    'nav.projects': 'Projets',
    'nav.about': 'À propos',
    'nav.language': 'Langue',
    'nav.menu': 'Menu',
    'nav.close': 'Fermer',
    'slides.previous': 'Image précédente',
    'slides.next': 'Image suivante',
    'about.contact': 'Contact',
    'site.tagline': 'Des bâtiments modulaires en bois massif, abordables et de grande qualité, construits à grande échelle.',
    'notFound': 'Page introuvable.',
    'skip': 'Aller au contenu',
  },
} as const;

export type UiKey = keyof (typeof ui)['en'];

export function useTranslations(lang: Lang) {
  return (key: UiKey): string => ui[lang][key] ?? ui[defaultLang][key];
}

// The folder the site is served from: '' on the real domain, or e.g.
// '/idcubed' on a temporary GitHub address. Set at build time.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** '/en/' -> '/en/' on the real domain, '/idcubed/en/' on a temporary address */
export function withBase(path: string): string {
  return BASE + (path.startsWith('/') ? path : `/${path}`);
}

/** '/projects/' + 'fr' -> '/fr/projects/' */
export function localize(lang: Lang, path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return withBase(`/${lang}${clean}`);
}

/** '/fr/projects/x/' -> '/projects/x/' */
export function stripLang(pathname: string): string {
  const path = BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) || '/' : pathname;
  const parts = path.split('/');
  if (langs.includes(parts[1] as Lang)) {
    return '/' + parts.slice(2).join('/');
  }
  return path;
}

export function langPaths() {
  return langs.map((lang) => ({ params: { lang } }));
}

/** Splits a block of text on blank lines into paragraphs. */
export function paragraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/** One paragraph as HTML: a single line break starts a new line. */
export function paragraphHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br />');
}
