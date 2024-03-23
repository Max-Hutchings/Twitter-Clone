function passwordValidator(password){
    // Has a minimum of 8 characters.
    // Contains at least one uppercase letter.
    // Contains at least one lowercase letter.
    // Contains at least one number.
    // Contains at least one special character (@$!%*?&#).

     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

}

export default passwordValidator;