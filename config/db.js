require('dotenv').config();

const mongoose = require('mongoose');

// module.exports = async() => {
//     try{
//         const conn = await 
//         mongoose.connect(process.env.MONGO_CONNECTION_URL, {
//             useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify: true
//         });
//         console.log(`connected to database: ${conn.connection.host}`);
//     }catch(error){
//         console.log(error);
//         process.exit(1);
//     }
// }

// function connectDB() {
//     //DB CONNECTION
//     mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify: true});

//     const connection = mongoose.connection;

//     connection.once('open', (err) => {
//         console.log('Database Connected');
//     }).on('error', function(err) {
//         console.log('Connection Failed.' + err );
    
//     })
// }



// //bhgbti bhai
// async function connectDB() {
//     try {
//       //DB CONNECTION
//       await mongoose.connect(process.env.MONGO_CONNECTION_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });
  
//       const connection = mongoose.connection;

//       connection.on("error", console.error.bind(console, "connection error:"));
//       connection.once("open", () => {
//         console.log("Database Connected");
//       });
//     } catch (e) {
//       console.log(e);
//       process.exit(1);
//     }
//   }


//bhgbti bhai 2

async function connectDB() {
    try {
      //DB CONNECTION
      const conn = await mongoose.connect(process.env.MONGO_CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`Connected To The Database ${conn.connection.host}!`);
  
      const db = mongoose.connection;
      db.on("error", console.error.bind(console, "connection error:"));
      db.once("open", function (err, resp) {
        console.log(resp);
      });
    } catch (e) {
      console.log(e);
      process.exit(1);
    }
  }
  

module.exports = connectDB;