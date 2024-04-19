const Joi = require("@hapi/joi");

const schoolRegisterValidator = (formData) => {
  const schema = Joi.object({
    school_email: Joi.string().email().required(),
    school_password: Joi.string().min(6).max(20).required(),
    school_name: Joi.string().required(),
    school_package: Joi.string().required(),
    account_status: Joi.string().required(),
    school_package_renewal_date: Joi.string().required(),
    school_phone: Joi.string().required(),
    school_motto: Joi.string().required(),
    school_location: Joi.string().required(),
    school_type: Joi.string().required(),
    principal_name: Joi.string().required(),
    contact_email: Joi.string().email().required(),
    contact_phone: Joi.string().required(),
    website: Joi.string(),
    // image property not here optional
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postal_code: Joi.string().required(),
  });

  return schema.validateAsync(formData);
};

const schoolLoginValidator = (formData) => {
  const schema = Joi.object({
    school_email: Joi.string().email().required(),
    school_password: Joi.string().min(6).max(20).required(),
  });

  return schema.validateAsync(formData);
};

module.exports = { schoolRegisterValidator, schoolLoginValidator };
