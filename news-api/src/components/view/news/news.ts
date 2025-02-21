import './news.css';
import { NewsArticle } from '../../../types/index';

class News {
    draw(data: NewsArticle[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement | null;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp?.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');
            const metaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement | null;
            if (metaPhoto) {
                metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }
            const metaAuthor = newsClone.querySelector('.news__meta-author');
            if (metaAuthor) {
                metaAuthor.textContent = item.author || item.source.name;
            }

            const metaDate = newsClone.querySelector('.news__meta-date');
            if (metaDate) {
                metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }

            const title = newsClone.querySelector('.news__description-title');
            if (title) {
                title.textContent = item.title;
            }

            const source = newsClone.querySelector('.news__description-source');
            if (source) {
                source.textContent = item.source.name;
            }

            const content = newsClone.querySelector('.news__description-content');
            if (content) {
                content.textContent = item.description;
            }

            const readlink = newsClone.querySelector('.news__read-more a');

            if (readlink) {
                readlink.setAttribute('href', item.url);
            }

            fragment.append(newsClone);
        });

        const newsElement = document.querySelector('.news');
        if (newsElement) {
            newsElement.innerHTML = '';
            newsElement.appendChild(fragment);
        }
    }
}

export default News;
