import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiHeader } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth-guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth-guards/local-auth.guard';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/user.decorator';

@Controller('auth')
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@GetUser() user) {
    return this.authService.createToken(
      user,
      this.configService.get('LOGIN_TOKEN_EXPIRATION'),
    );
  }

  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for authentification.',
  })
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async profile(@Req() req) {
    return req.user;
  }

  @Get('/confirm')
  async confirmToken(@Query('token') token: string) {
    return this.authService.verifyConfirmToken(token);
  }
}
