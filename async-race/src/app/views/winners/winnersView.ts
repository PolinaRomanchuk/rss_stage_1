import BaseView from '../baseView';
import Pagination from '../../utils/pagination';

class WinnersView extends BaseView {
  private LIMIT_PAGES: number = 10;
  constructor() {
    super({
      tag: 'div',
      classNames: ['winners-container'],
    });

    /*  const pagination = new Pagination(async (page, limit) => {
      await winnersList.geWinners(page, limit);
    }, this.LIMIT_PAGES); */

    const nameView = new BaseView({
      tag: 'div',
      classNames: ['current-view-name'],
      textContent: 'Winners',
    });

    this.appendChildren([nameView]);
  }
}

export default WinnersView;
