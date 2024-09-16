import jwt from"jsonwebtoken"

export const generateTokenAndSetCookie =(res,userId)=>{
const token = jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn: '24h'
});

res.cookie("token",token,{
    httpOnly:true, // prevent xss attack
    secure:process.env.NODE_ENV === "production",
    sameSite:"strict", // prevent csrf attack
    maxAge: 7 * 24 * 60 * 60 * 1000
});
return token;
}