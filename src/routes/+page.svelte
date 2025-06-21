<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="container mx-auto px-4 py-8">
	{#if data.user}
		<div class="max-w-2xl mx-auto text-center">
			<h1 class="text-3xl font-bold mb-4">Welcome to Task Scheduler</h1>
			<p class="text-lg text-muted-foreground mb-8">
				Hello, {data.user.username}! You're successfully logged in.
			</p>
			<div class="bg-card border rounded-lg p-6">
				<h2 class="text-xl font-semibold mb-4">Getting Started</h2>
				<p class="text-muted-foreground">
					This is your dashboard. You can start creating and managing your tasks here.
				</p>
			</div>
		</div>
	{:else}
		<div class="max-w-2xl mx-auto text-center">
			<h1 class="text-3xl font-bold mb-4">Welcome to Task Scheduler</h1>
			<p class="text-lg text-muted-foreground mb-8">
				Please log in to start managing your tasks.
			</p>
			<div class="flex gap-4 justify-center">
				<a href="/login" class="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
					Login
				</a>
				<a href="/register" class="inline-flex items-center px-4 py-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground">
					Register
				</a>
			</div>
		</div>
	{/if}
</div>