import { sql } from '@/lib';

import { User } from '@/interfaces';

type Params = {
  id: number;
};

export const getUserById = async (params: Params) => {
  const res = await sql<User[]>`
		SELECT * FROM roles
	`;
};
