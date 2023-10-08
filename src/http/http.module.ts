import { Module } from '@nestjs/common';
import { HttpService } from './http.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { VacancyModel } from './models/vacancy.model';

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
	providers: [HttpService],
	exports: [HttpService]
})
export class HttpModule {}
