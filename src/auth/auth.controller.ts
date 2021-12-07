import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth-guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth-guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async profile(@Req() req) {
    return 'profile page';
  }

  @Get('/confirm')
  async confirmMail(@Query('token') token: string) {
    return this.authService.verifyConfirmToken(token);
  }
}
