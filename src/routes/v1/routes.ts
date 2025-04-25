import dsrRouter from './dsr.routes'
import userRouter from './user.routes'

import { Router } from 'express';

const v1router = Router();
v1router.use('/', userRouter);
v1router.use('/dsr', dsrRouter);

export default v1router;