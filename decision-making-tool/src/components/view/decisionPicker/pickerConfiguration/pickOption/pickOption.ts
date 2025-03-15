import BaseView from "../../../baseView";

class PickOption extends BaseView{
 constructor(){
  super({
    tag: 'span',
    classNames: ["pick-option"],
    textContent: "Press button to start"
  })
 }
}
export default PickOption;