import { Request, Response } from 'express';
import { render } from './utils';

export const index = async (req: Request, res: Response): Promise<void> => {
  render(res, {
    name: 'home',
    title: 'Oauth2.0 - Serverless',
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  render(res, {
    name: 'login',
    title: 'Oauth2.0 - Serverless - Oauth2.0 Login',
  });
};

export const normalLogin = async (req: Request, res: Response): Promise<void> => {
  render(res, {
    name: 'normal-login',
    title: 'Oauth2.0 - Serverless - Login',
  });
};
