import { Test, TestingModule } from '@nestjs/testing';
import { ShopperController } from './shopper.controller';

describe('ShopperController', () => {
  let controller: ShopperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopperController],
    }).compile();

    controller = module.get<ShopperController>(ShopperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
