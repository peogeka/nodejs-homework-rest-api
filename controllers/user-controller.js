import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Jimp from "jimp";
import gravatar from "gravatar.js";
import { controlWrapper } from "../decorators/index.js";
import User from "../models/User.js";
import { HttpError } from "../helpers/HttpError.js";
import path from "path";
import fs from "fs/promises";
import {avatarRenamer} from "../helpers/index.js";

const {JWT_SECRET} = process.env;
const avatarPath = path.resolve("public", "avatars");

const register = async (req, res, next)=>{
   const {email, password}=req.body;
   const user = await User.findOne({email});
   if (user){
      return next(new HttpError(409, 'Such e-mail already exist'))
   }
   const avatar = gravatar.url(email, { defaultIcon: 'retro', size: 200, rating: 'x' });
   const hashPasswd = await bcrypt.hash(password, 10);
   const newUser = await User.create({...req.body, password: hashPasswd, avatarURL: avatar});
   res.status(201).json({username: newUser.username, email: newUser.email, subscription: newUser.subscription});
};

const login = async (req, res, next)=>{
   const {email, password}=req.body;
   const user=await User.findOne({email});
   if (!user){
      return next(new HttpError(401, 'E-mail or password invalid'))
   }
   const isPasswdOK = await bcrypt.compare(password, user.password);
   if (!isPasswdOK){
      return next(new HttpError(401, 'E-mail or password invalid'))
   }
   const payload = {id: user.id};
   const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "72h"});
   await User.findByIdAndUpdate(user._id, {token});
   res.json({token, user: {email: user.email, subscription: user.subscription}});
}

const logout = async (req, res, next)=>{
   await User.findByIdAndUpdate(req.user._id, {token: ""});
   res.json('Signout successful');
}

const current = async (req, res, next)=>{
   const {username, email, subscription} = req.user;
   res.json({username, email, subscription});
}

const subscriptionUpdate = async (req, res, next)=>{
   const result = await User.findByIdAndUpdate(req.user._id, req.body, {projection: "username email subscription"});
   res.json(result)
}

const uploadAvatar = async (req, res, next)=>{
   const {path: tmpPath, filename} = req.file;
   const {_id, username} = req.user;
   const newfilename = avatarRenamer(filename, username);
   const newPath = path.join(avatarPath, newfilename);
   try {
      (await Jimp.read(tmpPath)).resize(250, 250).quality(75).write(newPath);
      await fs.unlink(tmpPath);
   } catch (error) {
      error.message = "File operation error. Please try again later"
      return next(error)
   }
   const avatar = path.join('avatars', newfilename);
   const result = await User.findByIdAndUpdate(_id, {avatarURL: avatar}, {projection: "avatarURL"});
   res.json(result)
}

export default{
   register: controlWrapper(register),
   login: controlWrapper(login),
   logout: controlWrapper(logout),
   current: controlWrapper(current),
   subscriptionUpdate: controlWrapper(subscriptionUpdate),
   uploadAvatar: controlWrapper(uploadAvatar),
}