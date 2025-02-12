import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  private readonly saltRounds = 12;

  async hashPassword(data: string): Promise<string> {
    return bcrypt.hash(data, this.saltRounds);
  }

  async comparePassword(data: string, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash);
  }
}
