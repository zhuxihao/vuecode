import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
  } from "snabbdom";
  
  const container = document.getElementById('container')
  const btn = document.getElementById('btn')
  

//创建出patch函数
const patch = init([classModule,propsModule,styleModule,eventListenersModule])

const vonde1 = h('ul',{},[
    h('li',{},'A'),
    h('li',{},'B'),
    h('li',{},'C')
])

patch(container,vonde1)

const vonde2 = h('ul',{},[
    h('li',{},'A'),
    h('li',{},'B'),
    h('li',{},'C'),
    h('li',{},'d')
])
btn.onclick = function(){
    patch(vonde1,vonde2)
}