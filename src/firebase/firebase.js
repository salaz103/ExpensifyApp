import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export { firebase, database as default };

  //child_remove
  // database.ref('expenses').on('child_removed',(snapshot)=>{
  //   console.log(snapshot.key,snapshot.val());
  // });

  //child_change
  // database.ref('expenses').on('child_changed',(snapshot)=>{
  //   console.log(snapshot.key,snapshot.val());
  // });

  //child_added
  // database.ref('expenses').on('child_added',(snapshot)=>{
  //   console.log(snapshot.key,snapshot.val());
  // });

  //THIS IS HOW WE CAN FETCH DATA AND SAVE IT INTO AN ARRAY 
  // database.ref('expenses').on('value',(snapshot)=>{
  //   const expenses= [];
  //   snapshot.forEach((childSnapshot)=>{
  //     expenses.push({
  //       id:childSnapshot.key,
  //       ...childSnapshot.val()
  //     })
  //   });
  //   console.log(expenses);
  // },(e)=>{
  //   console.log('Error fetching expenses',e)
  // });

  //THIS IS HOW WE CAN SAVE DATA INTO FIREBASE
  // const expenses= [{
  //   description: 'First expense',
  //   note: 'My sueldo1',
  //   amount: 1200,
  //   createdAt: 120
  // },{
  //   description: 'Second expense',
  //   note: 'My sueldo2',
  //   amount: 20000,
  //   createdAt: 100
  // },{
  //   description: 'Third expense',
  //   note: 'Money Money',
  //   amount: 1500,
  //   createdAt: 12000
  // }];

  // expenses.forEach(expense => {
  //   database.ref('expenses').push(expense);
  // });


  //database.ref('notes/-MScrrnFzZmLpf0l72ZQ').remove();

  // database.ref('notes').push({
  //   title: 'Course Topics',
  //   body: 'React native, Angular, Python'
  // });



  // database.ref().on('value',(snapshot)=>{
  //   const val= snapshot.val();
  //   console.log(val.name+' is a '+ val.job.title+ ' at '+ val.job.company);
  // },(e)=>{
  //   console.log('Error fetching data',e);
  // });

  //USING ONCE WE GET THE DATA A SINGLE TIME, OUR FUNCTIONS NEVER RE-RUN
  // database.ref('location/city')
  // .once('value')
  // .then((snapshot)=>{
  //   const val =snapshot.val();
  //   console.log(val);
  // })
  // .catch((e)=>{
  //   console.log('Error fetching data ', e);
  // });

  // database.ref().set(
  //     {
  //       name:'Luis Salazar',
  //       age: 27,
  //       stressLevel: 6,
  //       job: {
  //         title:'Software developer',
  //         company: 'Google'
  //       },
  //       location: {
  //         city: 'Guatemala',
  //         country: 'Guatemala'
  //       }
  //     }
  // ).then(()=>{
  //   console.log('Data is saved!');
  // }).catch((e)=>{
  //   console.log('This failed.',e);
  // });

  // database.ref('isSingle').remove().then(()=>{
  //   console.log('Specific data removed');
  // }).catch((e)=>{
  //   console.log('Error deleting specific data. ',e);
  // });

  // //SETEAR NULL ES SIMILAR A REMOVE
  // //database.ref('isSingle').set(null);

  // database.ref().update({
  //   stressLevel: 9,
  //   'job/company': 'Amazon',
  //   'location/city': 'Seattle'
  // });

