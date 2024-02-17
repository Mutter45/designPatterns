import { createTodoItem } from "./template";
import { addData, removeData, changeDataComplete, utils } from "./decorator";
export interface TodoData {
  id: number;
  content: string;
  complete: boolean;
}
@utils
class TodoEvent {
  private static instance: TodoEvent;
  private container: HTMLElement;
  constructor(container: HTMLElement) {
    this.container = container;
    // console.log(this, this.plus(1, 2));
  }
  @addData
  public addItem(data: TodoData) {
    const item = createTodoItem(data);
    const div = document.createElement("div");
    div.className = "todo-item";
    div.innerHTML = item;
    this.container.appendChild(div);
  }
  @removeData
  public removeItem(id: number) {
    const tag = document.querySelector(`[data-id="${id}"]`);
    tag.parentElement.remove();
  }
  @changeDataComplete
  public changeItemComplete(id: number, complete?: boolean) {
    const tag = document.querySelector(`[data-id="${id}"]`);
    tag.nextElementSibling.classList.toggle("completed", complete);
  }
  public static create(container: HTMLElement) {
    if (!this.instance) {
      this.instance = new TodoEvent(container);
    }
    return this.instance;
  }
}
export default TodoEvent;
