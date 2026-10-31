'use strict';
// Article content stays in HTML so links and posts work without JavaScript.
const posts = [...document.querySelectorAll('#blog-posts > article')];
const filters = document.querySelector('#blog-filters');
const empty = document.querySelector('#blog-empty');
const tagsFor = (post) => (post.dataset.tags || '').split(',').map(tag => tag.trim()).filter(Boolean);
const tags = [...new Set(posts.flatMap(tagsFor))].sort();
function filterPosts(tag) {
  let count = 0;
  posts.forEach(post => {
    post.hidden = tag !== null && !tagsFor(post).includes(tag);
    if (!post.hidden) count++;
  });
  empty.hidden = count > 0;
  empty.textContent = posts.length ? 'No articles match this tag.' : 'No articles published yet. Check back for technical notes and deep dives.';
  for (const button of filters.children) {
    button.setAttribute('aria-pressed', String(button.tagValue === tag));
  }
}
if (posts.length) {
  for (const tag of [null, ...tags]) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = tag === null ? 'All articles' : tag;
    button.tagValue = tag;
    button.addEventListener('click', () => filterPosts(tag));
    filters.append(button);
  }
  filters.hidden = false;
}
filterPosts(null);
