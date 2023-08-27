import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus() {
    return {
      status: 'The open-source community-powered DGII RNC API is up!',
    };
  }

  getVersion() {
    return {
      version: '0.0.1',
    };
  }
}
