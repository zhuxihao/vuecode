import createElement from "./createElement"
import updateChildren from "./updataChildren"

export default function patchVnode(oldVnode,newVnode){
    //判断新旧VNode是否是同一个对象，是则什么都不做
    if (oldVnode === newVnode) return

    //判断新VNode有没有text属性
    if( newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length == 0)){
        console.log('新VNode有text属性')
        if(newVnode.text != oldVnode.text){
            oldVnode.elm.innerText = newVnode.text
        }
    }else{
        console.log('新VNode没有text属性')
        //判断老的有没有children
        if(oldVnode.children != undefined && oldVnode.children.length > 0){
            //老的有children，此时最为复杂，新老都有children
            //所有未处理的节点的开头
            // let un = 0
            // for (let i = 0;i<newVnode.children.length;i++){
            //     let ch = newVnode.children[i]
            //     //再次遍历，看看oldVnode中有没有节点和它是same的
            //     let isExist = false
            //     for ( let j = 0;j<oldVnode.children.length;j++){
            //         if(oldVnode.children[j].sel == ch.sel && oldVnode.children[j].key == ch.key) {
            //             isExist = true
            //         }
            //     }
            //     if(!isExist){
            //         console.log(ch)
            //         let dom = createElement(ch)
            //         ch.elm = dom
            //         if(un<oldVnode.children.length){
            //             oldVnode.elm.insertBefore(dom,oldVnode.children[un].elm)
            //         }else{
            //             oldVnode.elm.appendChild(dom)
            //         }
                   
            //     }else{
            //         un ++
            //     }
            // }
            updateChildren(oldVnode.elm,oldVnode.children,newVnode.children)




        }else{
            //老的没有children，新的有
            //清空老的节点的内容
            oldVnode.elm.innerHTML = ''
            //遍历新的vnode的子节点，创建dom，上树
            for(let i =0 ;i<newVnode.children.length;i++){
                let dom = createElement(newVnode.children[i])
                oldVnode.elm.appendChild(dom)
            }
            
        }
    }
}