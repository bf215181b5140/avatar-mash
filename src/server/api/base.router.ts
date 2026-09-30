import { Router } from 'express';

export class BaseRouter {
  protected route = Router();

  public router() {
    return this.route;
  }
}