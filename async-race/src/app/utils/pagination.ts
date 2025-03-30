import BaseView from '../views/baseView';

class Pagination<T> extends BaseView {
  public currentPageNumber: number = 1;
  public currPage: HTMLElement | null = null;
  private data: (page: number, limit: number) => Promise<T>;
  private limit: number;

  constructor(
    data: (page: number, limit: number) => Promise<T>,
    limit: number,
  ) {
    super({
      tag: 'div',
      classNames: ['pagination-container'],
    });
    this.data = data;
    this.limit = limit;

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
      callback: () => this.getNextPage(),
    });

    const prevBtn = new BaseView({
      tag: 'button',
      classNames: ['previous-page-button'],
      textContent: 'Back',
      callback: () => this.getPrevPage(),
    });

    this.appendChildren([prevBtn, currentPage, nextBtn]);
    this.loadPage();
  }

  private async getNextPage() {
    this.currentPageNumber += 1;
    await this.loadPage();
  }

  private async getPrevPage() {
    if (this.currentPageNumber > 1) {
      this.currentPageNumber -= 1;
      await this.loadPage();
    }
  }

  private async loadPage() {
    try {
      await this.data(this.currentPageNumber, this.limit);
      this.updateCurrentPage();
    } catch (error) {
      console.error('Error');
    }
  }

  private updateCurrentPage(): void {
    if (this.currPage) {
      this.currPage.textContent = this.currentPageNumber.toString();
    }
  }
}

export default Pagination;
