'use strict';
const grid = document.querySelector('#city-grid');
const searchInput = document.querySelector('#search');
const emptyState = document.querySelector('#empty-state');
const errorState = document.querySelector('#error-state');
let cities = [];
let region = 'all';
function textElement(tag, className, value) { const el = document.createElement(tag); if (className) el.className = className; el.textContent = value; return el; }
function createCard(city) {
  const article = textElement('article', 'city-card', '');
  const art = textElement('div', `city-art ${city.theme}`, '');
  art.append(textElement('span', 'emoji', city.emoji));
  art.append(textElement('span', 'art-name', city.englishName.toUpperCase()));
  const number = String(cities.indexOf(city) + 1).padStart(2, '0');
  art.append(textElement('span', 'card-number', `CITY / ${number}`));
  const body = textElement('div', 'city-body', '');
  body.append(textElement('span', 'city-region', city.regionLabel));
  const title = textElement('h3', '', city.name);
  title.append(textElement('span', 'english', city.englishName));
  body.append(title, textElement('p', '', city.tagline));
  const link = textElement('a', 'card-link', '探索城市 ↗');
  link.href = `city.html?id=${encodeURIComponent(city.id)}`;
  link.setAttribute('aria-label', `探索${city.name}`);
  body.append(link); article.append(art, body);
  return article;
}
function render() {
  const keyword = searchInput.value.trim().toLocaleLowerCase();
  const filtered = cities.filter(c => (region === 'all' || c.region === region) && [c.name,c.englishName,c.tagline,c.description,...c.foods,...c.attractions.map(a=>a.name)].join(' ').toLocaleLowerCase().includes(keyword));
  grid.replaceChildren(...filtered.map(createCard));
  document.querySelector('#result-count').textContent = `${String(filtered.length).padStart(2, '0')} 座城市，等你出發`;
  emptyState.hidden = filtered.length > 0;
}
searchInput.addEventListener('input', render);
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  region = button.dataset.region;
  document.querySelectorAll('.filter').forEach(b => { const selected = b === button; b.classList.toggle('active', selected); b.setAttribute('aria-pressed', String(selected)); });
  render();
}));
fetch('data/cities.json').then(response => { if (!response.ok) throw Error('HTTP '+response.status); return response.json(); }).then(data => { if (!Array.isArray(data)) throw Error('Invalid city data'); cities = data; render(); }).catch(error => { console.error(error); errorState.hidden = false; });
