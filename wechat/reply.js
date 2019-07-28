/**回复的业务的代码 
 * 解析message，并制定一个恢复策略
 * 把回复的内容交给ctx
*/
const {resolve}=require('path')
const fs=require('fs')
const request = require('request-promise')
const conf=require('../config/config')
exports.reply=async(ctx,next)=>{
    const message=ctx.weixin
    const Wechat =require('../wechat-lib')
    const client= new Wechat(conf.wechat)
    console.log(message)
    if(message.MsgType==='event'){
        // console.log(message)
        // let event=message.Event
        // if(event==='pic_sysphoto'){
        //     console.log(1)
        // }
        let newsarticle=[
            {
                title:"图文测试1",
                description:"图文描述",
                picUrl:'http://img.duoziwang.com/2018/04/2411130526581.jpg',
                url:"https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738729"
            },
            {
                title:"图文测试1",
                description:"图文描述",
                picUrl:'http://img.duoziwang.com/2018/04/2411130526581.jpg',
                url:"https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738729"
            },
            {
                title:"图文测试1",
                description:"图文描述",
                picUrl:'http://mmbiz.qpic.cn/mmbiz_jpg/yiacUoLrgIibygTiczcEW2PsVBZ5VC1pLh7BDkUIj8gx5SN9icR8sQLpqpUVdic4M2nxfkJbUud8LvK6aYz4a5iaTq7g/0?wx_fmt=jpeg',
                url:"https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738729"
            }
        ]
        let reply=newsarticle
        ctx.body=reply
    }
    if(message.MsgType==='voice'){
        
    }
    if(message.MsgType==='link'){
        ctx.body='link'
    }
    if(message.MsgType==='location'){
        ctx.body='location'
    }
    if(message.MsgType==='text'){
        let content=message.Content
        let reply='Oh,你说的'+content+'太复杂了，无法解析'
        if(content==='1'){
            // reply='天下第一吃大米'
            reply='http://wechat10day.vipgz1.idcfengye.com'
        }else if(content==='2'){
            reply="天下第二吃咸蛋"
        }else if(content==='3'){
            reply="天下第三吃豆腐"
        }else if(content==='imooc'){
            reply="诶呦喂,你是慕课的小伙伴吗"
        }else if(content==="4"){
//=============================================上传临时素材====================================================================//
            let data = await client.handle('uploadMaterial', 'image', resolve(__dirname, '../2.jpg'),false)
            console.log('上传图片成功')
            console.log(data)
            if(data.media_id){
                reply = '上传临时素材图片成功\n'+
                    'media_id:'+data.media_id
            }else{
                reply = '上传临时素材图片失败'
            }
            
        }else if(content==='5'){
            let data = await client.handle('uploadMaterial', 'video', resolve(__dirname, '../6.mp4'),false)
            console.log('上传视频成功')
            console.log(data)
            if(data.media_id){
                reply = '上传临时素材视频成功\n'+
                    'media_id:'+data.media_id
            }else{
                reply = '上传临时素材视频失败'
            }
        }else if(content==='6'){
            let data = await client.handle('uploadMaterial', 'voice', resolve(__dirname, '../3.mp3'),false)
            console.log('上传音频成功')
            console.log(data)
            if(data.media_id){
                reply = '上传临时素材音频成功\n'+
                    'media_id:'+data.media_id
            }else{
                reply = '上传临时素材音频失败'
            }
        }else if(content==='7'){
            let data = await client.handle('uploadMaterial', 'thumb', resolve(__dirname, '../2.jpg'),false)
            console.log('上传缩略图成功')
            console.log(data)
            if(data.media_id){
                reply = '上传临时素材缩略图成功\n'+
                    'media_id:'+data.thumb_media_id
            }else{
                reply = '上传临时素材缩略图失败'
            }
//====================================上传临时素材结束==========================================================================//
        }else if(content==='8'){
//====================================上传永久素材开始==========================================================================//
            // let data = await client.handle('uploadMaterial', 'thumb', resolve(__dirname, '../4.jpg'),false)
            // console.log(data)
            reply={
                type:'music',
                title:"标题",
                description:'音乐描述',
                musicUrl:'http://m10.music.126.net/20190701142122/80d538ffa03073934267e16ccc826c9d/yyaac/555a/040c/5158/b015cefea13fa81f559af2457571319f.m4a',
                thumbMediaId:'EsLj-OCDnnwpVPJzRueki4Vx8kCN7MoEBf6Tz811t_Q'
            }
        }else if(content==='9'){
            let thumb_media='EsLj-OCDnnwpVPJzRueki5nFMKNtG7q0vSERcZ3R4DA'
           let news={ articles:[
                                    {
                                        title: '图文测试1',
                                        thumb_media_id: thumb_media,
                                        author: 'zhangsan',
                                        show_cover_pic: 1,
                                        content: '图文测试内容',
                                        content_source_url: 'https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738729'
                                    }
                                ]
                    }
            
            let data = await client.handle('uploadMaterial', 'news', news,{})
            console.log('上传图文素材成功')
            console.log(data)
            reply='上传图文素材成功'+data

        }else if(content==='10'){
            let data = await client.handle('uploadMaterial', 'pic', resolve(__dirname, '../2.jpg'),{})
            console.log(data)
            reply='上传永久素材图文图片成功'+data.url
        }else if(content==='11'){
            let data = await client.handle('uploadMaterial', 'video', resolve(__dirname, '../6.mp4'),{
                type: 'video',
                description: '{"title": "这个地方很棒", "introduction": "好吃不如饺子"}'
            })
            console.log(data)
            reply='上传永久素材视频成功'+data.media_id
        }else if(content==='12'){
            let data = await client.handle('uploadMaterial', 'image', resolve(__dirname, '../2.jpg'),{})
            console.log(data)
            reply='上传永久素材图片成功\n'+
                'media_id:'+data.media_id+'\n'+
                "url:"+data.url
        }else if(content==='13'){
            let data = await client.handle('uploadMaterial', 'voice', resolve(__dirname, '../3.mp3'),{})
            console.log(data)
            reply='上传永久素材音频成功\n'+
                'media_id:'+data.media_id+'\n'
        }else if(content==='14'){
            let data = await client.handle('uploadMaterial', 'thumb', resolve(__dirname, '../2.jpg'),{})
            console.log(data)
            reply='上传永久素材缩略图成功\n'+
                'media_id:'+data.media_id+'\n'
//====================================上传永久素材结束==========================================================================//
        }else if(content==='15'){
            let data = await client.handle('countMaterial')
            console.log(data)
            reply='查询上传素材\n'+
                'voice_count:'+data.voice_count+'\n'+
                'video_count:'+data.video_count+'\n'+
                'image_count:'+data.image_count+'\n'+
                'news_count:'+data.news_count+'\n'
        }else if(content==='16'){
//====================================获取永久素材开始==========================================================================//            
            let media_id='EsLj-OCDnnwpVPJzRueki0bg5uDpET3GPlnJrUqaknw'
            let data = await client.handle('fetchMaterial',media_id,'video',{})
            console.log(data)
            reply='获取永久视频素材\n'+
            '视频下载地址down_url:'+data.down_url+'\n'+
            '视频描述description:'+data.description+'\n'+
            '视频标题title:'+data.title
           
        }else if(content==='17'){
            //获取图片素材成功
            let media_id='EsLj-OCDnnwpVPJzRueki7VJBS_d-9LtnEuRryd5TZM'
            let data= await client.fetchAccessToken()
            client
            let options={
                method: 'POST',
                url: 'https://api.weixin.qq.com/cgi-bin/material/get_material?access_token='+data.access_token,
                body:{ 
                        media_id: media_id,
                        access_token: data.access_token
                    },
                json: true 
            }
            let res= await request(options).pipe(fs.createWriteStream(resolve(__dirname, '4.jpg')));
            
            // await res.on('finish', function () {
              reply='获取永久素材图片成功'
            // });
        }else if(content==='18'){
            //获取图片素材成功
            let data= await client.fetchAccessToken()
            let media_id='EsLj-OCDnnwpVPJzRuekiyhmMOrZ-uHHxLqd4lPCSAw'
            console.log(data)
            let options={
                method: 'POST',
                url: 'https://api.weixin.qq.com/cgi-bin/material/get_material?access_token='+data.access_token,
                body:{ 
                        media_id:media_id ,
                        access_token:data.access_token  
                    },
                json: true 
            }
            let res= await request(options).pipe(fs.createWriteStream(resolve(__dirname, '5.jpg')));
            
            // await res.on('finish', function () {
              reply='获取永久素材缩略图成功'
            // });
        }else if(content==='19'){
            let data= await client.fetchAccessToken()
            let media_id='EsLj-OCDnnwpVPJzRuekizFOaqA7zHiWpLYbTD5MsHU'
            let options={
                method: 'POST',
                url: 'https://api.weixin.qq.com/cgi-bin/material/get_material?access_token='+data.access_token,
                body:{ 
                        media_id:media_id ,
                        access_token: data.access_token
                    },
                json: true 
            }
            let res= await request(options).pipe(fs.createWriteStream(resolve(__dirname, '5.mp3')));
            // console.log(res)
            // res.on('finish', function () {
              reply='获取永久素材音频成功'
            // });
        }else if(content==='20'){
            //获取图文永久素材
            let media_id='EsLj-OCDnnwpVPJzRuekiwehftBcK8rrBDtHI-nIA3g'
            let newsData = await client.handle('fetchMaterial',media_id,'news',{})
            let items = newsData.news_item
            console.log(items)
            reply='获取图文永久素材'
//===========================================获取永久素材结束=================================================//
        }else if(content==='22'){
//===========================================获取永久素材列表开始=================================================//           
            //获取永久素材列表
            let newsData = await client.handle('batchMaterial',{
               type: 'news'
            })
            console.log(newsData)
            reply='获取永久图文素材列表'
        }else if(content==='23'){
            //获取永久素材列表
            let newsData = await client.handle('batchMaterial',{
               type: 'image'
            })
            console.log(newsData)
            reply='获取永久图片素材列表'
        }else if(content==='24'){
            //获取永久素材列表
            let newsData = await client.handle('batchMaterial',{
               type: 'video'
            })
            console.log(newsData)
            reply='获取永久视频素材列表'
        }else if(content==='25'){
            //获取永久素材列表
            let newsData = await client.handle('batchMaterial',{
               type: 'voice'
            })
            console.log(newsData)
            reply='获取永久音频素材列表'
//===========================================获取永久素材列表结束=================================================//            
        }else if(content==='26'){
//=======================================删除永久素材开始===================================================//            
            let media_id='EsLj-OCDnnwpVPJzRueki0bg5uDpET3GPlnJrUqaknw'
            let newsData = await client.handle('deleteMaterial',media_id)
            console.log(newsData)
            reply='删除永久视频素材'
        }else if(content==='27'){
 //============================更新素材=========================================//           
            let media_id='EsLj-OCDnnwpVPJzRuekiwehftBcK8rrBDtHI-nIA3g'
            let thumb_media_id='EsLj-OCDnnwpVPJzRuekiyhmMOrZ-uHHxLqd4lPCSAw'
            let newMedia = {
                media_id: media_id,
                index: 0,
                articles: {
                  title: '这是服务端上传的图文 0',
                  thumb_media_id: thumb_media_id,
                  author: 'zhangsan',
                  digest: '没有摘要',
                  show_cover_pic: 1,
                  content: '点击去往慕课网',
                  content_source_url: 'http://coding.imooc.com/'
                }
              }
            let newsData = await client.handle('updateMaterial',media_id,newMedia)
            
            console.log(newsData)
            reply='修改永久图文素材'
 //============================更新素材结束=========================================//                
        }else if(content==='28'){
//============================删除永久素材开始=========================================//
            let media_id='EsLj-OCDnnwpVPJzRuekiwehftBcK8rrBDtHI-nIA3g'
            let newsData = await client.handle('deleteMaterial',media_id)
            console.log(newsData)
            reply='删除永久图文素材'
//============================删除永久素材结束=========================================//            
        }else if(content==='29'){
//===============================用户管理=====================================================//
            let tagData = await client.handle('createTag','suki1')
            console.log(tagData)
            reply='创建标签成功'

        }else if(content==='30'){
            let tagData = await client.handle('fetchTags')
            console.log(tagData)
            reply='获取全部的标签成功'
        }else if(content==='31'){
            let tagData = await client.handle('updateTag',100,'zhy1')
            console.log(tagData)
            reply='更新标签成功'
        }else if(content==='100'){
            let tagData = await client.handle('delTag',100)
            console.log(tagData)
            reply='删除标签成功'
        }else if(content==='32'){
            let tagData = await client.handle('fetchTagUsers',100)
            console.log(tagData)
            reply='获取标签里的用户成功'
        }else if(content==='33'){
            let openidlist=['oMuUk5hSvpD-YSsC0fUzB0MtMKBk']
            let tagData = await client.handle('batchTag',openidlist,101)
            console.log(tagData)
            reply='批量为用户打标签成功'
        }else if(content==='34'){
            let openidlist=['oMuUk5hSvpD-YSsC0fUzB0MtMKBk']
            let tagData = await client.handle('batchTag',openidlist,100,true)
            console.log(tagData)
            reply='批量为用户取消标签'
        }else if(content==='35'){
            let openid='oMuUk5hSvpD-YSsC0fUzB0MtMKBk'
            let tagData = await client.handle('getUserTags',openid)
            console.log(tagData)
            reply='获取用户身上的标签列表'
        }else if(content==='36'){
            let tagData = await client.handle('fetchUserList')
            console.log(tagData)
            reply='获取用户列表'
        }else if(content==='37'){
            let openid='oMuUk5hSvpD-YSsC0fUzB0MtMKBk'
            let tagData = await client.handle('remarkUser',openid,'sb')
            console.log(tagData)
            reply='设置用户备注名'
        }else if(content==='38'){
            let openid='oMuUk5hSvpD-YSsC0fUzB0MtMKBk'
            let tagData = await client.handle('getUserInfo',openid)
            console.log(tagData)
            reply='获取用户的详细信息'
        }else if(content==='39'){
            let openidlist=[
                    {
                        openid:'oMuUk5hSvpD-YSsC0fUzB0MtMKBk',
                        lang:'zh_CN'
                    },
                    {
                        openid:'oMuUk5gCaH6abqpRMyOrb4lyYIXA',
                        lang:"zh_CN"
                    }
                ]
            let tagData = await client.handle('fetchBatchUsers',openidlist)
            console.log(tagData)
            reply='批量获取用户的详细信息'
//==========================================用户管理结束==========================================//
        }else if(content==='40'){
//===========================================二维码开始===========================================//
            let tempQrData = {
                expire_seconds: 400000,
                action_name: 'QR_SCENE',
                action_info: {
                scene: {
                    scene_id: 101
                }
                }
            }
            let tagData = await client.handle('createQrcode',tempQrData)
            //gQFV8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyRm4xcU5nT0JjQUMxOUw4eGh0MWsAAgTubRtdAwSAGgYA
            //http://weixin.qq.com/q/02Fn1qNgOBcAC19L8xht1k
            console.log(tagData)
            reply='临时二维码生成成功'
        }else if(content==='42'){
            let tempQrData = {
                action_name: 'QR_LIMIT_SCENE',
                action_info: {
                scene: {
                        scene_id: 'test'
                    }
                }
            }
            let tagData = await client.handle('createQrcode',tempQrData)
            let tempQr = client.showQrcode(tagData.ticket)
            //gQGQ8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyRlFfT041T0JjQUMxMDAwMHcwM20AAgQ6bxtdAwQAAAAA
            //http://weixin.qq.com/q/02FQ_ON5OBcAC10000w03m
            console.log(tempQr)
            reply='永久二维码生成成功'
//====================================二维码结束================================================//
        }else if(content==='43'){
//===============================长连接转短连接开始=======================================================//
            let longurl="https://coding.imooc.com/learn/list/264.html"
            let tagData = await client.handle('createShortUrl','long2short',longurl)
            console.log(tagData)
            reply='长连接转短连接成功'
//===============================长连接转短连接结束=======================================================//            
        }else if(content==='44'){
            let body = '编程语言难学么'
            let aiData = await client.handle('aiTranslate', body, 'zh_CN', 'en_US')
            console.log(aiData)
            reply=aiData.to_content
        }else if(content==='45'){
            let menu = {
                button: [
                  {
                    name: '一级菜单',
                    sub_button: [
                      {
                        name: '二级菜单 1',
                        type: 'click',
                        key: 'no_1'
                      }, {
                        name: '二级菜单 2',
                        type: 'click',
                        key: 'no_2'
                      }, {
                        name: '二级菜单 3',
                        type: 'click',
                        key: 'no_3'
                      }, {
                        name: '二级菜单 4',
                        type: 'click',
                        key: 'no_4'
                      }, {
                        name: '二级菜单 5',
                        type: 'click',
                        key: 'no_5'
                      }
                    ]
                  },
                  {
                    name: '分类',
                    type: 'view',
                    url: 'http://wechat10day.vipgz1.idcfengye.com/test'
                  },
                  {
                    name: '新菜单_' + Math.random(),
                    type: 'click',
                    key: 'new_111'
                  }
                ]
              }

            menu={
                button: [
                    {
                        name: "扫码", 
                        sub_button: [
                            {
                                type: "scancode_waitmsg", 
                                name: "扫码带提示", 
                                key: "rselfmenu_0_0", 
                                sub_button: [ ]
                            }, 
                            {
                                type: "scancode_push", 
                                name: "扫码推事件", 
                                key: "rselfmenu_0_1", 
                                sub_button: [ ]
                            },
                            {
                                type:"click",
                                name:"赞一下我们",
                                key:"V1001_GOOD"
                            }
                        ]
                    }, 
                    {
                        name: "发图", 
                        sub_button: [
                            {
                                type: "pic_sysphoto", 
                                name: "系统拍照发图", 
                                key: "rselfmenu_1_0", 
                                sub_button: [ ]
                                }, 
                            {
                                type: "pic_photo_or_album", 
                                name: "拍照或者相册发图", 
                                key: "rselfmenu_1_1", 
                                sub_button: [ ]
                            }, 
                            {
                                type: "pic_weixin", 
                                name: "微信相册发图", 
                                key: "rselfmenu_1_2", 
                                sub_button: [ ]
                            },
                            {    
                                type:"view",
                                name:"搜索",
                                url:"http://www.soso.com/"
                            },
                        ]
                    }, 
                    {
                        name: "其他" ,
                        sub_button:[
                            {
                                name: "发送位置", 
                                type: "location_select", 
                                key: "rselfmenu_2_0"
                            },
                            {
                                type: "media_id", 
                                name: "图片", 
                                media_id: "EsLj-OCDnnwpVPJzRueki5DwXDxRHKVFHutxiPLhJhA"
                            }, 
                            {
                                type: "view_limited", 
                                name: "图文消息", 
                                media_id: "EsLj-OCDnnwpVPJzRuekixwKouOYcAdmXUOWKEDYqvA"
                            }
                        ]
                    }
                            
                ]
            }
              let createData = await client.handle('createMenu', menu)
              console.log(createData)
              reply='创建菜单成功'
        }else if(content==='46'){
            let createData = await client.handle('deleteMenu')
            console.log(createData)
            reply='删除菜单成功'
        }else if(content==='47'){
            let createData = await client.handle('fetchMenu')
            console.log(createData)
            reply='获取菜单成功'
        }else if(content==='48'){
            let menu = {
                button: [
                  {
                    name: 'Scan_Photo',
                    sub_button: [
                      {
                        name:'系统拍照',
                        type:'pic_sysphoto',
                        key: 'no_1'
                      }, {
                        name: '拍照或者发图',
                        type: 'pic_photo_or_album',
                        key: 'no_2'
                      }, {
                        name: '微信相册发布',
                        type: 'pic_weixin',
                        key: 'no_3'
                      }, {
                        name: '扫码',
                        type: 'scancode_push',
                        key: 'no_4'
                      }, {
                        name: '等待中扫码',
                        type: 'scancode_waitmsg',
                        key: 'no_5'
                      }
                    ]
                  },
                  {
                    name: '跳新链接',
                    type: 'view',
                    url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7dd2c89ce9f68a95&redirect_uri=http%3A%2F%2Fwechat10day.vipgz1.idcfengye.com%2Fuser&response_type=code&scope=snsapi_base&state=a#wechat_redirect'
                  },
                  {
                    name: '其他',
                    sub_button: [
                      {
                        name: '点击',
                        type: 'click',
                        key: 'no_11'
                      }, {
                        name: '地理位置',
                        type: 'location_select',
                        key: 'no_12'
                      }
                    ]
                  }
                ]
              }
              let rules = {
                // "tag_id": "2",
                // "sex": "1",
                // "country": "中国",
                // "province": "广东",
                // "city": "广州",
                // "client_platform_type": "2",
                language: 'en'
              }
              let createData = await client.handle('createMenu', menu)
              let menus = await client.handle('fetchMenu')
              console.log(menus)
              reply="自定义菜单成功"
        }else if(content=='49'){
            const WechatOAuth=require('../wechat-lib/autho')
            const oauth=new WechatOAuth(conf.wechat)
            let url1='http://wechat10day.vipgz1.idcfengye.com/li'
            const url=oauth.getAuthorizeURL('snsapi_base',url1,'a')
            console.log(url)
           reply=url
        }else if(content==='112'){
            let newsarticle=[
                {
                    title:"图文测试1",
                    description:"图文描述",
                    picUrl:'http://img.duoziwang.com/2018/04/2411130526581.jpg',
                    url:"https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738729"
                },
                {
                    title:"图文测试1",
                    description:"图文描述",
                    picUrl:'http://img.duoziwang.com/2018/04/2411130526581.jpg',
                    url:"https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738729"
                }
            ]
            reply=newsarticle
        }

        ctx.body=reply
    }
    await next()
}