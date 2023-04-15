<template>
	<div>
		<div class="fixed z-10 h-full w-6 bg-gray-500 opacity-30 right-0"></div>
		<div class="fixed z-10 w-full h-6 bg-gray-500 opacity-30 bottom-0"></div>
		<div
			v-for="row in rows"
			:key="row[0].toneColor"
			class="touch-none whitespace-nowrap"
		>
			<button
				:class="[
					'm-[2px] w-16 h-16 rounded-md box-border select-none touch-none text-gray-800',
					toneBgClass(cell.toneColor),
					{ 'border-4 border-red-400': activeNotes[cell.midi] },
				]"
				v-for="cell in row"
				:key="cell.toneColor"
				@pointerdown.prevent.stop="onPointerDown(cell.midi)"
				@pointerup.prevent.stop="onPointerUp(cell.midi)"
				@pointerenter.prevent.stop="onPointerEnter(cell.midi)"
				@pointerout.prevent.stop="onPointerOut(cell.midi)"
				@contextmenu.prevent.stop="returnFalse"
			>
				{{ cell.frequency.toNote() }}
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import * as ToneImport from 'tone'
import { ScaleHighlight, ToneColorType, ToneValue } from '~~/utils/tone-colors'
import { getToneBgColorClass } from '~~/utils/tone-colors'

const Tone: typeof ToneImport = (ToneImport as any).default || ToneImport

type Mode = 'Record' | 'Play'

interface Props {
	baseNote?: number
	top?: number
	bottom?: number
	left?: number
	right?: number
	activeNotes: number[]
	mode?: Mode
	scaleHeighlight?: ScaleHighlight
	toneColors?: ToneColorType
}

const props = withDefaults(defineProps<Props>(), {
	baseNote: 48, // 'C3 midi number'
	top: 3,
	bottom: 1,
	left: 2,
	right: 3,
	mode: 'Record',
	scaleHeighlight: ScaleHighlight.Major,
	toneColors: ToneColorType.CircleOfFiths,
})

const emit = defineEmits({
	activateNote(midi: number) {},
	deactivateNote(midi: number) {},
})

const baseFrequency = computed(() => Tone.Frequency(props.baseNote, 'midi'))

const activeNotes = computed(() => {
	const notes = props.activeNotes || []
	return notes.reduce((acc, note) => {
		acc[note] = true
		return acc
	}, {} as Record<number, boolean>)
})

const toneBgClass = (tone: ToneValue) =>
	getToneBgColorClass(
		tone,
		midiToToneValue(props.baseNote),
		props.scaleHeighlight,
		props.toneColors,
	)

const returnFalse = () => false

const pointerdown = ref(false)

const onPointerDown = (midi: number) => {
	pointerdown.value = true
	if (props.mode === 'Record') {
		if (activeNotes.value[midi]) {
			emit('deactivateNote', midi)
		} else {
			emit('activateNote', midi)
		}
	} else {
		emit('activateNote', midi)
	}
}
const onPointerUp = (midi: number) => {
	pointerdown.value = false
	if (props.mode === 'Play') {
		emit('deactivateNote', midi)
	}
}
const onPointerEnter = (midi: number) => {
	if (pointerdown.value) {
		if (props.mode === 'Record') {
			if (activeNotes.value[midi]) {
				emit('deactivateNote', midi)
			} else {
				emit('activateNote', midi)
			}
		} else {
			emit('activateNote', midi)
		}
	}
}
const onPointerOut = (midi: number) => {
	if (pointerdown.value) {
		if (props.mode === 'Play') {
			emit('deactivateNote', midi)
		}
	}
}

const rows = computed(() => {
	const width = props.right + props.left + 1
	const height = props.top + props.bottom + 1

	const base = baseFrequency.value.transpose(-props.left + props.top * 5)
	const result = []
	let rowStart = 0

	for (let i = 0; i < height; i++) {
		const row = []

		for (let j = 0; j < width; j++) {
			const val = rowStart + j
			const f = base.transpose(val)
			const midi = f.toMidi()
			row.push({
				frequency: f,
				midi,
				toneColor: mod(midi, 12) as ToneValue,
			})
		}

		result.push(row)
		rowStart -= 5
	}
	return result
})
</script>
