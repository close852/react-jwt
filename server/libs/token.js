const secretKey = process.env.JWT_SECRET || 'ccc';
import jwt from 'jsonwebtoken';

export default function generateToken(payload) {
    return new Promise(
        (resolve, reject) => {
            jwt.sign(
                payload,
                secretKey,
                {
                    expiresIn: '7d'
                }, (error, token) => {
                    if(error) reject(error);
                    resolve(token);
                }
            );
        }
    );
}
