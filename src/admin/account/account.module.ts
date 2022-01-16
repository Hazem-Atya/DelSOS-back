import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopperSchema } from 'src/user/models/shopper.model';
import { StoreSchema } from 'src/user/models/store.model';
import { CrudService } from 'src/utils/crud.service';
import { UtilsModule } from 'src/utils/utils.module';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Shopper', schema: ShopperSchema }]),
    MongooseModule.forFeature([{ name: 'Store', schema: StoreSchema }]),
    UtilsModule,
  ],
  providers: [AccountService],
  controllers: [AccountController]
})
export class AccountModule {}
