import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// A piece of text in both languages. English is the source; French is
// translated from it with DeepL (see CLAUDE.md).
const t = z.object({ en: z.string(), fr: z.string() });

// A person or company with an optional link (founding partners, credits, news)
const link = z.string().url().optional();

// One folder per project: projects/<slug>/index.md + images/
const projects = defineCollection({
  loader: glob({
    pattern: '*/index.md',
    base: './projects',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: ({ image }) =>
    z.object({
      title: t,
      order: z.number(),
      location: t,
      type: t,
      // Projects list, last column: IDCUBED (North America) or NKBAK (Europe)
      by: z.string(),
      // Paragraphs separated by a blank line; a single line break starts a new line
      text: t,
      credits: z.array(z.object({ role: t, name: z.string(), url: link })).default([]),
      images: z
        .array(
          z.object({
            src: image(),
            // true: the file is served exactly as it is (the animated GIF)
            asIs: z.boolean().default(false),
          }),
        )
        .min(1),
    }),
});

// The System page: images (the first may be a video), an intro and the five steps
const system = defineCollection({
  loader: glob({ pattern: 'index.md', base: './system' }),
  schema: ({ image }) =>
    z.object({
      title: t,
      // A video in public/ (e.g. /video/assembly.mp4), shown first, before the images
      video: z.object({ src: z.string(), poster: image() }).optional(),
      images: z.array(image()).default([]),
      intro: t,
      steps: z.array(z.object({ title: t, text: t })),
      closing: t,
    }),
});

// The About page: intro, founding partners, collaborators, suppliers,
// background and news, each in its own row with its label on the left
const about = defineCollection({
  loader: glob({ pattern: 'index.md', base: './about' }),
  schema: ({ image }) =>
    z.object({
      intro: t,
      partners: z.object({
        label: t,
        people: z.array(z.object({ name: z.string(), url: link, photo: image(), text: t })),
      }),
      groups: z.array(
        z.object({
          label: t,
          entries: z.array(z.object({ name: z.string(), url: link, text: t })),
        }),
      ),
      background: z.object({ label: t, text: t }),
      news: z.object({
        label: t,
        // Publication and article titles stay in English in both languages
        items: z.array(z.object({ source: z.string(), title: z.string(), url: link, cover: image() })),
      }),
    }),
});

// The home page: one photo, then a short text beside the project it shows
const home = defineCollection({
  loader: glob({ pattern: 'index.md', base: './home' }),
  schema: z.object({
    project: z.string(), // the project whose first image is the home photo
    headline: t,
    text: t,
  }),
});

export const collections = { projects, system, about, home };
