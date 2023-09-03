import jwt_decode from "jwt-decode";
import {ParsedToken} from "firebase/auth";


class Auth {
    /*
    * Check if the Google JWT token taken from `user.getIdToken()`
    * @param token - JWT token
    * @returns boolean - true if token is expired or invalid
    * */
    public static isTokenExpired = (token: string) => {
        try {
            const datamap = jwt_decode(token) as ParsedToken;
            const now = new Date();
            return +datamap.exp! * 1000 < now.getTime();
        }
        catch(err) {
            return true;
        }
    }
}

export default Auth;