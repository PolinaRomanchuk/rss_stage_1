import BaseView from '../baseView';
import Pagination from '../../utils/pagination';
import CarSvg from '../garage/carsList/car/carSvg';
import '../winners/winners.css';
import { getWinnersState, saveWinnersStateToStorage, setCurrentPage, setSortBy, setSortOrder } from '../../states/winnersState';
import { fetchWinnersData } from '../../services/winnerServices';
import type { WinnerViewData } from '../../../types/types';

class WinnersView extends BaseView {
  private LIMIT_PAGES: number = 10;

  private winnersTableView: BaseView | null = null;
  private totalWinnersCountView: BaseView | null = null;
  private winnersTableBodyView: BaseView | null = null;
  private sortBy: 'id' | 'wins' | 'time' = 'id';
  private sortOrder: 'ASC' | 'DESC' = 'ASC';
  private currentPageNumber: number = 1;
  private winnersCountNumber: number = 0;

  constructor() {
    super({ tag: 'div', classNames: ['winners-container'], });

    this.initState();
    this.initView();
  }

  private initView(): void {
    const nameView = this.createNameView();
    this.totalWinnersCountView = this.createTotalCountView();
    this.winnersTableView = this.createTable();
    const pagination = this.createPagination();

    this.appendChildren([
      nameView,
      this.totalWinnersCountView,
      this.winnersTableView,
      pagination,
    ]);
  }

  private initState(): void {
    const winnerState = getWinnersState();
    this.sortBy = winnerState.sortBy;
    this.sortOrder = winnerState.sortOrder;
    this.currentPageNumber = winnerState.currentPage;
  }

  private createNameView(): BaseView {
    return new BaseView({
      tag: 'div',
      classNames: ['current-view-name'],
      textContent: 'Winners',
    });
  }

  private createTotalCountView(): BaseView {
    return new BaseView({
      tag: 'div',
      classNames: ['total-winners-count'],
      textContent: '0 winners',
    });
  }

  private createTable(): BaseView {
    const table = new BaseView({
      tag: 'table',
      classNames: ['winners-table'],
    });

    const thead = new BaseView({
      tag: 'thead',
      classNames: ['winners-table-head'],
    });

    const headerRow = new BaseView({ tag: 'tr' });
    const headers = ['#', 'Car', 'Name', 'Wins', 'Best Time (seconds)'];

    headers.forEach((headerText) => {
      const th = new BaseView({ tag: 'th', textContent: headerText });

      if (headerText === 'Wins') {
        th.getView().addEventListener('click', () => this.sortWinners('wins'));
      } else if (headerText === 'Best Time (seconds)') {
        th.getView().addEventListener('click', () => this.sortWinners('time'));
      }

      headerRow.append(th);
    });

    thead.append(headerRow);
    table.append(thead);
    return table;
  }

  private createPagination(): Pagination<WinnerViewData> {
    return new Pagination(
      async (page, limit) => {
        this.currentPageNumber = page;
        const { winners, totalCount } = await this.loadAndRenderWinners(page, limit);
        return { items: winners, totalCount };
      },
      this.LIMIT_PAGES,
      (page) => {
        this.currentPageNumber = page;
        setCurrentPage(page);
        saveWinnersStateToStorage();
      },
      this.currentPageNumber
    );
  }

  private async loadAndRenderWinners(page: number, limit: number): Promise<{ winners: WinnerViewData[]; totalCount: number }> {
    try {
      const { winnersData, totalCount } = await fetchWinnersData(
        page,
        limit,
        this.sortBy,
        this.sortOrder
      );

      this.winnersCountNumber = totalCount;
      if (this.totalWinnersCountView) {
        this.totalWinnersCountView.getView().textContent = `${this.winnersCountNumber} winners`;
      }

      this.renderWinners(winnersData);
      return { winners: winnersData, totalCount };
    } catch (error) {
      console.error('Error load winners', error);
      return { winners: [], totalCount: 0 };
    }
  }

  private renderWinners(winners: WinnerViewData[]): void {
    if (this.winnersTableBodyView) {
      this.winnersTableBodyView.removeAllChildren();
    } else {
      this.winnersTableBodyView = new BaseView({
        tag: 'tbody',
        classNames: ['winners-table-body'],
      });
      if (this.winnersTableView) {
        this.winnersTableView.append(this.winnersTableBodyView);
      }
    }

    winners.forEach((winner, index) => {
      const row = new BaseView({ tag: 'tr' });

      const carElement = new CarSvg();
      carElement.setCarColor(winner.color);

      const rowData = [
        ((this.currentPageNumber - 1) * this.LIMIT_PAGES + index + 1).toString(),
        carElement.getView().outerHTML,
        winner.name,
        winner.wins.toString(),
        winner.time.toString(),
      ];

      rowData.forEach((data, i) => {
        const td = new BaseView({
          tag: 'td',
          textContent: i === 1 ? '' : data,
        });

        if (i === 1) {
          td.append(carElement);
        }

        row.append(td);
      });
      if (this.winnersTableBodyView) {
        this.winnersTableBodyView.append(row);
      }
    });
  }

  private async sortWinners(newSortBy: 'id' | 'wins' | 'time'): Promise<void> {
    if (this.sortBy === newSortBy) {
      this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sortBy = newSortBy;
      this.sortOrder = 'ASC';
    }

    setSortBy(this.sortBy);
    setSortOrder(this.sortOrder);
    saveWinnersStateToStorage();

    await this.loadAndRenderWinners(this.currentPageNumber, this.LIMIT_PAGES);
  }
}

export default WinnersView;
