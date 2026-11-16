'use strict';
const root = document.querySelector('#detail-root');
const id = new URLSearchParams(location.search).get('id');
function el(tag, className, content) { const node = document.createElement(tag); if(className) node.className = className; if(content !== undefined) node.textContent = content; return node; }
function section(title) { const section = el('section','detail-section'); section.append(el('h2','',title)); return section; }
function render(city) {
  document.title = `${city.name}｜Mini Travel Guide`;
  const hero = el('section','detail-hero');
  hero.append(el('span','eyebrow',`${city.regionLabel} · ${city.englishName.toUpperCase()}`),el('h1','',city.name),el('p','subtitle',city.tagline));
  const art = el('div',`city-art ${city.theme}`); art.append(el('span','emoji',city.emoji)); hero.append(art,el('p','intro',city.description));
  const content = el('div','detail-content');
  const spots = section('推薦景點'); const cards = el('div','attraction-grid');
  city.attractions.forEach(a=>{const card=el('article','info-card');card.append(el('h3','',a.name),el('p','',a.description));cards.append(card);});spots.append(cards);
  const foods = section('在地美食');const pills=el('div','pill-list');city.foods.forEach(food=>pills.append(el('span','pill',food)));foods.append(pills);
  const transport=section('交通方式');transport.append(el('p','note',city.transport));
  const tips=section('旅行提醒');tips.append(el('p','note',city.tips));
  const back=el('a','back-link','← 返回城市列表');back.href='index.html#cities';
  content.append(spots,foods,transport,tips,back);root.replaceChildren(hero,content);
}
if(!id || !/^[a-z0-9-]+$/.test(id)){root.replaceChildren(el('p','loading','找不到這個城市。'));}
else fetch('data/cities.json').then(r=>{if(!r.ok)throw Error('Load failed');return r.json();}).then(data=>{const city=data.find(c=>c.id===id);if(!city){root.replaceChildren(el('p','loading','找不到這個城市。'));return;}render(city);}).catch(e=>{console.error(e);root.replaceChildren(el('p','loading','資料載入失敗，請稍後再試。'));});
