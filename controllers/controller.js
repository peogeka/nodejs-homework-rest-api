import { controlWrapper } from '../decorators/index.js';
import { HttpError } from '../helpers/index.js';
import Contact from '../models/Contact.js';

const getAll = async (req, res) => {
   const result = await Contact.find();
   res.json(result);
}

const getById = async (req, res, next) => {
   const result = await Contact.findById(req.params.id);
   if (!result){
      next(new HttpError(404, `Contact with id=${req.params.id} not found`));
   } else{
   res.json(result);
   }
}

const add = async (req, res, next)=>{
   const result = await Contact.create(req.body);
   res.status(201).json(result);
}

const updateById = async (req, res, next)=>{
   const result = await Contact.findByIdAndUpdate(req.params.id, req.body);
   if (!result){
      next(new HttpError(404, `Contacts with id=${req.params.id} not found`));
   } else{
   res.json(result);
   };
}

const deleteById = async (req, res, next)=>{
   const result = await Contact.findByIdAndDelete(req.params.id);
   if (!result){
      next(new HttpError(404, `Contacts with id=${req.params.id} not found`));
   } else{
   res.json(result);
   };
}

const updateFavoriteById = async (req, res, next)=>{
   const result = await Contact.findByIdAndUpdate(req.params.id, req.body);
   if (!result){
      next(new HttpError(404, `Contacts with id=${req.params.id} not found`));
   } else{
   res.json(result);
   };
}

export default {
   getAll: controlWrapper(getAll),
   getById: controlWrapper(getById),
   add: controlWrapper(add),
   updateById: controlWrapper(updateById),
   deleteById: controlWrapper(deleteById),
   updateFavoriteById: controlWrapper(updateFavoriteById),
}