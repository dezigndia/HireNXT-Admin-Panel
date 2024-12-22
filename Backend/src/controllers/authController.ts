import { Request, Response } from 'express';
import { loginUser } from '../services/authService';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    console.log(email+" "+password)
    const { token } = await loginUser(email, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: 'server was unable to process a request due to a client error' });
  }
};