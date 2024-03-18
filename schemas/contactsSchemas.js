import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required().trim(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().trim().required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().trim(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().trim(),
})
  .min(1)
  .messages({
    "object.min": "Body must have at least one field",
  });
