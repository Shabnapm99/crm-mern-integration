import express from 'express'
import dotenv from 'dotenv';
import authRoute from './routes/authRoutes.js'
import cors from 'cors';
import { dbConnect } from './config/db.js';
import customerRoute from './routes/customerRoutes.js'
import {validateToken} from './middlewares/authMiddleware.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT||5000;
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.json({msg:"Home page crms"});
})

app.use('/api',authRoute);
app.use('/api/customers',validateToken,customerRoute);//only logged in user can accescc this url

dbConnect();

app.listen(PORT,()=>console.log("Server is running on port : ",PORT));



// import express from "express";

// const app = express();
// const PORT = 4000; // you can change if 4000 is acting weird

// // simple test route
// app.get("/", (req, res) => {
//   res.send("✅ Backend is alive");
// });

// // JSON test route
// app.post("/test-json", (req, res) => {
//   res.json({ message: "POST works" });
// });

// // start server
// app.listen(PORT, () => {
//   console.log(`Server running at port: ${PORT}`);
// });
