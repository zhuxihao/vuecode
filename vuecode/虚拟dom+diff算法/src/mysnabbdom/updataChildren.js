//更新子节点js

import patchVnode from "./patchVNode.js"
import createElement from "./createElement.js"
//判断是否是一个虚拟节点
function checkSameVnode(a,b){
    return a.sel == b.sel && a.key == b.key
}
export default function updateChildren(parentElm,oldCh,newCh){
    console.log('wo shi updateChildren')
    console.log(oldCh,newCh)

    //旧前
    let oldStartIdx = 0
    //新前
    let newStartIdx = 0
    //旧后
    let oldEndIdx = oldCh.length-1
    //新后
    let newEndIdx = newCh.length-1

    //旧前节点
    let oldStartVnode = oldCh[0]
    //旧后节点
    let oldEndVnode = oldCh[oldEndIdx]
    //新前节点
    let newStartVnode = newCh[0]
    //新后节点
    let newEndVnode = newCh[newEndIdx]

    let keyMap = null

    //开始大while
    while(oldStartIdx <= oldEndIdx&& newStartIdx <= newEndIdx){
        
        console.log('☆')

        if(oldStartVnode == null || oldCh[oldStartIdx] ==undefined){
            oldStartVnode = oldCh[++oldStartIdx]
        }else if (oldEndVnode == null || oldCh[oldEndIdx] == undefined){
            oldEndVnode = oldCh[--oldEndIdx]
        }
        else if (newStartVnode == null || newCh[newStartIdx] == undefined){
            newStartVnode = newCh[++newStartIdx]
        }
        else if (newEndVnode == null || newCh[newEndIdx] == undefined){
            newEndVnode = newCh[--newEndIdx]
        }else if(checkSameVnode(oldStartVnode,newStartVnode)){
        //新前与旧前
            console.log('新前与旧前')
            patchVnode(oldStartVnode,newStartVnode)
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
        }else if(checkSameVnode(oldEndVnode,newEndVnode)) {
        //新后与旧后
            console.log('新后与旧后')
            patchVnode(oldEndVnode,newEndVnode)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        }else if(checkSameVnode(oldStartVnode,newEndVnode)){
        //新后与旧前 
            console.log('新后与旧前')
            patchVnode(oldStartVnode,newEndVnode)
            //插入：当新后与旧前命中时，此时要移动节点。
            //      移动旧前指向的这个节点到老节点的旧后的后面
            parentElm.insertBefore(oldStartVnode.elm,oldEndVnode.elm.nextSibling)
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]
        }else if(checkSameVnode(oldEndVnode,newStartVnode)){
        //新前与旧后 
            console.log('新前与旧后')
            patchVnode(oldEndVnode,newStartVnode)
            //插入：当新后与旧前命中时，此时要移动节点。
            //      移动新前指向的这个节点到老节点的旧前的前面
            parentElm.insertBefore(oldEndVnode.elm,oldStartVnode.elm)
            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[++newStartIdx]
        }else{
        //都未命中
            //寻找key中的map
            if(!keyMap){
                keyMap = {}
                for (let i =oldStartIdx;i<=oldEndIdx;i++){
                    const key  = oldCh[i].key
                    if(key != undefined){
                        keyMap[key] = i
                    }
                }
            }   
            console.log(keyMap)
            //寻找newStartIdx在keyMap中映射的位置序号
            const idxInOld = keyMap[newStartVnode.key]
            console.log(idxInOld)
           
            if(idxInOld == undefined){
            //判断，如果idxInOld是undefined表示它是全新的项
            parentElm.insertBefore(createElement(newStartVnode),oldStartVnode.elm)
            }else{
            //如果idxInOld不是undefined表示它不是全新的项，而是需要移动
                    const elmToMove = oldCh[idxInOld]
                    patchVnode(elmToMove,newStartVnode)
                    //把这项设置为undefined，表示处理完了
                    oldCh[idxInOld] = undefined
                    //移动，调用insertBefore也可以实现移动
                    parentElm.insertBefore(elmToMove.elm,oldStartVnode.elm)
                
                
            }
            newStartVnode = newCh[++newStartIdx]
        }
    }
    //while结束后查看有无剩余的,即start仍小于end
    if(newStartIdx <= newEndIdx){
        console.log('new里还有剩余节点没有处理')
        // 插入的标杆
        // const before = newCh[newEndIdx +1] == null ? null:newCh[newEndIdx +1].elm;
        // console.log(before)
        for(let i = newStartIdx;i<=newEndIdx;i++){
            //insertBefore可以自动识别null，如果是null，则表示插入队尾
            parentElm.insertBefore(createElement(newCh[i]),oldCh[oldStartIdx].elm)
        }
    }else if(oldStartIdx <= oldEndIdx){
        console.log('old里还有剩余节点没有处理')
        // 批量删除oldStartIdx和oldEndIdx之间的项
        for (let i =oldStartIdx ;i<=oldEndIdx;i++){
            if(oldCh[i] != undefined){
                parentElm.removeChild(oldCh[i].elm)
            }
            
        }
    }

}