import createHttpError from 'http-errors';
import Session from '../models/session.js';
import User from '../models/user.js';

export const authenticate = async (req, res, next) => {
  // Отримуємо і токен, і ID сесії з cookies
  const { accessToken, sessionId } = req.cookies;

  // Перевірка наявності обох параметрів
  if (!accessToken || !sessionId) {
    return next(createHttpError(401, 'Missing access token or session id'));
  }

  // Шукаємо сесію за обома параметрами
  const session = await Session.findOne({ 
    _id: sessionId, 
    accessToken: accessToken 
  });
  
  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  // Перевірка терміну дії
  if (new Date() > new Date(session.accessTokenValidUntil)) {
    return next(createHttpError(401, 'Access token expired'));
  }

  // Знаходимо користувача
  const user = await User.findById(session.userId);
  if (!user) {
    return next(createHttpError(401));
  }

  req.user = user;
  next();
};