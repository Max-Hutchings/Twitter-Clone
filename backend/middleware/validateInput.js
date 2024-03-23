
import { validationResult } from 'express-validator';

export default function validateInput(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new Error('Invalid user details'));
    }
    next();
}