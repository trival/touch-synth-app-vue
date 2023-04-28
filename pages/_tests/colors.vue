<template>
	<div>
		<h2>Chromatic Scale</h2>
		<h3>No Highlight</h3>
		<div class="flex">
			<div
				class="w-20 h-20 m-1 py-3 px-4 rounded-md box-border select-none touch-none text-gray-800"
				v-for="c in chromNoneColors"
				:key="c.value"
				:style="{ backgroundColor: c.color }"
			>
				{{ c.value }}
			</div>
		</div>
		<h3>Soft Highlight</h3>
		<h3>Strong Highlight</h3>
	</div>
</template>

<script setup lang="ts">
import { ToneColor, ToneValue } from '~~/utils/tone-colors'

const chromaticValues: ToneValue[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
const circleOfFithsValues: ToneValue[] = [0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5]

const chromNoneColors = chromaticValues.map((value) => ({
	color: chromaticBgColor({
		value,
		highlight: ToneHighlight.None,
	}),
	value,
}))
</script>
