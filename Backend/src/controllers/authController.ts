import { Request, Response } from 'express';
import { loginUser, create } from '../services/authService';

export const login = async (req: Request, res: Response) => {
  const { email, password} = req.body;

  try {
      console.log(email+" "+password)
      const { token } = await loginUser(email, password);
      res.json({ token });
  } catch (error) {
    res.status(400).json({ error: 'server was unable to process a request due to a client error' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const response = await create('', name, '', email, '', password);
    res.json({ "Response" : response });
  } catch (error) {
    res.status(400).json({ error: 'server was unable to process a request due to a client error' });
  }
};

export const addUser = async (req: Request, res: Response) => {
  const { roles, name, companyName, email, contactNo, password } = req.body;

  try {
    const response = await create(roles, name, companyName, email, contactNo, password);
    res.json({ "Response" : response });
  } catch (error) {
    res.status(400).json({ error: 'server was unable to process a request due to a client error' });
  }
};