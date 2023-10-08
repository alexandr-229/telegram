import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import { SenderModule } from './sender/sender.module';
import { ConfigModule } from '@nestjs/config';
import { getMongoConfig } from './configs/mongo.config';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    TypegooseModule.forRootAsync(getMongoConfig()),
    ConfigModule.forRoot(),
    HttpModule,
    SenderModule,
  ],
})
export class AppModule {}
