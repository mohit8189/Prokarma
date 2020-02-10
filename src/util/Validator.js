var passwordValidator = require('password-validator');
export var emailValidator = require("email-validator");
 

export var schema = new passwordValidator();
 
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits().has().symbols()                 // Must have digits and special char
.has().not().spaces()   