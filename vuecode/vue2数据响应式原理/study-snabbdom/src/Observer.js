import { def } from "./utils.js";
import defineReactive from "./defineReactive.js";
import {arrayMethods} from './array.js'
import observe from "./observe.js";

export default class Observer{
    constructor(value){
        
        def(value,'__ob__',this,false)
        console.log(value);
        //检查数组还是对象
        if(Array.isArray(value)){
            //数组强行蛮干，将数组原型指向arrayMethods
            Object.setPrototypeOf(value,arrayMethods)
            //让这个数组变成observe
            this.observeArray(value)
        }else{
            this.walk(value)
        }
        
    }
    //遍历
    walk(value){
        for(let k in value){
            defineReactive(value,k)
        }
    }
    //数组的特殊遍历
    observeArray(arr){
        for (let i = 0,l = arr.length;i<l;i++){
            //逐项进行observe
            observe(arr[i])
        }
    }
}