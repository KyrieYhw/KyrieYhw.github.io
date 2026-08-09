/** 日期格式化:YYYY-MM-DD */
export function formatDate(date: Date): string {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** 估算阅读时间(分钟),按中文每字速度粗略计算 */
export function readingTime(markdown: string): string {
  if (!markdown) return '约 1 分钟';
  // 去掉 frontmatter 和代码块,按 300 字/分钟估算
  const text = markdown
    .replace(/---[\s\S]*?---/, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/[#>*`_[\]()!-]/g, '');
  const minutes = Math.max(1, Math.round(text.length / 300));
  return `约 ${minutes} 分钟`;
}
