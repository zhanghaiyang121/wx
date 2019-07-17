let baseurl='/api'
let imgbase="http://wechat10day.vipgz1.idcfengye.com"
if(process.env.NODE_ENV=='production'){
    baseurl='',
    imgbase=''
}
export const api={
    imgbase,
    user:{
        signin:baseurl+'/signin',
        signup:baseurl+'/signup',
        userlist:baseurl+'/admin/user/list',
        deleteuser:baseurl+'/admin/deleteuser'
    },
    category:{
        new:baseurl+'/admin/category',
        list:baseurl+'/admin/category/list',
        show:baseurl+"/admin/category/show",
        del:baseurl+"/admin/category/del"
    },
    movie:{
        list:baseurl+'/admin/movie/list',
        admin:baseurl+'/admin/movie',
        del:baseurl+'/admin/movie/del',
        detail:baseurl+'/movie/detail',
    }
}