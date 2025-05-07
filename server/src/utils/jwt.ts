const jwt  = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
console.log(ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET);

export function generateAccessToken(userId: string){
    return jwt.sign({userId},"accessSecret",{expiresIn:'15m'})
}

export function generateRefreshToken(userId: string){
    return jwt.sign({userId},"refreshSecret",{expiresIn:'7d'})
}

export function verifyAccessToken(token:string){
    return jwt.verify(token,"accessSecret");
}

export function verifyRefreshToken(token:string){
    return jwt.verify(token,"refreshSecret");
}