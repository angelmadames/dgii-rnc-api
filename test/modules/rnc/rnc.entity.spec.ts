import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rnc } from '../../../src/modules/rnc/rnc.entity';

describe('Rnc', () => {
  let repository: Repository<Rnc>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Rnc),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = module.get<Repository<Rnc>>(getRepositoryToken(Rnc));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create a new Rnc', async () => {
    const rnc = new Rnc();
    rnc.id = '1';
    rnc.name = 'Test Rnc';
    rnc.commercialName = 'Test Commercial Name';
    rnc.description = 'Test Description';
    rnc.phone = '123456789';
    rnc.address = 'Test Address';
    rnc.creationDate = '2022-01-01';
    rnc.status = 'Active';
    rnc.paymentSystem = 'Test Payment System';

    const saveMock = jest.fn().mockResolvedValue(rnc);
    repository.save = saveMock;

    await expect(repository.save(rnc)).resolves.toEqual(rnc);
    expect(saveMock).toHaveBeenCalledWith(rnc);
  });
});
