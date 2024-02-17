import { TodoData } from "./todoEvent";
let todoData: TodoData[] = [];
/**
 * 类内部方法装饰器
 * @param _target 装饰的函数的类容器
 * @param _propertyKey 被装饰的函数的名称
 * @param descriptor 描述属性
 */
export function addData(
  /**当前装饰的函数的类容器 */
  _target: any,
  /**被装饰的函数的名称 */
  _propertyKey: string,
  /**描述属性 */
  descriptor: PropertyDescriptor
) {
  const _original = descriptor.value;
  descriptor.value = function (data: TodoData, container: HTMLElement) {
    const _todo: TodoData | undefined = todoData.find(
      (item) => item.content === data.content
    );
    if (_todo) {
      alert("该项已存在");
      return;
    }
    todoData.push(data);
    _original.call(this, data, container);
  };
}
export function removeData(
  _target: any,
  _propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const _original = descriptor.value;
  descriptor.value = function (id: number) {
    todoData = todoData.filter((item) => item.id !== id);
    console.log(todoData);
    _original(id);
  };
}
export function changeDataComplete(
  _target: any,
  _propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const _original = descriptor.value;
  descriptor.value = function (id: number) {
    let complete = false;
    todoData = todoData.map((item) => {
      if (item.id === id) {
        complete = item.complete = !item.complete;
      }
      return item;
    });
    console.log(todoData);
    _original(id, complete);
  };
}
/**
 * 类装饰器
 * @param Target 被装饰的类
 */
export function utils(Target: any) {
  Target.prototype.plus = (a: number, b: number) => {
    return a + b;
  };
  Target.prototype.minus = (a: number, b: number) => {
    return a - b;
  };
}
