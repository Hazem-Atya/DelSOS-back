import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shopper } from 'src/user/models/shopper.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './DTO/userLogin.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Shopper')
    private readonly userModel: Model<Shopper>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(loginInfo: LoginUserDto): Promise<any> {
    const { password, email } = loginInfo;
    const user = await this.userModel.findOne({ email });
    if (user && user.isConfirmed) {
      const testPassword = bcrypt.compareSync(password, user.password);
      if (testPassword) {
        const payload = { email: user.email, sub: user._id };
        return payload;
      } else {
        throw new PreconditionFailedException('Wrong Credentials ');
      }
    }
    throw new PreconditionFailedException(
      'Wrong Credentials or Unconfirmed Email ! ',
    );
  }

  async createToken(payload, expirationDate: number) {
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: +expirationDate,
      }),
    };
  }

  async verifyConfirmToken(token: string) {
    const payload = await this.jwtService.verify(token);
    const user = await this.verifyToken(token);
    if (user) {
      await this.userModel.findByIdAndUpdate(
        user._id,
        {
          isConfirmed: true,
        },
        { new: true },
      );
      throw new HttpException('Email confirmed', HttpStatus.OK);
    } else {
      throw new NotAcceptableException();
    }
  }

  async verifyToken(token: string) {
    console.log(token);
    const payload = await this.jwtService.verify(token);
    const user = await this.userModel.findById(payload.sub);
    if (user) {
      return user;
    } else {
      throw new NotFoundException();
    }
  }
}
