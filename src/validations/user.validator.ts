import { body , check} from "express-validator";

export const UserValidator = [
    body('firstName').notEmpty().withMessage('First name is required').isString().withMessage('First name must be a string'),
    body('lastName').notEmpty().withMessage('Last name is required').isString().withMessage('Last name must be a string'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('mobileNumber').notEmpty().withMessage('Mobile number is required').isMobilePhone('any').withMessage('Invalid mobile number'),
];