import { JwtPayload } from './../typings/index';
import { Request, Response } from 'express';
import { readFileSync } from 'fs';
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';
import { CONFIGS } from '../configs';
import { User } from '../models/User';
import { Token } from '../models/Token';
import { pwdEncrypt } from '../utils';

const privatePem = readFileSync(CONFIGS.privateKeyPath, 'utf-8');

async function getUniqueCode(): Promise<string> {
  const code = nanoid(8);
  const token = await Token.findOne({ where: { code } });
  if (token) {
    return getUniqueCode();
  }
  return code;
}

export const normalLogin = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });

  // username not exist
  if (!user) {
    res.status(403);
    res.json({
      code: 403,
      error: {
        message: `Username not exist`,
      },
    });
  } else {
    // password wrong
    if (user.password !== pwdEncrypt(password)) {
      res.status(403);
      res.json({
        code: 403,
        error: {
          message: `Password wrong`,
        },
      });
    } else {
      const code = await getUniqueCode();
      const payload = {
        code,
        user_id: user.id,
      };

      const token = jwt.sign(payload, privatePem, {
        algorithm: 'RS256',
        expiresIn: '5m',
      });

      await Token.create({
        code,
        token,
        user_id: user.id,
      });

      res.cookie('token', token, {
        maxAge: 3600000,
      });

      res.json({
        code: 200,
        data: {
          code,
          token,
        },
      });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  // username not exist
  const code = await getUniqueCode();
  await Token.create({
    code,
    token: '',
    user_id: 0,
  });
  res.json({
    code: 200,
    data: {
      code,
    },
  });
};

export const callback = async (req: Request, res: Response): Promise<void> => {
  const { code } = req.query;

  const exist = await Token.findOne({ where: { code } });
  if (!exist) {
    res.status(403);
    res.json({
      code: 403,
      error: {
        message: `Code invalid`,
      },
    });
  } else {
    const payload = {
      code,
      user_id: exist.user_id,
    } as JwtPayload;

    const token = jwt.sign(payload, privatePem, {
      algorithm: 'RS256',
      expiresIn: '1h',
    });

    await Token.update(
      {
        token,
      },
      {
        where: { code },
      },
    );

    res.cookie('token', token, {
      maxAge: 3600000,
    });

    res.redirect('/');
  }
};

export const getToken = async (req: Request, res: Response): Promise<void> => {
  // username not exist
  const code = await getUniqueCode();
  const payload = {
    code,
    user_id: 0,
  } as JwtPayload;

  const token = jwt.sign(payload, privatePem, {
    algorithm: 'RS256',
    expiresIn: '1h',
  });

  await Token.create({
    code,
    token,
    user_id: 0,
  });
  res.json({
    code: 200,
    data: {
      token,
    },
  });
};
