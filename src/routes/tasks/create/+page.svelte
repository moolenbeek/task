<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="container mx-auto px-4 py-8">
	<div class="max-w-2xl mx-auto">
		<div class="mb-8">
			<a href="/tasks" class="text-muted-foreground hover:text-foreground">
				← Back to Tasks
			</a>
		</div>

		<h1 class="text-3xl font-bold mb-8">Create New Task</h1>

		<form method="POST" use:enhance class="space-y-6">
			<div>
				<label for="title" class="block text-sm font-medium mb-2">Title *</label>
				<input
					type="text"
					id="title"
					name="title"
					required
					class="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
					placeholder="Enter task title"
				/>
			</div>

			<div>
				<label for="description" class="block text-sm font-medium mb-2">Description</label>
				<textarea
					id="description"
					name="description"
					rows="4"
					class="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
					placeholder="Enter task description (optional)"
				></textarea>
			</div>

			<div>
				<label for="estimatedMinutes" class="block text-sm font-medium mb-2">Estimated Time (minutes) *</label>
				<input
					type="number"
					id="estimatedMinutes"
					name="estimatedMinutes"
					required
					min="1"
					class="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
					placeholder="30"
				/>
			</div>

			<div>
				<label for="priority" class="block text-sm font-medium mb-2">Priority</label>
				<select
					id="priority"
					name="priority"
					class="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
				>
					<option value="1">Low</option>
					<option value="2">Medium</option>
					<option value="3">High</option>
				</select>
			</div>

			{#if form?.error}
				<div class="text-red-600 text-sm">{form.error}</div>
			{/if}

			<div class="flex gap-4">
				<button
					type="submit"
					class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
				>
					Create Task
				</button>
				<a
					href="/tasks"
					class="px-4 py-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground"
				>
					Cancel
				</a>
			</div>
		</form>
	</div>
</div> 