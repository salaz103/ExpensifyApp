///
//////////////////////////////////////////OBJECT DESTRUCTURING///////////////////////////////////////
////
/*const person={
    name: 'Luis',
    age:26,
    location:{
        city:'Guatemala',
        temp: 92
    }
};*/

// const name= person.name;
// const age= person.age;


///name se renombro a firstName y se le puso un valor por defecto, en este caso "Anonymous"
/*const {name:firstName='Anonymous',age}= person;

console.log(firstName +' is '+age);

const {city,temp:temperature}= person.location;

if(city && temperature){
    console.log("It's "+temperature+" in "+ city);
}

const book={
    title:'Ego is the enemy',
    author:'Ryan Holiday',
    publisher:{
        name:'Penguin'
    }
};

const{name:publisherName='Self-Published'}= book.publisher;
console.log(publisherName);*/

///
//////////////////////////////////////////ARRAY DESTRUCTURING///////////////////////////////////////
////


const address= ['1299 S Street','Guatemala','GT','0001'];

const [ ,city,state='New York']=address;

console.log("You are in "+city+" "+state);

const item=['coffee (hot)','$2.00','$2.50','$2.75'];

const [itemName,,mediumPrice,]=item;

console.log("A medium "+itemName+" costs "+mediumPrice);