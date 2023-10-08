import { Controller, Get } from '@nestjs/common';
import { HttpService } from './http.service';

@Controller('http')
export class HttpController {
	constructor(
		private readonly httpService: HttpService,
	) {}

	@Get('list')
	async getList() {
		const result = await this.httpService.getVacancy('nodejs');
		return result;
	}
}
