import { defineConfig } from 'astro/config';

// On GitHub, the publishing workflow sets SITE_URL and BASE_PATH from the
// Pages settings: a temporary address (https://<user>.github.io/<repo>/)
// until the domain is connected, then https://www.idcubedmodular.com/.
export default defineConfig({
  site: process.env.SITE_URL || 'https://www.idcubedmodular.com',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
