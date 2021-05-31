const fetch=require('node-fetch')
const {Worker,isMainThread,parentPort,workerData}=require('worker_threads')

const getUserExternal=async ()=>{
    let res=await fetch(`${workerData.external_url===""?process.env.EXTERNAL_URL:workerData.external_url}/${workerData.id}`)
    if(res.status>=500){
        return "Server offline"
    }else if(res.status>=400){
        return null
    }else{
        return res.json()
    }
}

if(isMainThread){
    module.exports=async (id,external_url="")=>{
        return new Promise((resolve,reject)=>{
            const worker=new Worker(__filename,{
                workerData:{id,external_url}
            })
            worker.on('message',resolve)
        })
    }
}else{
    getUserExternal().then(body=>{
       parentPort.postMessage(body) 
    })
}


