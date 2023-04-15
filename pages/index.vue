<template>
	<div>
		<Keyboard
			:activeNotes="[...activeNotes]"
			@activateNote="onActivateNote"
			@deactivateNote="onDeactivateNote"
			:baseNote="baseNote"
			:top="10"
			:right="9"
			:scaleHeighlight="ScaleHighlight.Major"
			mode="Play"
		/>
	</div>
</template>

<script setup lang="ts">
import * as tone from 'tone'

const activeNotes = ref(new Set<number>())

let synth: tone.PolySynth
let started = false

const baseNote = ref(tone.Frequency('C2').toMidi())

function playNote(midi: number) {
	if (synth && !activeNotes.value.has(midi)) {
		synth.triggerAttack(tone.Frequency(midi, 'midi').toFrequency())
		activeNotes.value.add(midi)
	}
}

function onDeactivateNote(midi: number) {
	if (synth && activeNotes.value.has(midi)) {
		synth.triggerRelease(tone.Frequency(midi, 'midi').toFrequency())
		activeNotes.value.delete(midi)
	}
}

function onActivateNote(midi: number) {
	const f = tone.Frequency(midi, 'midi').toFrequency()
	if (synth && !started) {
		tone.start().then(() => {
			playNote(midi)
			started = true
		})
	} else {
		playNote(midi)
	}
}

onMounted(() => {
	synth = new tone.PolySynth(tone.Synth).toDestination()
})
</script>
