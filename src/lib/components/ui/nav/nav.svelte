<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';

	interface Props {
		user: { id: string; username: string } | null;
	}

	let { user }: Props = $props();
</script>

<nav class="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
	<div class="container mx-auto px-4 h-14 flex items-center justify-between">
		<div class="flex items-center space-x-4">
			<a href="/" class="font-semibold text-lg">
				Task Scheduler
			</a>
			{#if user}
				<a href="/tasks" class="text-sm text-muted-foreground hover:text-foreground">
					Tasks
				</a>
			{/if}
		</div>
		
		{#if user}
			<div class="flex items-center space-x-4">
				<span class="text-sm text-muted-foreground">
					Welcome, <span class="font-medium text-foreground">{user.username}</span>
				</span>
				<form method="post" action="/logout" use:enhance>
					<Button variant="outline" size="sm" type="submit">
						Logout
					</Button>
				</form>
			</div>
		{:else}
			<div class="flex items-center space-x-2">
				<a href="/login">
					<Button variant="ghost" size="sm">
						Login
					</Button>
				</a>
				<a href="/register">
					<Button size="sm">
						Register
					</Button>
				</a>
			</div>
		{/if}
	</div>
</nav>
