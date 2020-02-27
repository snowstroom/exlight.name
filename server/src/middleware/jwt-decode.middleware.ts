import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtDecodeMiddleware implements NestMiddleware {
  constructor(private jwtSrv: JwtService) {}

  use(req: Request, res: Response, next: () => void): void {
    const authHead = req.headers.authorization as string;
    if (authHead) {
      req.authInfo = this.jwtSrv.decode(authHead);
    }
    next();
  }
}
