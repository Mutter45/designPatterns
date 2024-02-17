import TodoEvent from "./todoEvent";
((document) => {
  const todoContainer: HTMLElement = document.querySelector(".todo-container");
  const todoInput: HTMLInputElement = document.querySelector(".todo-input");
  const addTodo: HTMLElement = document.querySelector(".add-todo");
  /**
   * addItem
   * removeItem
   * changeItemComplete
   */
  const todoEvent = TodoEvent.create();
  function init() {
    bindEvents();
  }
  function handleTodoList(e: MouseEvent) {
    console.log("handle todo list");
    const target = e.target as HTMLElement;
    const tagName = target.tagName.toLowerCase();
    if (tagName === "button" || tagName === "input") {
      switch (tagName) {
        case "button":
          todoEvent.removeItem(target);
          break;
        case "input":
          todoEvent.changeItemComplete(target as HTMLInputElement);
          break;
        default:
          break;
      }
    }
  }
  function handleAdd() {
    console.log("add todo", todoInput.value);
    const data = {
      id: Date.now(),
      content: todoInput.value,
      complete: false,
    };
    todoEvent.addItem(data, todoContainer);
  }
  function bindEvents() {
    todoContainer.addEventListener("click", handleTodoList);
    addTodo.addEventListener("click", handleAdd);
  }
  init();
})(document);
