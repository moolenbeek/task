import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { task } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';

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

export const actions: Actions = {
	delete: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(302, '/login');
		}

		const formData = await request.formData();
		const taskId = formData.get('taskId') as string;

		if (!taskId) {
			return fail(400, { error: 'Task ID is required' });
		}

		try {
			// First check if the task exists and belongs to the user
			const existingTask = await db
				.select()
				.from(task)
				.where(
					and(
						eq(task.id, taskId),
						eq(task.userId, locals.user.id)
					)
				)
				.limit(1);

			if (existingTask.length === 0) {
				return fail(404, { error: 'Task not found or you do not have permission to delete it' });
			}

			// Delete the task
			await db
				.delete(task)
				.where(
					and(
						eq(task.id, taskId),
						eq(task.userId, locals.user.id)
					)
				);

			return { success: true };
		} catch (error) {
			console.error('Error deleting task:', error);
			return fail(500, { error: 'Failed to delete task. Please try again.' });
		}
	}
}; 