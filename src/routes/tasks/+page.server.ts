import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { task } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	const tasks = await db
		.select()
		.from(task)
		.where(eq(task.userId, locals.user.id))
		.orderBy(task.createdAt);

	return {
		tasks
	};
}; 