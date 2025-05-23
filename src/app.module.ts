import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from '@modules/user/user.service';
import { UserModule } from '@modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { EventGateway } from '@modules/socket/event.gateway'
import { AssemblyService } from '@modules/services/assembly.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService, AssemblyService, EventGateway],
})
export class AppModule {}
