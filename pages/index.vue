<template>
	<div>
		<div v-for="row in rows" :key="row[0].step" class="touch-none">
			<button
				:class="[
					'm-[2px] w-16 h-16 rounded-md box-border select-none touch-none',
					toneBgClass(cell.step),
					{
						'border-4 border-red-400':
							activeFrequency === cell.frequency.toFrequency(),
					},
				]"
				v-for="cell in row"
				:key="cell.step"
				@pointerdown.prevent.stop="startNote(cell.frequency.toFrequency())"
				@pointerenter.prevent.stop="startNote(cell.frequency.toFrequency())"
				@pointerup.prevent.stop="endNote(cell.frequency.toFrequency())"
				@pointerout.prevent.stop="endNote(cell.frequency.toFrequency())"
				@contextmenu.prevent.stop="returnFalse"
			>
				{{ cell.frequency.toNote() }}
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import * as tone from 'tone'
import { Frequency } from 'tone/build/esm/core/type/Units'
import { ScaleHighlight, ToneColorType, ToneValue } from '~~/utils/tone-colors'
import { getToneBgColorClass } from '~~/utils/tone-colors'

const duration = ref('8n')
const baseFrequency = ref(tone.Frequency('C6'))
const activeFrequency = ref<Frequency | null>(null)

const toneBgClass = (tone: ToneValue) =>
	getToneBgColorClass(tone, ScaleHighlight.Major, ToneColorType.CircleOfFiths)

let started = false

let startNote = (_f: Frequency) => {}
let endNote = (_f: Frequency) => {}
const returnFalse = () => false

onMounted(() => {
	const synth = new tone.PolySynth(tone.Synth).toDestination()
	startNote = (f: Frequency) => {
		if (!started) {
			tone.start().then(() => {
				synth.triggerAttackRelease(f, duration.value)
				started = true
			})
		} else {
			synth.triggerAttack(f, duration.value)
		}
		activeFrequency.value = f
	}
	endNote = (f: Frequency) => {
		synth.triggerRelease(f)
		activeFrequency.value = null
	}
})

function mod(n: number, m: number) {
	return ((n % m) + m) % m
}

const rows = computed(() => {
	const base = baseFrequency.value
	const result = []
	let rowStart = 0

	for (let i = 0; i < 13; i++) {
		const row = []

		for (let j = 0; j < 13; j++) {
			const val = rowStart + j
			row.push({
				frequency: base.transpose(val),
				step: mod(val, 12) as ToneValue,
			})
		}

		result.push(row)
		rowStart -= 5
	}
	return result
})
</script>
