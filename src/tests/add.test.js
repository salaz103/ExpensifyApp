const add =(a,b)=>a+b;

const generateGreeting=(name='Anonymous')=>"Hello "+name+"!";


test('Should add two numbers',()=>{
    const result = add (3,4);

    // if(result!==7){
    //     throw new Error("You added 4 and 3, the result was:"+ result+" .Expected: 7" ); 
    // }

    expect(result).toBe(7)
});


test('Should return greeting with name',()=>{
    const greeting= generateGreeting("Luis");

    expect(greeting).toBe("Hello Luis!");
});


test('Should generate greeting for no name',()=>{
    const result= generateGreeting();
    expect(result).toBe("Hello Anonymous!");
})