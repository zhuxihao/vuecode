import h from './mysnabbdom/h.js'
import patch from './mysnabbdom/patch.js'
  

const myVnode1 = h('section',{},[
  h('li',{key:'A'},'a'),
  h('li',{key:'B'},'b'),
  h('li',{key:'C'},'c'),
  h('li',{key:'D'},'d'),
  h('li',{key:'E'},'e'),
    
])


// const myVnode1 = h('section',{},'w我就是一个文字')

// const myVnode2 = h('button',{},'我是按钮')

const container = document.getElementById('container')
const btn = document.getElementById('btn')

patch(container,myVnode1) 

const myVnode2 = h('section',{},[
  h('li',{key:'Q'},'q'),
  h('li',{key:'A'},'a'),
  h('li',{key:'B'},'b'),
  h('li',{key:'C'},'c'),
  h('li',{key:'D'},'d'),
  h('li',{key:'E'},'e'),
  
  
])

btn.onclick = function(){
  patch(myVnode1,myVnode2)
  // const btn2 = document.querySelectorAll('button')
  // btn2[1].onclick = function(){
  //   patch(myVnode2,myVnode1)
  // }
}

