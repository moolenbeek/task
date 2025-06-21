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
			<CardTitle class="text-2xl font-bold text-center">Create an account</CardTitle>
			<CardDescription class="text-center">
				Enter your details to create your account
			</CardDescription>
		</CardHeader>
		<CardContent>
			<form method="post" action="?/register" use:enhance class="space-y-4">
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
				<div class="space-y-2">
					<Label for="confirmPassword">Confirm Password</Label>
					<Input
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						placeholder="Confirm your password"
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
					Register
				</Button>
			</form>
			
			<div class="mt-6 text-center text-sm">
				<span class="text-muted-foreground">Already have an account? </span>
				<a href="/login" class="text-primary hover:underline font-medium">
					Login
				</a>
			</div>
		</CardContent>
	</Card>
</div>