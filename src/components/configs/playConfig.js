import { PlayChordProg } from "../play/playChordProgressions"

export const PLAY_CHOICES = ["Chord Prog"]

const playMap = new Map()

playMap.set("Chord Prog", <PlayChordProg></PlayChordProg>)

export {playMap}