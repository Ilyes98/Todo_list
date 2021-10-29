const Joi = require('joi');
const pattern = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/";

const registerValidation = data =>{
    const schema = Joi.object({
        first_name: Joi.string()
            .min(3)
            .max(30)
            .required(),

        last_name: Joi.string()
            .min(3)
            .max(30)
            .required(),
    
    
        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .required(),


        phone_number: Joi.number()
            .min(10)
            .max(10)
            .required(),
    
        
        password: Joi.string()
            .min(3)
            .regex(RegExp(pattern))
            .max(15)
            .required()
            .messages({"string.pattern.base": `Veuillez entrer un mot de passe correcte contenant plus de 7 caractères dont au moins un caractère spécial (@, ^, > ,...) et une lettree majuscule`})
            .label('Password'),
        password_confirmation: Joi.any().equal(Joi.ref('password'))
            .required()
            .label('Confirm password')
            .messages({ 'any.only': '{{#label}} does not match' })
    
        
    });

    return schema.validate(data);
}
const loginValidation = data =>{
    const schema = Joi.object({
    
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
    
        
        password: Joi.string()
            .min(4)
            .required()
    
        
    });

    return schema.validate(data);
}
const PostValidation = data =>{
    const schema = Joi.object({
        
        title: Joi.string()
            .min(4)
            .required(),

        description: Joi.string()
            .min(4)
            .required(),

        companyName: Joi.string()
            .min(4)
            .required(),

        //image: Joi.string()
           //.min(4)
            //.required(),

        qualifications: Joi.string()
            .min(4)
            .required(),

        responsibilities: Joi.string()
            .min(4)
            .required(),


        position: Joi.string()
            .min(4)
            .required(),

        location: Joi.string()
            .min(4)
            .required(),


        imgUrl: Joi.string()
            .min(4)
            .required(),
    
        
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.PostValidation = PostValidation;