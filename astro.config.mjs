import { defineConfig } from 'astro/config';

// 部署到 GitHub Pages 时改成你的仓库名,如 "yourname.github.io" 或 "/my-blog/"
export default defineConfig({
  site: 'https://KyrieYhw.github.io',
  base: '/',
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
