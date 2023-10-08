import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';

export interface VacancyModel extends Base {}
export class VacancyModel extends TimeStamps {
	@prop()
	vacancyId: string;

	@prop()
	title: string;

	@prop()
	companyId: string;
}
