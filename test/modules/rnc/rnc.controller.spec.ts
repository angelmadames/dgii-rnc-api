import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RncController } from '../../../src/modules/rnc/rnc.controller';
import { RncService } from '../../../src/modules/rnc/rnc.service';

describe('RncController', () => {
  let controller: RncController;
  let service: RncService;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      searchByName: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RncController],
      providers: [{ provide: RncService, useValue: mockService }],
    }).compile();

    controller = module.get<RncController>(RncController);
    service = module.get<RncService>(RncService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all records', async () => {
      const records = createMockRecords();
      jest.spyOn(service, 'findAll').mockResolvedValue(records);

      expect(await controller.findAll()).toEqual(records);
    });
  });

  describe('searchOne', () => {
    it('should return a record when found', async () => {
      const record = createMockRecord();
      jest.spyOn(service, 'searchByName').mockResolvedValue([record]);

      expect(await controller.searchOne('Record')).toEqual([record]);
    });

    it('should throw a 404 error when record is not found', async () => {
      jest.spyOn(service, 'searchByName').mockResolvedValue(undefined);

      await expect(controller.searchOne('Record')).rejects.toThrow(
        new HttpException(
          'Could not find RNC in our database.',
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('findOne', () => {
    it('should return a record when found', async () => {
      const record = createMockRecord();
      jest.spyOn(service, 'findOne').mockResolvedValue(record);

      expect(await controller.findOne('1')).toEqual(record);
    });

    it('should throw a 404 error when record is not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(undefined);

      await expect(controller.findOne('1')).rejects.toThrow(
        new HttpException(
          'Could not find RNC in our database.',
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('remove', () => {
    it('should remove a record', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);
      expect(await controller.remove('1')).toEqual(undefined);
    });
  });

  // Helper functions
  function createMockRecords() {
    return [createMockRecord(), createMockRecord()];
  }

  function createMockRecord() {
    return {
      id: '1',
      name: 'Record 1',
      commercialName: 'Commercial Name 1',
      description: 'Description 1',
      phone: 'Phone 1',
      address: 'Address 1',
      creationDate: 'Creation Date 1',
      status: 'Status 1',
      paymentSystem: 'Payment System 1',
    };
  }
});
