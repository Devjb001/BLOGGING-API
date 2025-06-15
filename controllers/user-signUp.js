const userModel = require("../models/user")


async function userSingUp(req , res , next) {

    const {first_name , last_name , email , password} = req.body

    try {
        const userAlreadyExist = await userModel.findOne({$or : [{first_name} , {last_name} , {email}]});

        if(userAlreadyExist){
            res.status(400).send("User alread exist")
            console.log("You cannot register twice, try to login")
        }

        const newUser = new userModel({
            first_name ,
            last_name ,
            email ,
            password
        });
        await newUser.save()
        res.status(201).send({
            message : "You have successfully created your account, pls login!",
            data : newUser
        })
        console.log(`You have successfully created your account, pls login! , ${newUser}` )
    } catch (err) {
        next(err)
        console.log(err)
    }
}

module.exports = {
    userSingUp
}