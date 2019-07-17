import axios from 'axios'
import {api} from '../config'
export const newcategory=(name,_id)=>{
    return new Promise((resolve,reject)=>{
        axios.post(api.category.new,{name,_id}).then(res=>{
            console.log(res)
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
  }
export const categorylist=()=>{
    return new Promise((resolve,reject)=>{
        axios.get(api.category.list,).then(res=>{
            console.log(res)
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

export const categorybyid=(_id)=>{
    return new Promise((resolve,reject)=>{
        axios.post(api.category.show,{_id}).then(res=>{
            console.log(res)
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

export const categorydel=(_id)=>{
    return new Promise((resolve,reject)=>{
        axios.post(api.category.del,{_id}).then(res=>{
            console.log(res)
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}