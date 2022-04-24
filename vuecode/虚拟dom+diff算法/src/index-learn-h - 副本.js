import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
  } from "snabbdom";
  

//创建出patch函数
const patch = init([classModule,propsModule,styleModule,eventListenersModule])

//创建虚拟节点
const myVnode1= h('a',{
    props:{
        href:'http://www.atguigu.com',
        target:'_blank'
        }
},'shangguigu')

const myVnode2 = h('ul',{},[
    '哈哈哈',
    h('li',{},'牛奶'),
    h('li',{},'咖啡'),
    h('li',{},'面包')
])
 console.log(myVnode1)

//让虚拟节点上树
const container = document.getElementById('container')

patch(container,myVnode2)