import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface MessageModel extends Base {}
export class MessageModel extends TimeStamps {
	@prop()
	link: string;

	@prop()
	title: string;
}
