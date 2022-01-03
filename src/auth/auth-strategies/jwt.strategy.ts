import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shopper } from 'src/user/models/shopper.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectModel('Shopper')
    private readonly userModel: Model<Shopper>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter('token'),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('SIGN_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await this.userModel.findOne({ email: payload.email });
    if (!user || !user.isConfirmed) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
