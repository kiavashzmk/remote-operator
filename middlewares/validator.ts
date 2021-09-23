import { Request, Response, NextFunction } from 'express';

interface sshConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  passphrase?: string;
  privateKey?: string;
}
// * Request validator middleware.
export const validator = (req: Request, res: Response, next: NextFunction) => {
  const { host, username, port, password }: sshConfig = req.body;
  if (!host || !username || !port || !password) {
    throw Error('provide host details');
  }
  // attaches ssh config to request.
  next();
};
