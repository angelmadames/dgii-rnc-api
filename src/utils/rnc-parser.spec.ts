import { Rnc } from 'src/modules/rnc/rnc.entity';
import { rncLineParser } from './rnc-parser';

describe('rncLineParser', () => {
  it('should parse a line into an Rnc object', () => {
    const line =
      '1|Name|Commercial Name|Description|Address1|Address2|Address3|Phone|Creation Date|Status|Payment System';
    const parsedRnc: Rnc = {
      id: '1',
      name: 'Name',
      commercialName: 'Commercial Name',
      description: 'Description',
      address: 'Address1 Address2 Address3',
      phone: 'Phone',
      creationDate: 'Creation Date',
      status: 'Status',
      paymentSystem: 'Payment System',
    };

    expect(rncLineParser(line)).toEqual(parsedRnc);
  });

  it('should handle extra spaces and quotes in fields', () => {
    const line =
      '  1  | "Name" | "Commercial  Name" | Description | Address1 | Address2 | Address3 | Phone | Creation Date | Status | Payment System ';
    const parsedRnc: Rnc = {
      id: '1',
      name: 'Name',
      commercialName: 'Commercial Name',
      description: 'Description',
      address: 'Address1 Address2 Address3',
      phone: 'Phone',
      creationDate: 'Creation Date',
      status: 'Status',
      paymentSystem: 'Payment System',
    };

    expect(rncLineParser(line)).toEqual(parsedRnc);
  });
});
