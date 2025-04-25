import { Request, Response } from 'express';
import {
  signupService,
  loginService,
  getProfileService,
  updateProfileService,
  sendOtpToUser,
  verifyUserOtp
} from '../services/user.service';
import User from '../models/user.model';
import logger from '../utils/logger';

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await signupService(req.body);
    res.status(201).json({ message: 'User created successfully', user: data.user, token: data.token });
  } catch (err: any) {
    logger.error('Error during signup:', err);
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = await loginService(req.body);
    res.json(token);
  } catch (err: any) {
    logger.error('Error during login:', err);
    res.status(401).json({ message: err.message });
  }
};

export const getProfile = async (req: Request & { user?: User }, res: Response): Promise<void> => {
  if (!req.user){
    res.status(401).json({ message: 'User not found' });
    logger.error('Error fetching profile: User not found');
    return;
  }
  
  const profile = await getProfileService(req.user);
  res.json(profile);
};

export const updateProfile = async (req: Request & { user?: User }, res: Response ): Promise<void> => {
  if (!req.user){
    res.status(401).json({ message: 'User not found' });
    logger.error('Error updating profile: User not found');
    return;
  }
  const updated = await updateProfileService(req.user, req.body);
  res.json(updated);
};


export const forgetPassword = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  try {
    const otp = await sendOtpToUser(email);
    res.status(200).json({ message: 'OTP sent successfully', OTP : otp });
  } catch (err: any) {
    logger.error('Error sending OTP:', err);
    res.status(400).json({ message: err.message });
  }
};

// For resend OTP
export const sendOtp = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  try {
    const otp = await sendOtpToUser(email);
    res.status(200).json({ message: 'OTP resent successfully', OTP: otp });
  } catch (err: any) {
    logger.error('Error resending OTP:', err);
    res.status(400).json({ message: err.message });
  }
};

export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  const { email, otp, newPassword } = req.body;
  try {
    const isValid = await verifyUserOtp(email, otp, newPassword);
    if (!isValid) {
      logger.error('Invalid or expired OTP');
      res.status(400).json({ message: 'Invalid or expired OTP' });
      return;
    }
    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (err: any) {
    logger.error('Error verifying OTP:', err);
    res.status(400).json({ message: err.message });
  }
};