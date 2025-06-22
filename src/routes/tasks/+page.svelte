<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
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
							<div>
								<h3 class="text-xl font-semibold mb-2">{task.title}</h3>
								{#if task.description}
									<p class="text-muted-foreground mb-2">{task.description}</p>
								{/if}
								<div class="flex gap-4 text-sm text-muted-foreground">
									<span>Estimated: {task.estimatedMinutes} minutes</span>
									<span>Priority: {task.priority}</span>
								</div>
							</div>
							<div class="text-sm text-muted-foreground">
								{task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'Unknown'}
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