<script lang="ts">
	import Switch from '../Switch.svelte';

	export let data: { sounds: string[] };

	const possibleTags = {
		Ambient: /^ambient\//,
		Buttons: /^buttons\//,
		Combined: /^combined\//,
		Common: /^common\//,
		Doors: /^doors\//,
		Friends: /^friends\//,
		HL1: /^hl1\//,
		Items: /^items\//,
		Music: /^music\//,
		NPC: /^npc\//,
		Physics: /^physics\//,
		Plats: /^plats\//,
		Player: /^player\//,
		Test: /^test\//,
		UI: /^ui\//,
		Vehicles: /^vehicles\//,
		'Voice Overs': /^vo\//,
		Weapons: /^weapons\//,
		Miscellaneous: /^(resource|beams)\//
	};

	let tags: string[] = [];

	const toggleTag = (tag: string) => {
		if (tags.includes(tag)) {
			tags = tags.filter((t) => t !== tag);
		} else {
			tags = [...tags, tag];
		}
	};

	let search: string = '';

	$: sounds = data.sounds.filter(
		(sound) =>
			sound.includes(search) &&
			(tags.length === 0 ||
				tags.some((tag) => possibleTags[tag as keyof typeof possibleTags].test(sound)))
	);

	let playingAudio: HTMLAudioElement | undefined;

	const playSound = (sound: string) => {
		playingAudio?.pause();

		if (playingAudio?.src.includes(sound)) {
			playingAudio = undefined;
		} else {
			playingAudio = new Audio(`/hl2/sound/${sound}`);
			playingAudio.play();
		}
	};

	let minimalMode: boolean = false;
</script>

<div class="container">
	<main>
		<div class="header">
			<div class="github">
				<a href="https://github.com/ceifa/hl2-soundlist" target="_blank" rel="noreferrer">
					Made with ❤️
				</a>
			</div>
			<div>
				<Switch bind:checked={minimalMode} />
			</div>
		</div>

		<div class="search-bar-container">
			<input
				class="search-input"
				type="text"
				placeholder="Search Half Life 2 sounds"
				bind:value={search}
			/>
		</div>

		<div class="tags">
			{#each Object.keys(possibleTags) as tag}
				<button on:click={() => toggleTag(tag)} class="tag" class:active={tags.includes(tag)}>
					{tag}
				</button>
			{/each}
		</div>

		<div class="sounds" class:minimal={minimalMode}>
			{#each sounds as sound}
				{#if minimalMode}
					<div
						class="sound-name"
						class:active={playingAudio?.src.includes(sound)}
						on:click={() => playSound(sound)}
					>
						{sound}
					</div>
				{:else}
					<button class="sound-container" on:click={() => playSound(sound)}>
						<div class="play-button" class:active={playingAudio?.src.includes(sound)} />
						<div class="sound-name">{sound}</div>
					</button>
				{/if}
			{/each}
		</div>
	</main>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

	.header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 16px;
	}

	.github a {
		text-decoration: none;
		color: hsl(220, 25%, 70%);
	}

	.container {
		background-color: #0a0c10;
		display: flex;
		justify-content: center;
		font-family: 'Inter', sans-serif;
		min-height: 100vh;
	}

	main {
		width: 100%;
		max-width: 1280px;
		padding: 64px;
	}

	.search-bar-container {
		width: 100%;
		display: flex;
	}

	.search-input {
		background-color: hsl(220, 25%, 10%);
		border: 0;
		height: 64px;
		border-radius: 1000px;
		flex: 1;
		font-size: 16px;
		font-family: 'Inter', sans-serif;
		color: rgb(223, 227, 236);
		padding: 0 32px;
	}

	.search-input::placeholder {
		color: hsl(220, 25%, 70%);
	}

	.search-input:focus,
	.search-input:hover {
		background-color: #0a0c10;
		outline: 1px solid hsl(220, 25%, 50%, calc(100% / 3));
	}

	.tags {
		margin-top: 16px;
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.tag {
		background-color: hsl(220, 25%, 10%);
		border: 0;
		height: 32px;
		border-radius: 1000px;
		padding: 0 16px;
		font-size: 14px;
		font-family: 'Inter', sans-serif;
		color: rgb(223, 227, 236);
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	.tag:hover {
		background-color: #0a0c10;
		outline: 1px solid hsl(220, 25%, 50%, calc(100% / 3));
	}

	.tag.active {
		background-color: hsl(220, 25%, 20%);
	}

	.sounds {
		margin-top: 64px;
		display: flex;
		flex-wrap: wrap;
		gap: 32px;
		justify-content: center;
	}

	.sounds.minimal {
		margin-top: 32px;
		flex-direction: column;
		gap: 8px;
		cursor: pointer;
	}

	.sound-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: none;
		border: 0;
		cursor: pointer;
		width: 30%;
	}

	.play-button {
		background-color: hsl(220, 25%, 10%);
		border: 0;
		height: 64px;
		width: 64px;
		border-radius: 1000px;
		margin-bottom: 16px;
	}

	.play-button::before {
		content: '';
		display: block;
		width: 0;
		height: 0;
		border-top: 12px solid transparent;
		border-bottom: 12px solid transparent;
		border-left: 18px solid hsl(220, 25%, 70%);
		margin-left: calc(50% - 6px);
		margin-top: calc(50% - 12px);
	}

	.play-button.active::before {
		border-left: 18px solid hsl(220, 25%, 50%, calc(100% / 3));
	}

	.play-button.active,
	.sound-container:hover .play-button {
		background-color: #0a0c10;
		outline: 1px solid hsl(220, 25%, 50%, calc(100% / 3));
	}

	.sound-name {
		color: hsl(220, 25%, 70%);
	}

	.sound-name.active {
		color: hsl(220, 25%, 50%, calc(100% / 3));
	}
</style>
