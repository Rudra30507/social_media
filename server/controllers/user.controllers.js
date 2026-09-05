import bcrypt from "bcrypt" // to secure out password through hashing
// register controllers 
import User from "../models/user.model.js";

export const registerUser = async(req , res)=>{
    try{
    const{name , username , email , password} = req.body;
      
    if(!name || !username || !email || !password){
        return res.status(400).json({message:"All fields are required"})
    }
    if(password.length <= 6){
        return res.status(400).json({message:"Password should be grater than 6 character"})
    } 

    const userExists = await User.findOne({username})
    const emailExists = await User.findOne({email})

    if(userExists){
        return res.status(409).json({message:"User already exists"})
    }  
    if(emailExists){
        return res.status(409).json({message:"Email already exists"})
    }
    //salt is a random string that is added to the password before hashing
    const salt = await bcrypt.genSalt(10)
    
    console.log(salt)

    //hashing
    const hashedPassword = await bcrypt.hash(password , salt)

    console.log(hashedPassword)
    const newUser = await User.create({
        name,
        username,
        email,
        password : hashedPassword
    })

    return res.status(201).json({message: "User registered successfully" , user:newUser})
    
    }
    catch(err){
        res.status(500).json({message : 'server crashed' , error:err.message})
    }
}

//login user 

export const loginUser = async(req , res)=>{
    try{
        const {email , password} = req.body;

        if(!email || !password){
            return res.status(400).json({ message : "all feilds are required"})
        }

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        const PasswordValid = await bcrypt.compare(password , user.password)
        
        if(!PasswordValid){
            return res.status(401).json({message:"Invalid password"})
        }

       res.status(200).json({message : "Login successful"})

      
       
    }

    catch(err){
        res.status(500).json({message : 'server crashed' , error:err.message})
    }
}