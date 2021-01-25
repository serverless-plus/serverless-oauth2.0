import { Request, Response } from 'express';
import { Post } from '../models/Post';

export const list = async (req: Request, res: Response): Promise<void> => {
  const posts = await Post.findAll();

  res.json({
    code: 200,
    data: {
      posts,
    },
  });
};
