const BLOG_TITLE_SUFFIX = ' | PAAN Blog';
const MAX_TITLE_LENGTH = 60;

function slugToTitle(slug) {
  if (!slug) return '';
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatBlogSeoTitle(blog, slug) {
  const base = (blog?.meta_title || blog?.article_name || slugToTitle(slug) || '').trim();
  if (!base) return "PAAN Blog | Africa's Creative & Tech Insights";
  if (/\|\s*PAAN/i.test(base)) return base.slice(0, MAX_TITLE_LENGTH);

  const combined = `${base}${BLOG_TITLE_SUFFIX}`;
  if (combined.length <= MAX_TITLE_LENGTH) return combined;

  const maxBase = MAX_TITLE_LENGTH - BLOG_TITLE_SUFFIX.length - 1;
  return `${base.slice(0, Math.max(maxBase, 12))}…${BLOG_TITLE_SUFFIX}`;
}
