import BaseView from "../baseView";

class Pagination extends BaseView {
  constructor() {
    super({
      tag: 'div',
      classNames: ['pagination-container'],
    });
   
    const currentPage = new BaseView({tag:'span', classNames:['current-page'], textContent:'1'});

    const nextBtn = new BaseView({tag:'button', classNames:['next-page-button'], textContent:'Next'});
    const prevBtn = new BaseView({tag:'button', classNames:['previous-page-button'], textContent:'Back'});


    this.appendChildren([prevBtn, currentPage, nextBtn]);
  }
}

export default Pagination;
