import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shopper } from 'src/user/models/shopper.model';
import { Store } from 'src/user/models/store.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: any, token: string) {
    const url = `http://localhost:3000/auth/confirm?token=${token}`;

    const info = await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <delsosinsat@gmail.com>',
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation',
      context: {
        name: user.username,
        url,
      },
    });

    return info;
  }
}
