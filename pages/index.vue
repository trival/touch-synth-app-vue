<template>
	<div>
		<div v-for="row in rows" :key="row[0].step">
			<button
				:class="[
					'm-1 w-16 h-12 rounded-md box-border',
					{ 'bg-pink-400': cell.step === 0 },
					{ 'bg-fuchsia-100': cell.step === 1 },
					{ 'bg-purple-100': cell.step === 2 },
					{ 'bg-indigo-200': cell.step === 3 },
					{ 'bg-sky-100': cell.step === 4 },
					{ 'bg-cyan-400': cell.step === 5 },
					{ 'bg-cyan-100': cell.step === 6 },
					{ 'bg-teal-400': cell.step === 7 },
					{ 'bg-teal-100': cell.step === 8 },
					{ 'bg-lime-200': cell.step === 9 },
					{ 'bg-orange-200': cell.step === 10 },
					{ 'bg-red-100': cell.step === 11 },
					{
						'border-4 border-red-400':
							activeFrequency === cell.frequency.toFrequency(),
					},
				]"
				v-for="cell in row"
				:key="cell.step"
				@pointerdown="startNote(cell.frequency.toFrequency())"
				@pointerup="endNote()"
			>
				{{ cell.frequency.toNote() }}
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import * as tone from 'tone'
import { Frequency } from 'tone/build/esm/core/type/Units'

const duration = ref('8n')
const baseFrequency = ref(tone.Frequency('C6'))
const activeFrequency = ref<Frequency | null>(null)

let started = false

let startNote = (_f: Frequency) => {}
let endNote = () => {}

onMounted(() => {
	const synth = new tone.Synth().toDestination()
	startNote = (f: Frequency) => {
		if (!started) {
			tone.start().then(() => {
				synth.triggerAttack(f, duration.value)
				started = true
			})
		} else {
			synth.triggerAttack(f, duration.value)
		}
		activeFrequency.value = f
	}
	endNote = () => {
		synth.triggerRelease()
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

	for (let i = 0; i < 12; i++) {
		const row = []

		for (let j = 0; j < 12; j++) {
			const val = rowStart + j
			row.push({
				frequency: base.transpose(val),
				step: mod(val, 12),
			})
		}

		result.push(row)
		rowStart -= 5
	}
	return result
})
</script>
