import BaseView from '../baseView';
import { getCars } from '../../API/garage';
import CarsListView from './carsList/carsListView';

class Pagination extends BaseView {
  public currentPageNumber: number = 1;
  public currPage: HTMLElement | null = null;
  // public limitPage: number;

  constructor(carsList: CarsListView) {
    super({
      tag: 'div',
      classNames: ['pagination-container'],
    });

    const currentPage = new BaseView({
      tag: 'span',
      classNames: ['current-page'],
      textContent: `${this.currentPageNumber}`,
    });
    this.currentPageNumber = Number(currentPage.getView().textContent);
    this.currPage = currentPage.getView();

    const nextBtn = new BaseView({
      tag: 'button',
      classNames: ['next-page-button'],
      textContent: 'Next',
      callback: () => this.getNextPage(carsList),
    });
    const prevBtn = new BaseView({
      tag: 'button',
      classNames: ['previous-page-button'],
      textContent: 'Back',
      callback: () => this.getPrevPage(carsList),
    });

    this.appendChildren([prevBtn, currentPage, nextBtn]);
  }

  public async getNextPage(carsList: CarsListView) {
    this.currentPageNumber += 1;
    carsList.getCars(this.currentPageNumber, 7);
    this.updateCurrentPage();
  }

  public async getPrevPage(carsList: CarsListView) {
    this.currentPageNumber -= 1;
    carsList.getCars(this.currentPageNumber, 7);
    this.updateCurrentPage();
  }

  private updateCurrentPage(): void {
    if (this.currPage) {
      this.currPage.textContent = this.currentPageNumber.toString();
    }
  }
}

export default Pagination;
