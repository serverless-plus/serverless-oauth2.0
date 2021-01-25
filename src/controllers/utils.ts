import { Response } from 'express';

type Options = {
  name: string;
  title: string;
};

export const render = async (res: Response, options: Options): Promise<void> => {
  res.render(options.name, {
    title: options.title,
    STATIC_URL: process.env.STATIC_URL || '',
    isDev: process.env.NODE_ENV === 'development',
  });
};
