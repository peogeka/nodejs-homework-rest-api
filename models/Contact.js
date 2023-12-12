import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, preUpdate } from "./hooks.js";

const contactSchema = new Schema({
   name: {
     type: String,
     required: [true, 'Set name for contact'],
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
   }
 }, {versionKey: false, timestamps: true});

 contactSchema.post("save", handleSaveError);

 contactSchema.pre("findOneAndUpdate", preUpdate);
 
 contactSchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactSchema);

export const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
      "any.required": `missing required "name" field`,
      "string.base": `"name" must be text`,
  }),
  email: Joi.string().required().messages({
     "any.required": `missing required "email" field`,
     "string.base": `"email" must be text`,
 }),
  phone: Joi.string().required().messages({
     "any.required": `missing required "phone" field`,
     "string.base": `"phone" must be text`,
 }),
 favorite: Joi.boolean(),
})

export const contactsUpdateSchema = Joi.object({
  name: Joi.string().messages({
     "string.base": `"name" must be text`,
 }),
  email: Joi.string().messages({
     "string.base": `"email" must be text`,
 }),
  phone: Joi.string().messages({
     "string.base": `"phone" must be text`,
 }),
 favorite: Joi.boolean(),
})

export const contactFavoriteSchema = Joi.object({
 favorite: Joi.boolean().messages({
  "any.required": `missing required "favorite" field`,
  "string.base": `"favorite" must be boolean`,
}),
})

export default Contact;