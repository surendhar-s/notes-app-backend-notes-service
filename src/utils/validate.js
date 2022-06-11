import Joi from 'joi';

function validate(data, schema) {
  return Joi.validate(data, schema, { abortEarly: false }, err => {
    if (err) {
      return Promise.reject(err);
    }
    return Promise.resolve(null);
  });
}

export default validate;
