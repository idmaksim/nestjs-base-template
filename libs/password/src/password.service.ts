import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { ComparePasswordOptions } from './interfaces/service.interfaces';

@Injectable()
export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(2);
    return bcrypt.hash(password, salt);
  }

  async comparePassword(options: ComparePasswordOptions): Promise<boolean> {
    return bcrypt.compare(options.password, options.hashedPassword);
  }
}
