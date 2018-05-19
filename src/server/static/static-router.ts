import * as path from 'path';
import * as express from 'express';
import { Router } from 'express';

export function staticsRouter() {
  const router = Router();

  const publicPath = path.join(__dirname, '..', '..', 'client');

  router.use(express.static(publicPath, { maxAge: 86400000 /* cache one day */, dotfiles: "allow" }));

  // direct unknown requests to index
  router.use((req, res) => { res.sendFile(path.resolve(publicPath + '/index.html')) });

  return router;
}