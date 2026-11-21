# IDCUBED — idcubedmodular.com

Website of Integrated Design Cubed in English and French, built with
[Astro](https://astro.build). A rebuild of the Wix site (21 Nov 2026) in the
manner of ateliermayer.ca: the same text, images and pages, without Wix.

## Folder structure

```
Website/
├── home/index.md            home page: which project's photo, the headline and text
├── system/                  System page: index.md (intro, five steps) and images/
├── projects/                one folder per project
│   └── knight-building/
│       ├── index.md         name, place, type, text in EN / FR, credits, images
│       └── images/          web-sized images (made by tools/web-images.mjs)
├── about/                   About page: index.md (partners, news…) and images/
├── originals/               full-resolution files downloaded from the Wix site
├── public/                  files served as they are (favicon, link preview, video)
├── src/                     the site's code (pages, layout, styles, labels)
└── tools/web-images.mjs     makes the web images from originals/
```

`originals/` stays on this Mac only (it is in `.gitignore`).

## Where things are

| To change…                           | Edit                                   |
| ------------------------------------ | -------------------------------------- |
| A project's text, facts, images      | `projects/<project>/index.md`          |
| The home photo and text              | `home/index.md`                        |
| The System page                      | `system/index.md`                      |
| Partners, collaborators, news        | `about/index.md`                       |
| Address, phone, email, social links  | `src/site.ts`                          |
| Menu labels and other small text     | `src/i18n/ui.ts`                       |
| Colours, type sizes, layout          | `src/styles/global.css`                |

Every piece of text has an `en:` and a `fr:` version. The French is translated
from the English with DeepL (see CLAUDE.md).

**Add a project:** copy a project folder, rename it (the folder name becomes
the address, e.g. `/en/projects/new-project/`), put its images in `images/`,
edit `index.md` and set its `order:`. Images can be large JPGs or PNGs; the
build makes smaller versions for each screen size.

## Run it on your Mac

```bash
npm install      # first time only
npm run dev      # preview at http://localhost:4321
npm run build    # produce the finished site in dist/
```

## Publishing

`.github/workflows/publish.yml` builds the site and publishes it with GitHub
Pages every time a change reaches the `main` branch, while the repository
variable `PUBLISH` is `true`. Until the domain is moved from Wix, the site
would live at a temporary `https://<user>.github.io/<repository>/` address.

## Addresses

- `/` sends visitors to their language (last used, else browser language, else English)
- `/en/`, `/fr/` — home
- `/<lang>/system/` — the process
- `/<lang>/projects/` — project list
- `/<lang>/projects/<project>/` — project page
- `/<lang>/about/` — partners, background, news and contact
