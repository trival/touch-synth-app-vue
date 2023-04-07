import { Tone } from 'tone/build/esm/core/Tone'

export type ToneValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

export enum ToneHighlight {
	None = 1,
	Soft = 3,
	Strong = 5,
}

export interface ToneColor {
	value: ToneValue
	highlight: ToneHighlight
}

export function chromaticBgColorClass(tone: ToneColor): string {
	switch (tone.value) {
		case 0:
			return tone.highlight === ToneHighlight.None
				? `bg-cyan-100`
				: tone.highlight === ToneHighlight.Soft
				? `bg-cyan-300`
				: `bg-cyan-600`
		case 1:
			return tone.highlight === ToneHighlight.None
				? `bg-blue-100`
				: tone.highlight === ToneHighlight.Soft
				? `bg-blue-300`
				: `bg-blue-500`
		case 2:
			return tone.highlight === ToneHighlight.None
				? `bg-violet-100`
				: tone.highlight === ToneHighlight.Soft
				? `bg-violet-300`
				: `bg-violet-500`
		case 3:
			return tone.highlight === ToneHighlight.None
				? `bg-fuchsia-100`
				: tone.highlight === ToneHighlight.Soft
				? `bg-fuchsia-300`
				: `bg-fuchsia-500`
		case 4:
			return tone.highlight === ToneHighlight.None
				? `bg-pink-100`
				: tone.highlight === ToneHighlight.Soft
				? `bg-pink-300`
				: `bg-pink-500`
		case 5:
			return tone.highlight === ToneHighlight.None
				? `bg-red-100`
				: tone.highlight === ToneHighlight.Soft
				? `bg-red-300`
				: `bg-red-500`
		case 6:
			return tone.highlight === ToneHighlight.None
				? `bg-orange-100`
				: tone.highlight === ToneHighlight.Soft
				? `bg-orange-300`
				: `bg-orange-500`
		case 7:
			return tone.highlight === ToneHighlight.None
				? `bg-amber-100`
				: tone.highlight === ToneHighlight.Soft
				? `bg-amber-300`
				: `bg-amber-600`
		case 8:
			return tone.highlight === ToneHighlight.None
				? `bg-yellow-100`
				: tone.highlight === ToneHighlight.Soft
				? `bg-yellow-300`
				: `bg-yellow-600`
		case 9:
			return tone.highlight === ToneHighlight.None
				? `bg-lime-100`
				: tone.highlight === ToneHighlight.Soft
				? `bg-lime-300`
				: `bg-lime-600`
		case 10:
			return tone.highlight === ToneHighlight.None
				? `bg-green-100`
				: tone.highlight === ToneHighlight.Soft
				? `bg-green-300`
				: `bg-green-600`
		case 11:
			return tone.highlight === ToneHighlight.None
				? `bg-teal-100`
				: tone.highlight === ToneHighlight.Soft
				? `bg-teal-300`
				: `bg-teal-600`
	}
}

