import { Controller, Get } from '@nestjs/common';
import { SenderService } from './sender.service';

@Controller('sender')
export class SenderController {
	constructor(
		private readonly senderService: SenderService,
	) {}

	@Get('chanel')
	async sendChanelMessage() {
		await this.senderService.sendChanelMessage();
		return { message: 'OK' };
	}

	@Get('report')
	async sendReport() {
		await this.senderService.sendReport();
		return { message: 'OK' };
	}
}
