import axios from 'axios'
import {api} from '../config'
export const signup=(params)=>{
    return new Promise((resolve,reject)=>{
          axios.post(api.user.signup,params).then(res=>{
            resolve(res)
          }).catch(error=>{
            reject(error)
          })
    })
  }

  export const signin=(params)=>{
    return new Promise((resolve,reject)=>{
        axios.post(api.user.signin,params).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
  }

  export const list=()=>{
    return new Promise((resolve,reject)=>{
        axios.get(api.user.userlist).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
  }

  export const deleteuser=(id)=>{
    return new Promise((resolve,reject)=>{
        axios.post(api.user.deleteuser,{id}).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
  }