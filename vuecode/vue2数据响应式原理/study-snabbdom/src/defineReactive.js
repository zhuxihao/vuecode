import  observe  from "./observe.js"

export default function defineReactive(data,key,val){
  console.log('我是defineReactive',data,key)
    if(arguments.length == 2){
      val = data[key]
    }

    let childOb =  observe(val)

    Object.defineProperty(data,key,{
      enumerable:true,
      get(){
        console.log('访问'+key)
        
        return val
      }, 
      set(newval){
        console.log('改变'+key,newval);
        val = newval
        childOb = observe(newval)
        
        const inp = document.getElementById('inp')
        
          inp.value = val
        
      }
    })
  }