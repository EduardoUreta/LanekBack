import jwt from "jsonwebtoken";
import envConfig from "../config/config.cjs";

export const CreateSignature = (payload) => {
    return jwt.sign(payload, envConfig.JWT_SECRET , {expiresIn: "1h"});
};

export const ValidateSignature = (req) => {
    const signature = req.cookies;

    if (signature.Bearer) {
        try {
            const payload = jwt.verify(signature.Bearer, envConfig.JWT_SECRET);
            req.user = payload;
            return true;
        } catch (error) {
            return false;            
        };
    };
};