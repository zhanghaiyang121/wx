const sha1=require('sha1');
const getRawBody=require('raw-body')
const util=require('./util')
const {reply}=require('../wechat/reply')
const WechatOAuth=require('./autho')
module.exports=(config)=>{
    return async (ctx,next)=>{
        console.log(1)
                const {
                    //signature签名用来验证消息来自微信
                    signature,  //微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
                    echostr,    //随机字符串
                    timestamp,  //时间戳
                    nonce       //随机数
                }=ctx.query
                // console.log(ctx.query)
                const token=config.token;
                
                //字典排序
                let str=[token,timestamp,nonce].sort().join('')
                //对排序后的字符串进行加密
                const sha=sha1(str)

                if(ctx.method==='GET'){
                    if(sha===signature){
                        ctx.body=echostr
                    }else{
                        ctx.body='Failde'
                    }
                }else if(ctx.method==='POST'){
                    if(sha!==signature){
                        return(ctx.body='Failed')
                    }
                    //获取并验证可读流的原始主体 从微信服务器获取的数据包data的数据格式为buffer
                    const data=await getRawBody(ctx.req,{
                        length:ctx.length,
                        limit:'1mb',
                        encoding:ctx.charset
                    })
                    //把xml包转换成json对象
                    const content=await util.parseXML(data)
                    console.log(content)
                    const message=util.formatMessage(content.xml)
                    //微信恢复策略
                    ctx.weixin=message
                    // console.log(message)

                    await reply.apply(ctx,[ctx,next])

                    //把json对象转换成xml格式
                    const xml=util.tpl(ctx.body,message)
                    ctx.status=200

                    ctx.type='application/xml'
                    ctx.body=xml
                    // let date=new Date().getTime()
                    // ctx.body=`
                    // <xml>
                    //     <ToUserName><![CDATA[toUser]]></ToUserName>
                    //     <FromUserName><![CDATA[fromUser]]></FromUserName>
                    //     <CreateTime>12345678</CreateTime>
                    //     <MsgType><![CDATA[news]]></MsgType>
                    //     <ArticleCount>1</ArticleCount>
                    //     <Articles>
                    //         <item>
                    //         <Title><![CDATA[title1]]></Title>
                    //         <Description><![CDATA[description1]]></Description>
                    //         <PicUrl><![CDATA[picurl]]></PicUrl>
                    //         <Url><![CDATA[url]]></Url>
                    //         </item>
                    //     </Articles>
                    //     </xml>
                    // `
                }
            }
}