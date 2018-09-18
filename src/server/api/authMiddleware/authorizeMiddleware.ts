import { Request, Response, NextFunction } from 'express';

export function loggedInMiddleWare(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    next(); // good to go
  } else {
    return res.sendStatus(401); // Unauthorized
  }
}

export function adminOnlyMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    if (req.user.role === 'admin') {
      next(); // good to go
    } else {
      return res.sendStatus(403); // forbidden, you are logged in but dont have permission
    }
  } else {
    return res.sendStatus(401); // Unauthorized
  }
}