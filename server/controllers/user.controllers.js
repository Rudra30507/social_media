// register controllers 

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

    const newUser = User.create({
        name,
        username,
        email,
        password
    })

    return res.status(201).json({message: "User registered successfully" , user:newUser})
    




    }
    catch(err){
        res.status(500).json({message : 'server crashed' , error:err.message})
    }
}