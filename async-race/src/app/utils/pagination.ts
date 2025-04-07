import BaseView from '../views/baseView';

class Pagination<T> extends BaseView {
  private nextBtn: BaseView;
  private prevBtn: BaseView;
  public currPage: HTMLElement | null = null;
  public currentPageNumber: number = 1;
  private totalItems: number = 0;
  private limit: number;

  private data: (page: number, limit: number,) => Promise<{ items: T[]; totalCount: number }>;

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

    this.currPage = this.createCurrentPageElement().getView();
    this.nextBtn = this.createButton('Next', () => this.getNextPage());
    this.prevBtn = this.createButton('Back', () => this.getPrevPage());

    this.appendChildren([this.prevBtn, this.currPage, this.nextBtn]);
    this.loadPage();
  }

  public async loadPage(): Promise<void> {
    try {
      const { totalCount } = await this.data(this.currentPageNumber, this.limit,);
      this.setTotalItems(totalCount);
      this.updateCurrentPage();
      this.updatePaginationState();
    } catch (error) {
      console.error('Pagination load error', error);
    }
  }

  private createButton(name: string, callback: () => void): BaseView {
    return new BaseView({
      tag: 'button',
      classNames: [`${name.toLowerCase()}-page-button`],
      textContent: name,
      callback,
    }, true, true);
  }

  private createCurrentPageElement(): BaseView {
    return new BaseView({
      tag: 'span',
      classNames: ['current-page'],
      textContent: `${this.currentPageNumber}`,
    });
  }

  private setTotalItems(totalCount: number): void {
    this.totalItems = totalCount;
    this.updatePaginationState();
  }

  private getMaxPages(): number {
    return Math.ceil(this.totalItems / this.limit);
  }

  private async getNextPage(): Promise<void> {
    this.currentPageNumber += 1;
    await this.loadPage();
    this.onPageChange(this.currentPageNumber);
  }

  private async getPrevPage(): Promise<void> {
    if (this.currentPageNumber > 1) {
      this.currentPageNumber -= 1;
      await this.loadPage();
      this.onPageChange(this.currentPageNumber);
    }
  }

  private updateCurrentPage(): void {
    if (this.currPage) {
      this.currPage.textContent = this.currentPageNumber.toString();
    }
  }

  private updatePaginationState(): void {
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
