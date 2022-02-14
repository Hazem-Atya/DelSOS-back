import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth-guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth-guards/local-auth.guard';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/user.decorator';
import { LoginUserDto } from './DTO/userLogin.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}
  @ApiBody({ type: LoginUserDto })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @GetUser() user,
    @Req() req
  ) {
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
  async profile(@GetUser() user) {
    return user;
  }

  @Get('/confirm')
  async confirmToken(@Query('token') token: string) {
    return this.authService.verifyConfirmToken(token);
  }
}
