import DSR, { IDSRAttributes } from '../models/dsr.model';
import { Op } from 'sequelize';
import logger from '../utils/logger';

export const addDsr = async (dsrData: IDSRAttributes): Promise<DSR> => {
  const inputDate = new Date(dsrData.date);
  const dayStart = startOfDay(inputDate);
  const dayEnd = endOfDay(inputDate);

  const totalHoursOnDate = (await DSR.sum('hours', {
    where: {
      userId: dsrData.userId,
      date: {
        [Op.between]: [dayStart, dayEnd],
      },
    },
  })) || 0;

  const newTotal = totalHoursOnDate + dsrData.hours;

  if (newTotal > 8) {
    logger.error(`Total DSR hours exceed 8 hours for user ${dsrData.userId} on date ${dsrData.date}.`);
    throw new Error(`Total DSR hours exceed 8 hours for user ${dsrData.userId} on date ${dsrData.date}.`);
  }

  return DSR.create(dsrData);
};

export const updateDsr = async (dsrId: number, userId: number, data: Partial<IDSRAttributes>): Promise<DSR | null> => {
  const dsr = await DSR.findOne({ where: { id: dsrId, userId } });
  if (!dsr) return null;

  if (data.hours && data.hours > 8) {
    logger.error(`A single DSR cannot exceed 8 hours for user ${userId} on date ${dsr.date}.`);
    throw new Error('A single DSR cannot exceed 8 hours.');
  }

  return await dsr.update({
    content: data.content ?? dsr.content,
    hours: data.hours ?? dsr.hours,
  });
};

export const getDsrs = async (
  userId: number,
  startDate?: string,
  endDate?: string,
  page: number = 1,
  limit: number = 10
): Promise<{ dsrs: DSR[]; total: number }> => {
  const where: any = { userId };
  if (startDate && endDate) {
    where.date = {
      [Op.between]: [new Date(startDate), new Date(endDate)],
    };
  }

  const offset = (page - 1) * limit;
  const { rows: dsrs, count: total } = await DSR.findAndCountAll({
    where,
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  });

  return { dsrs, total };
};

export const getDsrById = async (dsrId: number, userId: number): Promise<DSR | null> => {
  return await DSR.findOne({ where: { id: dsrId, userId } });
};


export const startOfDay = (date: Date): Date => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0); 
  return start;
};
export const endOfDay = (date: Date): Date => {
  const end = new Date(date);
  end.setHours(23, 59, 59, 999); 
  return end;
};

