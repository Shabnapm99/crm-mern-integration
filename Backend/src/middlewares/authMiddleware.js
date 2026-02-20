import jwt from 'jsonwebtoken'
import UserModel from '../models/UserModel.js'
import dotenv from 'dotenv';

dotenv.config();

export const validateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || authHeader.split(" ")[0] !== "Bearer") {
            res.status(401).json({ msg: "Invalid Token" });
            return
        };

        const token = authHeader.split(" ")[1];
        console.log(token);
        //to get the user associated with this token ie, which user is sending this reques
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);//if we pass the token and the secret code we passed while creating the token, verify method return the unique data we provided while creating the token
        const userId = decoded._id;

        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            res.status(401).json({ msg: "User not found" });
            return
        }
        req.user = user;//now user is available in req parameter as user key
        
        next();
    } catch (error) {
        return res.status(404).json({ message: "Page not found" });
    }
}//this function is to authenticate that the user is autherised to access the pages or not.before going to the route express will run the midllewares.
//eg:only logged in user can access a particular url