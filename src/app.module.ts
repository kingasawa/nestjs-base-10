import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@modules/auth/auth.module';
import { UserService } from '@modules/user/user.service';
import { UserModule } from '@modules/user/user.module';
import { DatabaseModule } from '@modules/database/db.module';
import { ConfigModule } from '@nestjs/config';
import { EventGateway } from '@modules/socket/event.gateway'
import { AssemblyService } from '@modules/services/assembly.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UserModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService, AssemblyService, EventGateway],
})
export class AppModule {}
