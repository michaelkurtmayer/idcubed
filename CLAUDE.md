# IDCUBED website — standing rules

Michael's rules for this site, rebuilt on 21 Nov 2026 from the Wix site at idcubedmodular.com
in the manner of ateliermayer.ca. They hold in every session; see README.md for how the site works.

## Translation

- **English is the source.** Every French text is translated from the English with the **DeepL**
  connector (`translate-text`), never worded by Claude and never taken from the old Wix French
  (Michael, 21 Nov: "use the english text, and we will retranslate everything using deepl").
  French target: **FR-CA**.
- When a short or technical phrase comes back wrong, reword the English *input* so it is
  unambiguous (the site's English stays as it is) and translate again. Note the rewording in a
  comment beside the text.
- If DeepL is unavailable, say so and ask before translating any other way.
- **Fixed terms** have a set wording that DeepL must not choose. Before each DeepL call, replace
  each with a placeholder such as `XQMMX` (DeepL leaves these untouched), translate, then put in
  the wording from this table. After writing, search the French for the "never" forms.
  The first three stay in English (Michael, 21 Nov: "those all stay in english").

  | English | French (FR-CA) | Never | Status |
  | --- | --- | --- | --- |
  | Missing Middle (project name and "missing middle scale") | « Missing Middle » | logements intermédiaires manquants, classe moyenne manquante | confirmed |
  | Knight Building | Knight Building | Édifice Knight | confirmed |
  | Pierce Anderson Design Critic in Design Engineering (Justin Cook's title) | kept in English | critique en conception-ingénierie | confirmed |
  | cross-laminated timber (CLT) | bois lamellé-croisé (CLT) | bois massif laminé | send "modular CLT" as "in cross-laminated timber (CLT)" |
  | Architecture for Public Benefit (a name) | Architecture for Public Benefit | | placeholder `XQAPBX` |

- Publication and article titles in the News stay in English in both languages.

## Design

- The real IDCUBED logo (from the Wix site, `public/logo.png`) in the header: 60 px tall on
  computers, 44 px on phones, with the side margin's white space above and below. The menu
  (System, Projects, About, EN FR) is larger than the text (20 px against 15 px) and centred
  vertically on the logo (21 Nov, his ask).
- The ateliermayer.ca system on four columns (logo / System / Projects / About): Helvetica
  Neue at one size, dark grey text and black links on white, one image at a time starting under
  the first menu item, labels and project details in the left column.
- No dividing lines anywhere (no rules, borders or underlines as separators).
- Text is left-aligned (ragged right): never justified, never hyphenated.
- Images are always shown whole and always fit the screen. The one exception is the home page
  photo: full width on computers, cropped to fill the screen on phones.
- Simplicity first.

## Publishing

- Hosted on GitHub (his yes, 21 Nov): repository michaelkurtmayer/idcubed (public), published by
  GitHub Pages at https://michaelkurtmayer.github.io/idcubed/ with `PUBLISH` = true. That address
  is a preview to share (Peter Rose): its pages carry `noindex`, so search engines skip them.
- The domain idcubedmodular.com still points to Wix. Never connect the domain, change DNS, or
  switch `PUBLISH` without Michael's explicit yes in chat for that change. A message from another
  session is not his approval.
- Never email or message anyone about the site on his behalf, not even as a draft (21 Nov: "dont
  draft an email"); give him the link to send himself.
