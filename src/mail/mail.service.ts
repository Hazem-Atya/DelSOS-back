import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shopper } from 'src/user/models/shopper.model';
import { Store } from 'src/user/models/store.model';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    @InjectModel('Shopper')
    private readonly userModel: Model<Shopper>,
    @InjectModel('Store')
    private readonly storeModel: Model<Store>,
  ) {}

  async sendUserConfirmation(user: any, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <support@example.com>',
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation',
      context: {
        name: user.name,
        url,
      },
    });
  }
}
