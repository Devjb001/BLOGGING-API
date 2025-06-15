// const request = require ('supertest')
// const mongoose = require ('mongoose')
// const {app} = require ('../server')
// const { mongoConnection } = require('../config/db-connection')
// const userModel = require('../models/user')


// describe('User API' , () =>{

//     // beforeAll(async () => {
//     //     await mongoConnection();
//     // })

//     beforeEach(async () => {
//         await userModel.deleteMany({});
//     })

//     // afterAll(async () => {
//     //      await mongoose.connection.dropDatabase();
//     //     await mongoose.connection.close()
//     })


//     describe('POST / signup' , ()=> {
        
//         it ('Shoule Create a new user' , async () => {
            
//             await userModel.create([
//                 {
//                 "first_name" : "samuel",
//                 "last_name" : "sule",
//                 "email" : "samuel@gmail.com",
//                 "password" : "samuel12345"}
//             ]);

//             const response = await request(app).post('/signup')
//             expect(response.status).toBe(200);
//             expect(response.body).toHaveLength(1);
//         })
//     })
// })