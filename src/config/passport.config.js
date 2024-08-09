import passport from "passport";
import jwt from "passport-jwt";
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;
import { UserModel } from "../daos/mongodb/models/user.model.js";


export const initializePassport = () => {
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "coderhouse"
    }, async (jwt_payload, done) => {
        try {
            const user = await UserModel.findById(jwt_payload.user._id);
            if (!user) {
                return done(null, false);
            }
            return done(null, user); 
        } catch (error) {
            return done(error);
        }
    }));
}
    
const cookieExtractor = (req) => {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies["coderCookieToken"]
    }
    return token;
}
