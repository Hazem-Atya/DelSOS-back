import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shopper } from 'src/user/models/shopper.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Shopper')
    private readonly userModel: Model<Shopper>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (user) {
      const testPassword = bcrypt.compareSync(password, user.password);
      if (testPassword) {
        const { password, ...result } = user;
        return result['_doc'];
      } else {
        throw new PreconditionFailedException('Wrong Credentials ! ');
      }
    }
    throw new NotFoundException("User dosn't exists !");
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createConfirmToken(payload: any) {
    return this.jwtService.sign(payload);
  }

  async verifyConfirmToken(token: string) {
    const payload = this.jwtService.verify(token);
    const user = await this.userModel.findById(payload.sub);
    if (user) {
      await this.userModel.findByIdAndUpdate(
        user._id,
        {
          confirmed: true,
        },
        { new: true },
      );
      throw new HttpException('Email confirmed', HttpStatus.OK);
    }
  }
}
