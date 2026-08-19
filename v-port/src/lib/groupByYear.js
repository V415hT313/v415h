export function groupByYear(posts) {
  const groups = new Map();
  for (const post of posts) {
    const year = new Date(post.date).getFullYear();
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year).push(post);
  }
  return [...groups.entries()].sort((a, b) => b[0] - a[0]);
}
