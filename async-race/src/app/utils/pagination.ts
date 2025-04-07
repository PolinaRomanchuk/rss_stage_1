import BaseView from '../views/baseView';

class Pagination<T> extends BaseView {
  public currentPageNumber: number = 1;
  public currPage: HTMLElement | null = null;
  private totalItems: number = 0;

  private buttons: HTMLButtonElement[] = [];
  private nextBtn: BaseView;
  private prevBtn: BaseView;

  private data: (
    page: number,
    limit: number,
  ) => Promise<{ items: T[]; totalCount: number }>;

  private limit: number;

  constructor(
    data: (page: number, limit: number,) => Promise<{ items: T[]; totalCount: number }>,
    limit: number,
    private onPageChange: (page: number) => void = () => { },
    initialPage: number = 1
  ) {
    super({ tag: 'div', classNames: ['pagination-container'], });

    this.data = data;
    this.limit = limit;
    this.currentPageNumber = initialPage;

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
    }, true, true);
    this.nextBtn = nextBtn;

    const prevBtn = new BaseView({
      tag: 'button',
      classNames: ['previous-page-button'],
      textContent: 'Back',
      callback: () => this.getPrevPage(),
    }, true, true);
    this.prevBtn = prevBtn;

    this.appendChildren([prevBtn, currentPage, nextBtn]);
    this.loadPage();
  }

  public setTotalItems(totalCount: number): void {
    this.totalItems = totalCount;
    this.updatePaginationState();
  }

  public getMaxPages(): number {
    return Math.ceil(this.totalItems / this.limit);
  }

  private async getNextPage() {
    this.currentPageNumber += 1;
    this.onPageChange(this.currentPageNumber);
    await this.loadPage();
  }

  private async getPrevPage() {
    if (this.currentPageNumber > 1) {
      this.currentPageNumber -= 1;
      this.onPageChange(this.currentPageNumber);
      await this.loadPage();
    }
  }

  public async loadPage() {
    try {
      const { totalCount } = await this.data(
        this.currentPageNumber,
        this.limit,
      );
      this.setTotalItems(totalCount);
      this.updateCurrentPage();
      this.updatePaginationState();
    } catch (error) {
      console.error('Error', error);
    }
  }

  private updateCurrentPage(): void {
    if (this.currPage) {
      this.currPage.textContent = this.currentPageNumber.toString();
    }
  }

  public updatePaginationState(): void {
    const maxPages = this.getMaxPages();
    const prev = this.prevBtn.getView();
    const next = this.nextBtn.getView();

    if (prev instanceof HTMLButtonElement) {
      prev.disabled = this.currentPageNumber === 1;
    }

    if (next instanceof HTMLButtonElement) {
      next.disabled = this.currentPageNumber >= maxPages;
    }
  }
}

export default Pagination;
