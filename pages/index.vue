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
import * as ToneImport from 'tone'

const Tone: typeof ToneImport = (ToneImport as any).default || ToneImport

const activeNotes = ref(new Set<number>())

let synth: ToneImport.PolySynth
let started = false

const baseNote = ref(Tone.Frequency('C2').toMidi())

function playNote(midi: number) {
	if (synth && !activeNotes.value.has(midi)) {
		synth.triggerAttack(Tone.Frequency(midi, 'midi').toFrequency())
		activeNotes.value.add(midi)
	}
}

function onDeactivateNote(midi: number) {
	if (synth && activeNotes.value.has(midi)) {
		synth.triggerRelease(Tone.Frequency(midi, 'midi').toFrequency())
		activeNotes.value.delete(midi)
	}
}

function onActivateNote(midi: number) {
	if (synth && !started) {
		Tone.start().then(() => {
			playNote(midi)
			started = true
		})
	} else {
		playNote(midi)
	}
}

onMounted(() => {
	synth = new Tone.PolySynth(Tone.Synth).toDestination()
})
</script>
