import express from 'express';
import { protect } from '../../middlewares/auth.middleware';
import {
  createDsr,
  updateDsr,
  getDsrs,
  getDsrById,
} from '../../controllers/dsr.controller';
import { validate } from '../../middlewares/validate.middleware';
import { createDsrSchema, updateDsrSchema } from '../../validations/dsr.validation';

const router = express.Router();

router.post('/', protect, validate(createDsrSchema), createDsr);
router.patch('', protect, validate(updateDsrSchema), updateDsr);
router.get('', protect, getDsrs);
router.get('/:dsrId', protect, getDsrById);

export default router;
