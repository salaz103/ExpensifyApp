const promise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        //SOLO SE PUEDE RESOLVER UNA VEZ, EL SEGUNDO MENSAJE ES IGNORADO,
        //SI SE QUISIERA ENVIAR MÁS DATOS, SE PUEDE ENVIAR UN OBJETO
        //resolve({name:'Luis',age:27})
        //resolve('This is my resolved data');
        //resolve('This is my other resolved data')

        reject('Something went wrong')
    }, 5000);
});

console.log('BEFORE');

promise.then((data)=>{
    //ESTO ES CUANDO EL PROMISE FUE RESUELTO
    console.log('1',data);
}).catch((error)=>{
    //ESTO ES CUANDO EL PROMISE FUE RECHAZADO
    console.log('error: ',error);
});


console.log('AFTER');