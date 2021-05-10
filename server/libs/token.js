const secretKey = process.env.JWT_SECRET || 'ccc';
import jwt from 'jsonwebtoken';

function generateToken(payload) {
    return new Promise(
        (resolve, reject) => {
            jwt.sign(
                payload,
                secretKey,
                {
                    expiresIn: '10d',
                    subject:'userinfo'
                }, (error, token) => {
                    if(error) reject(error);
                    resolve(token);
                }
            );
        }
    );
}

function checkToken(token, secret) {
    return new Promise((resolve, reject)=>{
        jwt.verify(token, secret, (err, decoded)=> {
            if(err) {
                reject(err);
            }
            resolve(decoded)
        })
    });
}
export  {
    generateToken,
    checkToken
}