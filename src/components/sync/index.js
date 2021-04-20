import './index.css'
import {isArray} from 'lodash-es'
const isArrayfn = (agrs) => {
  console.log(isArray(agrs));
}
const sync = () => {
  fetch("/api/test")
  .then(response=>response.json())
  .then(data=>{
    console.log("fetch结果",data.message)
  })
  .catch(err=>{
    console.log("错误了")
  })
}
export {
  sync,
  isArrayfn
}