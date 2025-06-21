<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="min-h-screen flex items-center justify-center bg-background p-4">
	<Card class="w-full max-w-md">
		<CardHeader class="space-y-1">
			<CardTitle class="text-2xl font-bold text-center">Welcome back</CardTitle>
			<CardDescription class="text-center">
				Enter your credentials to access your account
			</CardDescription>
		</CardHeader>
		<CardContent>
			<form method="post" action="?/login" use:enhance class="space-y-4">
				<div class="space-y-2">
					<Label for="username">Username</Label>
					<Input
						id="username"
						name="username"
						type="text"
						placeholder="Enter your username"
						required
						class="w-full"
					/>
				</div>
				<div class="space-y-2">
					<Label for="password">Password</Label>
					<Input
						id="password"
						name="password"
						type="password"
						placeholder="Enter your password"
						required
						class="w-full"
					/>
				</div>
				
				{#if form?.message}
					<div class="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-3">
						{form.message}
					</div>
				{/if}
				
				<Button type="submit" class="w-full">
					Login
				</Button>
			</form>
			
			<div class="mt-6 text-center text-sm">
				<span class="text-muted-foreground">Don't have an account? </span>
				<a href="/register" class="text-primary hover:underline font-medium">
					Register
				</a>
			</div>
		</CardContent>
	</Card>
</div>