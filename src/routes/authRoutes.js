import { Router } from 'express';
import { celebrate } from 'celebrate';
import { 
  registerUser, 
  loginUser, 
  refreshUserSession, 
  logoutUser 
} from '../controllers/authController.js';
import { 
  registerUserSchema, 
  loginUserSchema 
} from '../validations/authValidation.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

// Реєстрація
router.post(
  '/register',
  celebrate(registerUserSchema),
  ctrlWrapper(registerUser)
);

// Логін
router.post(
  '/login',
  celebrate(loginUserSchema),
  ctrlWrapper(loginUser)
);

// Оновлення сесії
router.post(
  '/refresh',
  ctrlWrapper(refreshUserSession)
);

// Логаут
router.post(
  '/logout',
  ctrlWrapper(logoutUser)
);

export default router;