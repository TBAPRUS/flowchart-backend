import { Router } from "express";
import { checkSchema } from 'express-validator';

import AuthController from '../controllers/auth/AuthController';

import AuthValidator from '../controllers/auth/AuthValidator';

import checkValidator from '../middlewares/checkValidator';
import includeHandler from '../middlewares/includeHandler';

const router = Router();

// router.use();
router.get('/api/v1/auth/login', (req, res, next) => {
  res.send('hi');
});
router.post('/api/v1/auth/login',
  checkSchema(AuthValidator.login), 
  checkValidator,
  AuthController.login
);
router.post(
  '/api/v1/auth/register', 
  checkSchema(AuthValidator.register), 
  checkValidator, 
  includeHandler('email', 'password', 'username'), 
  AuthController.register
);

export default router;