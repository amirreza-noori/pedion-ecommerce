export interface User {
	id: number;
	roleId: number;
	mobile: number;
	email: string;
	firstName: string;
	lastName: string;
	nikName: string;
	authorizationCode: string;
	gender: 'male' | 'female';
	age: number;
	cash: number;
	credit: number;
	points: number;
}
