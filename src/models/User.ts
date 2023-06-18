import { Roles } from '../lib/utils/enum';

export default interface User {
	_id: string;
	username: string;
	email: string;
	roleId: Roles;
	createdAt?: string;
	updatedAt?: string;
}
