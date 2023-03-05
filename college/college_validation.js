const joi = require('joi')
const { password }= require('./custom_valid')

const college_reg={ //creating validation for college registration
    
    body: joi.object().keys({
        regno:joi.string().required(),
        college_name:joi.string().required(),
        university_name:joi.string().required(),
        address:joi.string().required(),
        type:joi.string().required().min(1).max(2),
        college_email:joi.string().required(),
        admin_name:joi.string().required(),
        email:joi.string().required().email(),
        password:joi.string().required().custom(password),
    



    })
}

module.exports={
    college_reg
}