export function circleOfFithsBgColorClass(tone: ToneColor): string {
	switch (tone.value) {
		case 0:
			return tone.highlight === ToneHighlight.None
				? `bg-cyan-100`
				: tone.highlight === ToneHighlight.Soft
				? `bg-cyan-300`
				: `bg-cyan-600`
		case 7:
			return tone.highlight === ToneHighlight.None
				? `bg-blue-100`
				: tone.highlight === ToneHighlight.Soft
				? `bg-blue-300`
				: `bg-blue-500`
		case 2:
			return tone.highlight === ToneHighlight.None
				? `bg-violet-100`
				: tone.highlight === ToneHighlight.Soft
				? `bg-violet-300`
				: `bg-violet-500`
		case 9:
			return tone.highlight === ToneHighlight.None
				? `bg-fuchsia-100`
				: tone.highlight === ToneHighlight.Soft
				? `bg-fuchsia-300`
				: `bg-fuchsia-500`
		case 4:
			return tone.highlight === ToneHighlight.None
				? `bg-pink-100`
				: tone.highlight === ToneHighlight.Soft
				? `bg-pink-300`
				: `bg-pink-500`
		case 11:
			return tone.highlight === ToneHighlight.None
				? `bg-red-100`
				: tone.highlight === ToneHighlight.Soft
				? `bg-red-300`
				: `bg-red-500`
		case 6:
			return tone.highlight === ToneHighlight.None
				? `bg-orange-100`
				: tone.highlight === ToneHighlight.Soft
				? `bg-orange-300`
				: `bg-orange-500`
		case 1:
			return tone.highlight === ToneHighlight.None
				? `bg-amber-100`
				: tone.highlight === ToneHighlight.Soft
				? `bg-amber-300`
				: `bg-amber-600`
		case 8:
			return tone.highlight === ToneHighlight.None
				? `bg-yellow-100`
				: tone.highlight === ToneHighlight.Soft
				? `bg-yellow-300`
				: `bg-yellow-600`
		case 3:
			return tone.highlight === ToneHighlight.None
				? `bg-lime-100`
				: tone.highlight === ToneHighlight.Soft
				? `bg-lime-300`
				: `bg-lime-600`
		case 10:
			return tone.highlight === ToneHighlight.None
				? `bg-green-100`
				: tone.highlight === ToneHighlight.Soft
				? `bg-green-300`
				: `bg-green-600`
		case 5:
			return tone.highlight === ToneHighlight.None
				? `bg-teal-100`
				: tone.highlight === ToneHighlight.Soft
				? `bg-teal-300`
				: `bg-teal-600`
	}
}

export function getSimpleColorHighlight(tone: ToneValue): ToneHighlight {
	switch (tone) {
		case 0:
			return ToneHighlight.Strong
		case 5:
		case 7:
			return ToneHighlight.Soft
		default:
			return ToneHighlight.None
	}
}

export function getMinorPentatonicHighlight(tone: ToneValue): ToneHighlight {
	switch (tone) {
		case 0:
			return ToneHighlight.Strong
		case 5:
		case 7:
		case 3:
		case 10:
			return ToneHighlight.Soft
		default:
			return ToneHighlight.None
	}
}

export function getMajorHighlight(tone: ToneValue): ToneHighlight {
	switch (tone) {
		case 0:
			return ToneHighlight.Strong
		case 5:
		case 7:
		case 2:
		case 4:
		case 9:
		case 11:
			return ToneHighlight.Soft
		default:
			return ToneHighlight.None
	}
}

export enum ScaleHighlight {
	None,
	Tonic,
	Simple,
	MinorPentatonic,
	Major,
}

export enum ToneColorType {
	Chromatic,
	CircleOfFiths,
}

export function getScaleToneColor(
	tone: ToneValue,
	scale: ScaleHighlight,
): ToneColor {
	switch (scale) {
		case ScaleHighlight.Simple:
			return {
				value: tone,
				highlight: getSimpleColorHighlight(tone),
			}
		case ScaleHighlight.MinorPentatonic:
			return {
				value: tone,
				highlight: getMinorPentatonicHighlight(tone),
			}
		case ScaleHighlight.Major:
			return {
				value: tone,
				highlight: getMajorHighlight(tone),
			}
		case ScaleHighlight.Tonic:
			return {
				value: tone,
				highlight: tone === 0 ? ToneHighlight.Strong : ToneHighlight.None,
			}
		case ScaleHighlight.None:
			return {
				value: tone,
				highlight: ToneHighlight.Soft,
			}
	}
}

export function getToneBgColorClass(
	tone: ToneValue,
	scale: ScaleHighlight,
	colorVariant: ToneColorType,
): string {
	const toneColor = getScaleToneColor(tone, scale)
	switch (colorVariant) {
		case ToneColorType.Chromatic:
			return chromaticBgColorClass(toneColor)
		case ToneColorType.CircleOfFiths:
			return circleOfFithsBgColorClass(toneColor)
	}
}
