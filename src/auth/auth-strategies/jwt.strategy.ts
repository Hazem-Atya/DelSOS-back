import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shopper } from 'src/shopper/models/shopper.model';
import { Store } from 'src/store/models/store.model';
import { STATUS, TYPE } from 'src/utils/enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectModel('Shopper')
    private readonly shopperModel: Model<Shopper>,
    @InjectModel('Store')
    private readonly storeModel: Model<Store>,
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
    let user;
    if (payload.type === TYPE.shopper)
      user = await this.shopperModel.findOne({ email: payload.email });
    else user = await this.storeModel.findOne({ email: payload.email });
    if (!user || user.status === STATUS.deactivated) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
