import axios from 'axios'
import {api} from '../config'


export const sdk=(url)=>{
    return new Promise((resolve,reject)=>{
        axios.post(api.sdk,{url}).then(res=>{
            console.log(res)
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
  }
  export const autho=(url)=>{
    return new Promise((resolve,reject)=>{
        axios.get(api.autho).then(res=>{
            console.log(res)
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
  }