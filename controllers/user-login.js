const userModel = require("../models/user")
const jwt = require("jsonwebtoken")

async function userLogin(req , res , next) {

    console.log("login route")
    const { email , password} = req.body

    try {
        const userFound = await userModel.findOne({email});

        if(!userFound){
            res.status(400).json({
                message : "User not found, pls create an account"
            })
            console.log("User not found, pls create an account")
            return;
        }

        const passwordIsMatch = await userFound.comparePassword(password);
        if (!passwordIsMatch){
            res.status(400).send({
            message : "password is not correct"
        })
        console.log("Your password is not correct" )
        } 

        const token = jwt.sign({ userId: userFound._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
        message: `Hy ${userFound.first_name} ${userFound.last_name}! , Welcome back to loging route, you are logged in`,
        token,
        user: {
        first_name: userFound.first_name,
        last_name: userFound.last_name,
        email: userFound.email
      }
    });
    console.log("log in route is working")
    } catch (err) {
        res.status(500).json({ message: 'There is a server error trying to login' });
        next(err);
    }
}

module.exports = {
    userLogin
}