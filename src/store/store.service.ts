import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { Password } from 'src/auth/DTO/password.dto';
import { MailService } from 'src/mail/mail.service';
import { Store } from 'src/store/models/store.model';
import { CrudService } from 'src/utils/crud.service';
import { STATUS } from 'src/utils/enum';
import { CreateStoreDto } from './DTO/storeCreation.dto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { ForgotPasswordDto } from 'src/auth/DTO/forgotPassword.dto';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel('Store')
    private readonly storeModel: Model<Store>,
    private readonly mailService: MailService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly crudService: CrudService,
    private readonly utilService: UtilsService,
  ) {}

  async registerStore(
    file: Express.Multer.File,
    userData: CreateStoreDto,
  ): Promise<any> {
    const email = userData.email;
    const username = `store-${userData.name.split(' ').join('')}-delsos`;
    const source = {
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      path: file.path,
    };

    if (await this.storeModel.findOne({ email })) {
      throw new NotFoundException(
        `This email  is already used`,
        `This email is already used`,
      );
    }
    const user = await this.storeModel.create({
      ...userData,
      username,
      source,
      address: [],
    });

    try {
      await user.save();
    } catch (e) {
      throw new ConflictException(`the email should be unique`);
    }
    return 'store created';
  }

  async getStore(id: string) {
    return await this.storeModel.findById(id);
  }

  async getAllStores(): Promise<Store[]> {
    return await this.storeModel.find();
  }

  async updateStore(newStore: Store): Promise<any> {
    return this.crudService.update(this.storeModel, newStore);
  }

  updatePasswordStore(newPassword: Password, id: string): any {
    return this.crudService.updatePassword(
      this.storeModel,
      newPassword.password,
      id,
    );
  }

  async deleteStore(id: string) {
    return this.crudService.delete(this.storeModel, id);
  }

  async getPartnershipRequests(): Promise<any> {
    let stores = await this.storeModel.find({ status: STATUS.deactivated });
    if (!stores) throw new NotFoundException('NOT FOUND');
    return stores;
  }

  async activate(id: string): Promise<any> {
    const store = await this.storeModel.findById(id);
    if (store) {
      const password = uuidv4();
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      store.status = STATUS.activated;
      store.password = hashedPassword;
      store.save();

      const mail = await this.mailService.activateStore({
        name: store.name,
        username: store.username,
        email: store.email,
        password,
      });
      if (!mail) return 'mail not sent';
      //throw new Exception('mail not sent')
      return store;
    } else {
      throw new NotFoundException('store no found');
    }
  }

  async forgotPassword(email: string) {
    return this.utilService.forgotPassword(this.storeModel, email, 'store');
  }

  async resetPassword(passwordInfo: ForgotPasswordDto, user) {
    return this.utilService.resetPassword(this.storeModel, passwordInfo, user);
  }
}
