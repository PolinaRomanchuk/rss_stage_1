import { manageDisabledInRace } from '../states/buttonsState';
import RaceState from '../states/raceState';
import BaseView from '../views/baseView';

class Pagination<T> extends BaseView {
  public currentPageNumber: number = 1;
  public currPage: HTMLElement | null = null;
  private data: (
    page: number,
    limit: number,
  ) => Promise<{ items: T[]; totalCount: number }>;
  private limit: number;

  private totalItems: number = 0;

  private nextBtn: BaseView;
  private prevBtn: BaseView;
  private buttons: HTMLButtonElement[] = [];

  constructor(
    data: (
      page: number,
      limit: number,
    ) => Promise<{ items: T[]; totalCount: number }>,
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
    this.nextBtn = nextBtn;

    const prevBtn = new BaseView({
      tag: 'button',
      classNames: ['previous-page-button'],
      textContent: 'Back',
      callback: () => this.getPrevPage(),
    });
    this.prevBtn = prevBtn;

    this.appendChildren([prevBtn, currentPage, nextBtn]);
    this.loadPage();

    const next = nextBtn.getView();
    const prev = prevBtn.getView();
    if (
      next instanceof HTMLButtonElement &&
      prev instanceof HTMLButtonElement
    ) {
      this.buttons.push(next, prev);
    }
    if (this.buttons) {
      RaceState.getInstance().subscribe(() => manageDisabledInRace(this.buttons));
    }
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
    await this.loadPage();
  }

  private async getPrevPage() {
    if (this.currentPageNumber > 1) {
      this.currentPageNumber -= 1;
      await this.loadPage();
    }
  }

  public async loadPage() {
    try {
      const { items, totalCount } = await this.data(
        this.currentPageNumber,
        this.limit,
      );
      this.setTotalItems(totalCount);
      this.updateCurrentPage();
      this.updatePaginationState();
    } catch (error) {
      console.error('Error');
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
