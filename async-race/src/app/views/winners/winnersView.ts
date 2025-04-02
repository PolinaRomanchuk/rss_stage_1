import BaseView from '../baseView';
import Pagination from '../../utils/pagination';
import { getWinners } from '../../API/winners';
import CarSvg from '../garage/carsList/car/carSvg';
import { getCar } from '../../API/garage';
import '../winners/winners.css';

class WinnersView extends BaseView {
  private LIMIT_PAGES: number = 10;
  private table: BaseView;
  private totalCounter: number = 0;
  private totalCountView: BaseView;
  private tBodyElement: BaseView | null = null;
  private sortBy: 'id' | 'wins' | 'time' = 'id';
  private sortOrder: 'ASC' | 'DESC' = 'ASC';

  constructor() {
    super({
      tag: 'div',
      classNames: ['winners-container'],
    });

    const pagination = new Pagination(async (page, limit) => {
      await this.loadWinners(page, limit);
    }, this.LIMIT_PAGES);

    const nameView = new BaseView({
      tag: 'div',
      classNames: ['current-view-name'],
      textContent: 'Winners',
    });

    this.totalCountView = new BaseView({
      tag: 'div',
      classNames: ['total-winners-count'],
      textContent: '0 winners',
    });

    this.table = new BaseView({
      tag: 'table',
      classNames: ['winners-table'],
    });

    this.createTableHeader();
    this.appendChildren([
      nameView,
      this.totalCountView,
      this.table,
      pagination,
    ]);
  }

  private createTableHeader() {
    const thead = new BaseView({
      tag: 'thead',
      classNames: ['winners-table-head'],
    });
    const headerRow = new BaseView({ tag: 'tr' });

    const headers = ['#', 'Car', 'Name', 'Wins', 'Best Time (seconds)'];
    headers.forEach((headerText) => {
      const th = new BaseView({
        tag: 'th',
        textContent: headerText,
      });

      if (headerText === 'Best Time (seconds)') {
        th.getView().addEventListener('click', async () => {
          this.sortWinners('time');
        });
      }
      if (headerText === 'Wins') {
        th.getView().addEventListener('click', async () => {
          this.sortWinners('wins');
        });
      }
      headerRow.append(th);
    });

    thead.append(headerRow);
    this.table.append(thead);
  }

  private async loadWinners(page: number, limit: number) {
    try {
      const { winners, totalCount } = await getWinners(
        page,
        limit,
        this.sortBy,
        this.sortOrder,
      );
      this.totalCounter = totalCount;
      this.totalCountView.getView().textContent = `${this.totalCounter} winners`;

      const winnersData = await Promise.all(
        winners.map(async (winner) => {
          const carData = await getCar(winner.id);
          return {
            id: winner.id,
            name: carData.car.name,
            color: carData.car.color,
            wins: winner.wins,
            time: winner.time,
          };
        }),
      );

      this.renderWinners(winnersData);
    } catch (error) {
      console.error('Error');
    }
  }

  private renderWinners(
    winners: {
      id: number;
      name: string;
      color: string;
      wins: number;
      time: number;
    }[],
  ) {
    if (this.tBodyElement) {
      this.tBodyElement.removeAllChildren();
    } else {
      this.tBodyElement = new BaseView({
        tag: 'tbody',
        classNames: ['winners-table-body'],
      });
      this.table.append(this.tBodyElement);
    }

    winners.forEach((winner, index) => {
      const row = new BaseView({ tag: 'tr' });

      const carElement = new CarSvg();
      carElement.setCarColor(winner.color);

      const rowData = [
        (index + 1).toString(),
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
      if (this.tBodyElement) {
        this.tBodyElement.append(row);
      }
    });
  }
  private async sortWinners(sortBy: 'id' | 'wins' | 'time') {
    this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    this.sortBy = sortBy;

    await this.loadWinners(1, this.LIMIT_PAGES);
  }
}

export default WinnersView;
