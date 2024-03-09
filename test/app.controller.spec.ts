import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getStatus', () => {
    it('should return the status from AppService', () => {
      const status = { status: 'OK' };
      jest.spyOn(appService, 'getStatus').mockReturnValue(status);

      expect(appController.getStatus()).toBe(status);
    });
  });

  describe('getVersion', () => {
    it('should return the version from AppService', () => {
      const version = { version: '1.0.0' };
      jest.spyOn(appService, 'getVersion').mockReturnValue(version);

      expect(appController.getVersion()).toBe(version);
    });
  });
});
