import { Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { AuthService } from './service/auth.service';

@Module({
   imports: [AdminModule],
   providers: [AuthService],
})
export class AuthModule {}
