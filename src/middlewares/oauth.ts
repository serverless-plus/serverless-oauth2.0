import { JwtPayload } from './../typings/index';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { CONFIGS } from '../configs';

const publicPem = readFileSync(CONFIGS.publicKeyPath, 'utf-8');

export const oauth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { headers } = req;
  const { authorization } = headers;
  let isValid = false;
  if (authorization) {
    const token = authorization.split('id_token=').pop();
    if (token) {
      try {
        const validRes = jwt.verify(token, publicPem) as JwtPayload;
        if (validRes.code) {
          isValid = true;
        }
      } catch (e) {
        console.log(`[JWT] ${e.message}`);
      }
    }
  }

  if (!isValid) {
    res.json({
      code: 403,
      error: {
        message: 'Unauthorized.',
      },
    });
  } else {
    next();
  }
};

export const oauthRedirect = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { token } = req.cookies;
  let isValid = false;
  if (token) {
    try {
      const validRes = jwt.verify(token, publicPem) as JwtPayload;
      if (validRes.code) {
        isValid = true;
      }
    } catch (e) {
      console.log(`[JWT] ${e.message}`);
    }
  }

  if (!isValid) {
    res.redirect('/login');
  } else {
    next();
  }
};
