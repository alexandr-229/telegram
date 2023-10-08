import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import { SenderModule } from './sender/sender.module';
import { ConfigModule } from '@nestjs/config';
import { getMongoConfig } from './configs/mongo.config';
import { TypegooseModule } from 'nestjs-typegoose';
import { getSenderConfig } from './configs/sender.config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypegooseModule.forRootAsync(getMongoConfig()),
    SenderModule.forRootAsync(getSenderConfig()),
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    HttpModule,
  ],
})
export class AppModule {}
