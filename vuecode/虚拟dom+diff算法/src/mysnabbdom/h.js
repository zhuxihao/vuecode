import vnode from './vnode.js'

export default function(sel,data,c){
    //检查参数c的类型
    if(typeof  c == 'string' || typeof c == 'number'){
        return vnode(sel,data,undefined,c,undefined)
    } else if (Array.isArray(c)){
        let children = []
        for (let i =0 ;i<c.length;i++){
            //注意，这里h函数在测试语句中有执行，只需要收集就可以
            children.push(c[i])
        }
        return vnode(sel,data,children,undefined,undefined)
    } else if (typeof c == 'object' && c.hasOwnProperty('sel')){
        let children = [c]
    } else {
        throw new Error('出错了，潮吧')
    }
}