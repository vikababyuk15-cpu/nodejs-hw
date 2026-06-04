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

const router = Router();

// Реєстрація
router.post(
  '/register',
  celebrate(registerUserSchema),
  registerUser
);

// Логін
router.post(
  '/login',
  celebrate(loginUserSchema),
  loginUser
);

// Оновлення сесії
router.post(
  '/refresh',
  refreshUserSession
);

// Логаут
router.post(
  '/logout',
  logoutUser
);

export default router;