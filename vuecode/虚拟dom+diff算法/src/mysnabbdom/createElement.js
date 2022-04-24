

//真正创建节点,将vnode创建为DOM，不进行插入
export default function createElement(vnode){
    let domNode = document.createElement(vnode.sel)
    //有子节点还是有文本
     if(vnode.text !='' && (vnode.children == undefined || vnode.children.length == 0)){
         //内部是文字
         domNode.innerText = vnode.text
         
     } else if(Array.isArray(vnode.children) && vnode.children.length >0){
         //内部是子节点，需要递归创建
         for(let i = 0;i<vnode.children.length;i++){
             let ch = vnode.children[i];
            //  console.log(ch)
            let chDOM = createElement(ch)
            domNode.appendChild(chDOM)
         }
     }
     vnode.elm = domNode
     //返回纯DOM
     return vnode.elm
}