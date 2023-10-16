import { Module } from '@nestjs/common';
import { HttpService } from './http.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { VacancyModel } from './models/vacancy.model';
import { HttpController } from './http.controller';

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: VacancyModel,
				schemaOptions: {
					collection: 'Vacancy',
				},
			},
		]),
	],
	controllers: [HttpController],
	providers: [HttpService],
	exports: [HttpService]
})
export class HttpModule {}
