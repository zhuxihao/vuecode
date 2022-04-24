
import  observe  from "./observe.js"

var obj = {
  a:{
    m:{
      n:10
    }
  },
  b:100,
  c:[1,2,3,4]
}




observe(obj)
// console.log(++obj.a.m.n,'ashuxing');
const btn = document.getElementById('btn')
btn.onclick = function(){
  obj.b ++
}
// obj.b++
// obj.c.splice(0,1,88,99)
// console.log(obj.c);


 

