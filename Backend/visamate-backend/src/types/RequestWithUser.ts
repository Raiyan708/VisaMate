// src/types/RequestWithUser.ts
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    id: number;
    email: string;
    iat?: number;
    exp?: number;
  };
}
