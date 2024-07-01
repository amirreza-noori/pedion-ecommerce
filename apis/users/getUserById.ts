import { User } from '@/interfaces';
import { sql } from '@/lib';

type Params = {
	id: number;
};

export const getUserById = async (params: Params) => {
	const res = await sql<User[]>`
		SELECT * FROM roles
	`;
};
