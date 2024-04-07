import Joi from "joi";
import mongoose from "mongoose";

const { Schema, model } = mongoose;

export const createContactSchema = Joi.object({
  name: Joi.string().required().trim(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().trim().required(),
  favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().trim(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().trim(),
  favorite: Joi.boolean(),
})
  .min(1)
  .messages({
    "object.min": "Body must have at least one field",
  });

export const updateStatusSchema = Joi.object({
  name: Joi.string().trim(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().trim(),
  favorite: Joi.boolean().required(),
})
  .min(1)
  .messages({
    "object.min": "Body must have at least one field",
  });

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

export const Contact = model("contact", contactSchema);
