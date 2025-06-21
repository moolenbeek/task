<script lang="ts">
	import '../app.css';
	import { Nav } from '$lib/components/ui/nav';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: any } = $props();
</script>

<Nav user={data.user} />

<main>
	{@render children()}
</main>
