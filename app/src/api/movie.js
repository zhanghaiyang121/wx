import axios from 'axios'
import {api} from '../config'


export const movielist=()=>{
    return new Promise((resolve,reject)=>{
        axios.get(api.movie.list).then(res=>{
            console.log(res)
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
  }

  export const movieadmin=(formdata)=>{
    return new Promise((resolve,reject)=>{
        axios({
            method: "post",
            url: api.movie.admin,
            data: formdata,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
  }

export const moviedel=(id)=>{
    return new Promise((resolve,reject)=>{
        axios.post(api.movie.del,{id}).then(res=>{
            console.log(res)
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
  }

export const moviedetail=(_id)=>{
    return new Promise((resolve,reject)=>{
        axios.post(api.movie.detail,{_id}).then(res=>{
            console.log(res)
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
  }