import { ValidateSignature } from "../utils/index.js"

export const authMiddleware = (req, res, next) => {
    const signature = ValidateSignature(req);

    try {
        if(signature) {
            return next(); 
        } else {
            throw new Error("Token Invalido", { cause: 'INVALID_CREDENTIALS'});
        };
    } catch (error) {
        next(error);
    };

};