import UserModel from "../models/UserModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const login = async (req, res) => {

    let { email, password } = req.body;
    let user = await UserModel.findOne({ email: email }).select('-__v');

    //Check whether the user is resitered

    if (!user) {
        return res.status(400).json("Couldn't find a user with this email id. Please register before login")
    }


    let isMatch = await bcrypt.compare(password, user.password_hash)
    if (isMatch) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, { expiresIn: "1d" })//any unique data/property,a secret code and expire time. This will create a token when login and send as response
        res.status(200).json({
            message: "Logged in successfully",
            token,
            user
        })
    } else {
        return res.status(400).json({ msg: "The provided email or password is not matching" })
    }
}

export const register = async (req, res) => {
    try {
        const { name, email, password, username, role } = req.body;
        //to check whether the suer is alredy existing
        const isExisting = await UserModel.findOne({ email: email })
        if (isExisting) {
            return res.status(400).json({ message: "User already exist with this email" })
        }
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt)
        await UserModel.create(
            {
                name,
                email,
                role,
                username,
                password_hash: hashedPassword
            }
        )
        res.status(201).json({
            message: "User created successfully",
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Something went wrong while adding data",
            error: error.message
        })
    }

}

export const profile = async (req, res) => {
    res.status(200).json({ user: req.user })
}