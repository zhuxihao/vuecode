import { def } from "./utils.js";

//得到Array.prototype
const arrayPrototype = Array.prototype;

//以Array.prototype为原型创建arrayMethods对象
export const arrayMethods = Object.create(arrayPrototype);
//暴露
// export const arrayMethods

console.log(arrayMethods);
//要被改写的七个数组方法

const methodsNeedChange = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "rverse",
];

methodsNeedChange.forEach((methodName) => {
  //备份原来的方法
  const original = arrayPrototype[methodName];
  //定义新的方法
  def(
    arrayMethods,
    methodName,
    function () {
        const result = original.apply(this, arguments);
        const args = [...arguments]

      //得到__ob__
      const ob = this.__ob__;
      //push unshift splice 能够插入新项，新项也得变为observe
      let inserted = []
      switch(methodName){
          case 'push':
          case 'unshift':
              inserted = args;
              break;
          case 'splice':
              inserted = args.slice(2)
              break
      }
      //判断有无新项，让新项也变为observe
      if(inserted){
          ob.observeArray(inserted)
      }
      console.log("lalala");
      

      return result
    },
    false
  );
});
