import { ConflictException, NotFoundException,Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateShopperDto } from "./DTO/shopperCreation.dto";
import { Shopper } from './models/shopper.model';
import * as bcrypt from 'bcrypt';
import { Store } from "./models/store.model";
import { CreateStoreDto } from "./DTO/storeCreation.dto";
import { JwtService } from "@nestjs/jwt";
import { sign } from 'jsonwebtoken';

@Injectable()
export class UserService {
 
   constructor(
    @InjectModel('Shopper') 
     private readonly userModel: Model<Shopper>,
     @InjectModel('Store')
     private readonly storeModel: Model<Store>,
     private jwtService: JwtService,

) {}
  
  async registerShopper(userData: CreateShopperDto): Promise<any> {
    const email = userData.email ;
    const name = userData.name;
    const phoneNumber = userData.phone;
    const age = userData.age;
    const username = `shopper-${name.split(' ').join('')}-delsos`;

     if (await this.userModel.findOne({ email })) {
       
      throw new NotFoundException(`This email  is already used`);
    } 

      const password = await bcrypt.hash(userData.password, 10);
      const user = await this.userModel.create({
        name,
        username,
        email,
        phoneNumber,
        password,
        age,
        bankDetails: {
          owner: userData.owner,
          cardNumber: userData.cardNumber,
          expirationdate: userData.expirationDate,
        },
        address: ""
      });

    
      const payload = { username: user.username, sub: user._id };
      return {
        access_token: this.jwtService.sign(payload),
      };
  
  

    }
 
  
  
  
    async registerStore(userData: CreateStoreDto): Promise<any> {
      const email = userData.email ;
      const name = userData.name;

        
    if (await this.storeModel.findOne({ email })) {
         
        throw new NotFoundException(`This email  is already used`, `This email is already used`);
      } 
         const user =  await this.storeModel.create({
           ...userData,
           address: []
        });
        
        user.password = await bcrypt.hash(user.password,10);
        try {
          await user.save();
        } catch (e) {
          throw new ConflictException(`the email should be unique`);
        }
      return "store created";
  
      }


}