import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

@Injectable()
export class HashService {
  private readonly saltRounds = 12;

  async hashPassword(data: string): Promise<string> {
    return bcrypt.hash(data, this.saltRounds);
  }

  async comparePassword(data: string, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash);
  }

  generateToken(length = 32): Promise<string> {
    return new Promise((resolve, reject) => {
      randomBytes(length, (err: Error | null, buffer: Buffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(buffer.toString('hex'));
        }
      });
    });
  }
}
