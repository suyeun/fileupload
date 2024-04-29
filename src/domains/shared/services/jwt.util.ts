import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtUtil {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(userId: string): string {
    return this.jwtService.sign({ userId });
  }

  extractTokenFromRequest(request: any): string | null {
    const authorizationHeader = request.headers.authorization;
    const token = authorizationHeader?.replace('Bearer ', '');
    return token || null;
  }

  validateToken(token: string): boolean {
    try {
      this.jwtService.verify(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
