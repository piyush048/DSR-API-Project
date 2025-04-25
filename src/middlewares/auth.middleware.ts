import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user.model';
import logger from '../utils/logger';

interface AuthenticatedRequest extends Request {
  user?: User;
}

interface DecodedToken extends JwtPayload {
  id: number;
}

export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logger.error('Not authorized, no token provided');
    res.status(401).json({ message: 'Not authorized, no token provided' });
    return;
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    const user = await User.findByPk(decoded.id);
    if (!user) {
      logger.error('Not authorized, user not found');
      res.status(401).json({ message: 'Not authorized, user not found' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error('Not authorized, token failed', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
    return;
  }
};
