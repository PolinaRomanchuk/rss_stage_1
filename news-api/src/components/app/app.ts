import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsArticle } from '../../types/index';
import { NewsSource } from '../../types/index';

class App {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const source = document.querySelector('.sources') as HTMLElement;
        source.addEventListener('click', (e: MouseEvent) =>
            this.controller.getNews(e, (data: { articles: NewsArticle[] }) => this.view.drawNews(data))
        );
        this.controller.getSources((data: { sources: NewsSource[] }) => this.view.drawSources(data));
    }
}

export default App;
