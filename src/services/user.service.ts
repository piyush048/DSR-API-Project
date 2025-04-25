import bcrypt from 'bcrypt';
import User from '../models/user.model';
import { generateToken } from '../utils/generateToken';
import { redisClient } from '../config/redis';
import { generateOtp } from '../utils/otp';
import logger from '../utils/logger';
import { sendOtpEmail } from '../utils/mailer';

export interface SignupInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UpdateProfileInput {
  name?: string;
  profilePicture?: string;
}

export const signupService = async (data: SignupInput): Promise<{ token: string, user: User }> => {
  const { name, email, password } = data;
  
  const userExists = await User.findOne({ where: { email } });
  if (userExists){
    logger.error(`User with email ${email} already exists.`);
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  const token = generateToken(user.id);
  return { token, user };
};

export const loginService = async (data: LoginInput): Promise<{ token: string }> => {
  const { email, password } = data;

  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    logger.error(`Invalid credentials for email: ${email}`);
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user.id);
  return { token };
};

export const getProfileService = async (user: User): Promise<User> => {
  return user;
};

export const updateProfileService = async (user: User, data: UpdateProfileInput ): Promise<User> => {
  const { name, profilePicture } = data;

  if (name) user.name = name;
  if (profilePicture) user.profilePicture = profilePicture;

  await user.save();
  return user;
};


const OTP_EXPIRY = 60 * 5; // 5 minutes

export const sendOtpToUser = async (email: string): Promise<string> => {
  const user = await User.findOne({ where: { email } });
  if (!user){
    logger.error(`User with email ${email} not found.`);
    throw new Error('User not found');
  }
  const otp = generateOtp();
  await redisClient.set(`otp:${email}`, otp, { EX: OTP_EXPIRY });

  await sendOtpEmail(email, otp);

  console.log(`OTP for ${email}: ${otp}`);

  return otp;
};

export const verifyUserOtp = async (email: string, otp: string, newPassword: string): Promise<boolean> => {
  const storedOtp = await redisClient.get(`otp:${email}`);
  if(storedOtp !== otp){
    logger.error(`Invalid or expired OTP for email: ${email}`);
    throw new Error('Invalid or expired OTP');
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    logger.error(`User with email ${email} not found.`);
    throw new Error('User not found');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  await redisClient.del(`otp:${email}`);

  return true;
};
