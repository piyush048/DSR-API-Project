import { Request, Response } from 'express';
import * as dsrService from '../services/dsr.service';
import User from '../models/user.model';
import logger from '../utils/logger';

export const createDsr = async (req: Request & { user?: User }, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'User not found' });
      logger.error('User not found in createDsr');
      return;
    }
    const userId = req.user.id;
    const { content, hours, date } = req.body;
    const dsr = await dsrService.addDsr({ userId, content, date, hours, project: 'DSR System' });
    res.status(201).json({ message: 'DSR created', dsr });
  } catch (error: any) {
    logger.error('Error creating DSR:', error);
    res.status(400).json({ message: error.message });
  }
};

export const updateDsr = async (req: Request & { user?: User }, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'User not found' });
    logger.error('User not found in updateDsr');
    return;
  }
  const userId = req.user.id;
  const {id, content, hours } = req.body;

  try {
    const updated = await dsrService.updateDsr(id, userId, { content, hours });
    if (!updated) {
      res.status(404).json({ message: 'DSR not found' });
      logger.error('DSR not found in updateDsr');
      return;
    }

    res.status(200).json({ message: 'DSR updated', dsr: updated });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    logger.error('Error updating DSR:', error);
    return;
  }
};

export const getDsrs = async (req: Request & { user?: User }, res: Response) => {
  if (!req.user) {
    res.status(401).json({ message: 'User not found' });
    logger.error('User not found in getDsrs');
    return;
  }

  try {
    const userId = req.user.id;
    const { startDate, endDate, page = 1, limit = 10 } = req.query as any;

    const { dsrs, total } = await dsrService.getDsrs(userId, startDate, endDate, +page, +limit);
    res.status(200).json({ dsrs, total });
  } catch (error: any) {
    logger.error('Error fetching DSrs:', error);
    res.status(400).json({ message: error.message });
  }
};

export const getDsrById = async (req: Request & { user?: User }, res: Response) => {
  if (!req.user) {
    res.status(401).json({ message: 'User not found' });
    logger.error('User not found in getDsrById');
    return;
  }
  try {
    const userId = req.user.id;
    const dsrId = Number(req.params.dsrId);
    const dsr = await dsrService.getDsrById(dsrId, userId);
    if (!dsr) {
      res.status(404).json({ message: 'DSR not found' });
      logger.error('DSR not found for id:', dsrId);
      return;
    }

    res.status(200).json({ dsr });
  } catch (error: any) {
    logger.error('Error fetching DSR by id:', error);
    res.status(400).json({ message: error.message });
  }
};
