import { getUserById } from '@/apis';

export default async function Home() {
	await getUserById({ id: 1 });
	return <div>Home Page</div>;
}
