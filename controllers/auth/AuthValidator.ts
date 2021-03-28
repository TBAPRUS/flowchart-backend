import { AuthValidatorInterface } from './AuthInterface';
import { Schema } from "express-validator";

class AuthValidator implements AuthValidatorInterface {
    public register: Schema = {
        password: {
            isLength: {
                errorMessage: 'Password should be at least 7 and max 24 chars long',
                options: { min: 7, max: 24 },
            },
            isString: true,
        },
        username: {
            ltrim: true,
        },
        email: {
            isEmail: {
                bail: true,
            },
            normalizeEmail: true,
        },
    }

    public login: Schema = {
        password: {
            isString: true
        },
        email: {
            normalizeEmail: true,
        },
    }
}

export default new AuthValidator();