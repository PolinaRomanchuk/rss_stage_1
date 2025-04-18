import InputView from "../../../../utils/inputView";
import BaseView from "../../../baseView";
import SearchIcone from '../../../../../assets/img/search.png';
import ChatUsersListView from "../chatUsersListView";
import { findUsers } from "../../../../services/usersService";

class SearchUserView extends BaseView {
  private users: ChatUsersListView | null = null;
  private searchInput: InputView | null = null;

  constructor() {
    super({ tag: 'div', classNames: ['search-container'] });
    this.renderSearch();
  }

  public setUsers(users: ChatUsersListView): void {
    this.users = users;
  }

  private renderSearch(): void {
    const button = this.renderSearchButton();
    const input = this.renderSearchInput();
    this.appendChildren([button, input]);
  }

  private renderSearchInput(): BaseView {
    const userSearch = new InputView();
    userSearch.addClass('search-input');
    userSearch.setPlaceholder('Search');
    this.searchInput = userSearch;
    return userSearch;
  }

  private renderSearchButton(): BaseView {
    const button = new BaseView({ tag: 'button', classNames: ['search-button'], callback: () => this.searchUsers() });
    const icon = new BaseView({ tag: 'img', classNames: ['search-icon'] });
    const iconElement = icon.getView()

    if (iconElement instanceof HTMLImageElement) {
      iconElement.src = SearchIcone;
      iconElement.alt = 'Search';
    }
    button.appendChildren([icon]);
    return button;
  }

  private searchUsers(): void {
    const input = this.searchInput?.getValue().trim().toLowerCase();

    if (!input || !this.users) {
      this.users?.friendsList.forEach(user => user.changeClass('remove', 'hide'));
      return;
    }

    const matchedUsers = findUsers(input, this.users.friendsList);

    this.users.friendsList.forEach(user => {
      if (matchedUsers.includes(user)) {
        user.changeClass('remove', 'hide');
      } else {
        user.changeClass('add', 'hide');
      }
    });
  }
}

export default SearchUserView;