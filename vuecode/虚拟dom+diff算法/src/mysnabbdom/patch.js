import createElement from "./createElement";
import vnode from "./vnode";
import patchVnode from '../mysnabbdom/patchVNode.js'

export default function(oldVnode,newVnode){
    //判断传入第一个参数是DOM节点还是虚拟节点
    if(oldVnode.sel == '' || oldVnode.sel == undefined){
        oldVnode = vnode(oldVnode.tagName.toLowerCase(),{},[],undefined,oldVnode)
    }

    //判断oldVnode和newVnode是不是同一个节点
    if(oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel){
        console.log('是同一个节点')
        patchVnode(oldVnode,newVnode) 
        

    }else{ //不是同一个
        console.log('bu shi tong yi ge ')
        //暴力插入新的，删除旧的
         let newVnodeElm =  createElement(newVnode)
         //插入
         oldVnode.elm.parentNode.insertBefore(newVnodeElm,oldVnode.elm)
        //  删除老的节点
        oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }
}