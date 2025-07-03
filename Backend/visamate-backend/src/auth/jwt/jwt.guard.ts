//   import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
//   import { AuthGuard } from '@nestjs/passport';
//   import { Observable } from 'rxjs';
  


//   @Injectable()
//   export class JwtGuard implements CanActivate {
//     canActivate(
//       context: ExecutionContext,
//     ): boolean | Promise<boolean> | Observable<boolean> {
//       return true;
//     }
//   }
// // src/auth/jwt.guard.ts


// export class JwtAuthGuard extends AuthGuard('jwt') {}
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

