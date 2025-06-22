import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { task } from '$lib/server/db/schema';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	return {};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(302, '/login');
		}

		const formData = await request.formData();
		const title = formData.get('title') as string;
		const description = formData.get('description') as string;
		const estimatedMinutes = parseInt(formData.get('estimatedMinutes') as string);
		const priority = parseInt(formData.get('priority') as string);

		// Validation
		if (!title || title.trim().length === 0) {
			return fail(400, { error: 'Title is required' });
		}

		if (!estimatedMinutes || estimatedMinutes < 1) {
			return fail(400, { error: 'Estimated time must be at least 1 minute' });
		}

		if (!priority || priority < 1 || priority > 3) {
			return fail(400, { error: 'Priority must be between 1 and 3' });
		}

		try {
			await db.insert(task).values({
				userId: locals.user.id,
				title: title.trim(),
				description: description?.trim() || null,
				estimatedMinutes,
				priority
			});

			throw redirect(302, '/tasks');
		} catch (error) {
			console.error('Error creating task:', error);
			return fail(500, { error: 'Failed to create task. Please try again.' });
		}
	}
}; 