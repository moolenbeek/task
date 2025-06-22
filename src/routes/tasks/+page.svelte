<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';

	let { data }: { data: PageData } = $props();

	function closeDialogAfterSubmit(event: Event) {
		const dialog = (event.target as HTMLElement).closest('[data-state]');
		if (dialog) dialog.removeAttribute('data-state');
	}
</script>

<div class="container mx-auto px-4 py-8">
	<div class="max-w-4xl mx-auto">
		<div class="flex justify-between items-center mb-8">
			<h1 class="text-3xl font-bold">My Tasks</h1>
			<a 
				href="/tasks/create" 
				class="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
			>
				Create New Task
			</a>
		</div>

		{#if data.tasks && data.tasks.length > 0}
			<div class="grid gap-4">
				{#each data.tasks as task}
					<div class="bg-card border rounded-lg p-6">
						<div class="flex justify-between items-start">
							<div class="flex-1">
								<h3 class="text-xl font-semibold mb-2">{task.title}</h3>
								{#if task.description}
									<p class="text-muted-foreground mb-2">{task.description}</p>
								{/if}
								<div class="flex gap-4 text-sm text-muted-foreground">
									<span>Estimated: {task.estimatedMinutes} minutes</span>
									<span>Priority: {task.priority}</span>
								</div>
							</div>
							<div class="flex items-center gap-4">
								<div class="text-sm text-muted-foreground">
									{task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'Unknown'}
								</div>
								<AlertDialog.Root>
									<AlertDialog.Trigger class="px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors">
										Delete
									</AlertDialog.Trigger>
									<AlertDialog.Content>
										<AlertDialog.Header>
											<AlertDialog.Title>Delete Task</AlertDialog.Title>
											<AlertDialog.Description>
												Are you sure you want to delete this task? This action cannot be undone.
											</AlertDialog.Description>
										</AlertDialog.Header>
										<AlertDialog.Footer>
											<AlertDialog.Cancel class="px-3 py-1 rounded-md border">
												Cancel
											</AlertDialog.Cancel>
											<form method="POST" action="?/delete" use:enhance onsubmit={closeDialogAfterSubmit} style="display: inline;">
												<input type="hidden" name="taskId" value={task.id} />
												<AlertDialog.Action class="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700" type="submit">
													Delete
												</AlertDialog.Action>
											</form>
										</AlertDialog.Footer>
									</AlertDialog.Content>
								</AlertDialog.Root>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<div class="text-center py-12">
				<h2 class="text-xl font-semibold mb-2">No tasks yet</h2>
				<p class="text-muted-foreground mb-4">Create your first task to get started!</p>
				<a 
					href="/tasks/create" 
					class="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
				>
					Create Your First Task
				</a>
			</div>
		{/if}
	</div>
</div> 