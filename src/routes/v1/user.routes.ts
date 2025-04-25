import express from 'express';
import { signup, login, getProfile, updateProfile, forgetPassword, sendOtp, verifyOtp } from '../../controllers/user.controller';
import { protect } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { signupSchema, loginSchema, updateProfileSchema, emailSchema, otpSchema } from '../../validations/user.validation';

const router = express.Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);
router.get('/profile', protect, getProfile);
router.patch('/profile', protect, validate(updateProfileSchema), updateProfile);
router.post('/forget-password', validate(emailSchema), forgetPassword);
router.post('/send-otp', validate(emailSchema), sendOtp);
router.post('/verify-otp', validate(otpSchema), verifyOtp);

export default router;
