import { app } from '..';
import { Router } from "express";

export const routePrefix = (path: string, configure: (router: Router) => void): Router => {
  const router = Router();
  app.use(`/api/${path}`, router);
  configure(router);
  return router;
};
