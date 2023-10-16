import { Controller, Get } from '@nestjs/common';

@Controller('')
export class HttpController {
	@Get('health-check')
	healthCheck() {
		return { message: 'OK' };
	}
}
