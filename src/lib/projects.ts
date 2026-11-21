import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

/** All projects, in the order set by `order:` in each project file. */
export async function getProjects() {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => a.data.order - b.data.order);
}

/** A project's images in slideshow order. Alt text: the project's name. */
export function slidesOf(p: CollectionEntry<'projects'>, lang: Lang) {
  return p.data.images.map((img, i) => ({
    src: img.src,
    asIs: img.asIs,
    alt: i === 0 ? p.data.title[lang] : `${p.data.title[lang]} (${i + 1})`,
  }));
}
