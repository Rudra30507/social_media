import jwt from "jsonwebtoken"
//to generate the tocken 

const genToken = (userId) =>{
    return jwt.sign({userId} , process.env.jwt_secret , {expiresIn : "15d"})
}

export default genToken

//when we  generate the tocken , this will crreate the id separately from mongodb