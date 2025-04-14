import InputView from "../../../utils/inputView";
import BaseView from "../../baseView";
import SearchIcone from '../../../../assets/img/search.png';
import ChatUsersListView from "../chatUsersView/chatUsersListView";
import { findUser } from "../../../services/usersService";

class SearchUserView extends BaseView {
  private container: BaseView;
  private users: ChatUsersListView | null = null;
  private input: InputView | null = null;

  constructor() {
    super({ tag: 'div', classNames: ['search-container'] });
    this.container = this;
    this.renderSearch();
  }

  private renderSearch(): void {
    const button = this.renderSearchButton();
    const input = this.renderSearchInput();
    this.container.appendChildren([button, input]);
  }

  private renderSearchInput(): BaseView {
    const userSearch = new InputView();
    userSearch.addClass('search-input');
    userSearch.setPlaceholder('Search');
    this.input = userSearch;
    return userSearch;
  }

  private renderSearchButton(): BaseView {
    const button = new BaseView({ tag: 'button', classNames: ['search-button'], callback: () => this.hideUsers() });
    const icon = new BaseView({ tag: 'img', classNames: ['search-icon'] });
    const iconElement = icon.getView()

    if (iconElement instanceof HTMLImageElement) {
      iconElement.src = SearchIcone;
      iconElement.alt = 'Search';
    }
    button.appendChildren([icon]);
    return button;
  }

  public setUsers(users: ChatUsersListView) {
    this.users = users;
  }

  private find() {
    if (this.input && this.users) {
      const inputValue = this.input.getValue();
      return findUser(inputValue, this.users);
    }
  }

  private hideUsers() {
    if (this.input?.getValue() === '') {
      if (this.users) {
        this.users.friends.map(user => user.changeClass('remove', 'hide'));
        return;
      }
    }
    const selUser = this.find();
    if (this.users) {
      const usersToHide = this.users.friends.filter(user => user.name !== selUser?.name);
      usersToHide.map(user => user.changeClass('add', 'hide'));
    }
  }
}
export default SearchUserView;