import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule, 
    MongooseModule.forRoot('mongodb+srv://Riheme:riheme@delsos.lvvv0.mongodb.net/delsosDev')
    //MongooseModule.forRoot('mongodb://riheme:riheme@localhost:27017')
    //MongooseModule.forRoot('mongodb+srv://riheme:riheme@delsos.lvvv0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
