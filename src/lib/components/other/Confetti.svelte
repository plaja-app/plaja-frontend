<script lang="ts">
	import { Confetti } from 'svelte-confetti';

	export let timeout: number;
</script>

<div
	style="
	 position: fixed;
	 top: -50px;
	 left: 0;
	 height: 100vh;
	 width: 100vw;
	 display: flex;
	 justify-content: center;
	 overflow: hidden;
	 pointer-events: none;"
	class="z-50"
>
	<Confetti
		x={[-5, 5]}
		y={[0, 4]}
		delay={[500, 2000]}
		duration={timeout}
		amount={400}
		fallDistance="150vh"
	/>
</div>
