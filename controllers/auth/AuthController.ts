import { Request, Response, NextFunction } from 'express'
import { AuthControllerInterface } from './AuthInterface';
import sequelizeHandler from '../../middlewares/sequelizeHandler';
import { UserAttributes } from '../../interfaces/UserInterface';
import { ErrorResponse, INVALID_CRESENTIALS } from '../../tools/ErrorResponse';

import User from '../../models/user';

class AuthController implements AuthControllerInterface {
  constructor()
  {
    this.login = sequelizeHandler(this.login);
    this.register = sequelizeHandler(this.register);
  }

  /**
   * login
   */
  public async login(req: Request, res: Response, next: NextFunction)
  {
    const user: null | User = await User.findOne({
      where: {
        email: req.body.email
      },
    })

    if (!user) {
      return next(new ErrorResponse('Неверные учетные данные', 401, INVALID_CRESENTIALS));
    }

    if (!await user.matchPassword(req.body.password)) {
      return next(new ErrorResponse('Неверные учетные данные', 401, INVALID_CRESENTIALS));
    }

    sendTokenResponse(user, 201, res);
  }

  /**
   * register
   */
  public async register(req: Request, res: Response, next: NextFunction)
  {
    const user: User = await User.create(req.body);
    sendTokenResponse(user, 200, res);
  }
}

const sendTokenResponse = (user: UserAttributes, status: number, res: Response) => {
  const token: String = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRE as string) * 24 * 60 * 60 * 1000
    ),
  };
  
  res
    .status(status)
    .cookie('token', token, options)
    .json({success: true, token});
}

export default new AuthController();