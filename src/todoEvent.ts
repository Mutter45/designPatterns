import { createTodoItem } from "./template";
export interface TodoData {
  id: number;
  content: string;
  complete: boolean;
}
export default class TodoEvent {
  private static instance: TodoEvent;
  public addItem(data: TodoData, container: HTMLElement) {
    const item = createTodoItem(data);
    const div = document.createElement("div");
    div.className = "todo-item";
    div.innerHTML = item;
    container.appendChild(div);
  }
  public removeItem(tag: HTMLElement) {
    tag.parentElement.remove();
  }
  public changeItemComplete(tag: HTMLInputElement, complete?: boolean) {
    tag.nextElementSibling.classList.toggle("completed", tag.checked);
  }
  public static create() {
    if (!this.instance) {
      this.instance = new TodoEvent();
    }
    return this.instance;
  }
}
