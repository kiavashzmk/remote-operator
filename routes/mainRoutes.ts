import express, { Request, Response } from 'express';
import { upload, uninstall } from '../services/ssh-helper';
import { validator } from '../middlewares/validator';

const router = express.Router();

router.post('/api/remote/install', validator, async (req: Request, res: Response) => {
  const config = req.body;
  await upload(config);
  res.send({
    success: true,
    status: 'files are uploaded and being installed...',
  });
});

router.delete('/api/remote/uninstall', validator, (req: Request, res: Response) => {
  const config = req.body;
  uninstall(config);
  res.send({ success: true, status: 'files deleted from resource' });
});

export { router as mainRoutes };
