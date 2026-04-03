const cluster = require('cluster');
const os = require('os');

const  numCPUs = os.cpus().length;
const isVercel = process.env.VERCEL ==='1';

if(!isVercel && cluster.isPrimary){
    console.log(`Primary process PID: ${process.pid}`)
console.log(`Creating ${numCPUs} workers...`);

for(let i=0;i<numCPUs; i++){
    cluster.fork();
}

cluster.on('exit',(worker,code,signal)=>{
    console.log(`worker ${worker.process.pid} died. restarting...`);
    cluster.fork();
})
}else{
    require('./index.js');
    console.log(`Worker process PID: ${process.pid}`)
}