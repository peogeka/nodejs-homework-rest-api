import express from 'express';
import userController from '../../controllers/user-controller.js'
import { authentication, isEmptyBody, uploader } from '../../middlewares/index.js';
import bodyValidator from '../../decorators/bodyValidator.js';
import {  SignInSchema, SignUpSchema, SubscriptionSchema } from '../../models/User.js';

const router = express.Router();

router.post('/register', isEmptyBody, bodyValidator(SignUpSchema), userController.register);
router.post('/login', isEmptyBody, bodyValidator(SignInSchema), userController.login);
router.post('/logout', authentication, userController.logout);
router.get('/current', authentication, userController.current);
router.patch('/', authentication, isEmptyBody, bodyValidator(SubscriptionSchema), userController.subscriptionUpdate);
router.patch('/avatars', uploader.single('avatar'), authentication, userController.uploadAvatar);

export default router;