import { note2Number, number2Note } from "../components/playSound/playSpecific"
import { chordForm2chordArr } from "../components/playSound/playSpecific"

const intervalSounds = ["Minor 2nd", "Major 2nd", "Minor 3rd", "Major 3rd",
    "Perfect 4th", "Tritone", "Perfect 5th", "Minor 6th",
    "Major 6th", "Minor 7th", "Major 7th", "Octave"
]

const chordSoundsFull = ["Major", "Minor", "Augmented", "Diminished",
    "Sus 2", "Sus 4", "Dominant 7th", "Major 7th",
    "Minor 7th", "Minor Major 7th", "Diminished 7th", "Half Diminished 7th",
    "Augmented 7th", "Augmented Major 7th", "Major 6th", "Minor 6th"
]

const chordSounds = ["Maj", "Min", "Aug", "Dim",
    "Sus 2", "Sus 4", "Dom 7", "Maj 7",
    "Min 7", "Min Maj 7", "Dim 7", "Half Dim 7",
    "Aug 7", "Aug Maj 7", "Maj 6", "Min 6"
]

export const chordForms = [
    "CEG", "CD#G", "CEG#", "CD#F#",
    "CDG", "CFG", "CEGA#", "CEGB",
    "CD#GA#", "CD#GB", "CD#F#A", "CD#F#A#",
    "CEG#A#", "CEG#B", "CEGA", "CD#GA"
]



const noteSounds = ["C", "C#", "D", "D#",
    "E", "F", "F#", "G", "G#", "A", "A#", "B"
]

const melodySounds = ["C", "C#", "D", "D#",
    "E", "F", "F#", "G", "G#", "A", "A#", "B"
]




const intervalPlayForms = ["Ascend", "Descend", "Ascend & Descend", "Harmonic", "All Mixed"]
const chordPlayForms = ["Harmonic", "Ascend", "Descend", "Ascend & Descend", "All Mixed"]
const notePlayForms = ["Single"]
const melodyPlayForms = ["Ascend", "Descend", "Random"]

export const modes = ["Major"]

// chord progressions

export const chordArrs = chordForms.map(chordForm => chordForm2chordArr(chordForm))


export const CHORD_PROG_INIT_PARAS = {
    key: {
        options: noteSounds,
        cur: "C",
    },
    scale: {
        options: [0, 1, 2, 3, 4, 5, 6, 7],
        cur: 4,
    },
    mode: {
        options: modes,
        cur: "Major",
    },
    pos: {
        options: [1, 2, 3, 4, 5, 6, 7],
        cur: 1,
    }
}

export const generateDataForChordPara = (chordData) => {
    const info = chordData.info
    // console.log(nextInMode(info.mode.cur, info.key.cur, info.key.cur))
    return "" + info
}

const MAJOR_MODE = ["C", "D", "E", "F", "G", "A", "B"]
const modeMap = new Map()
modeMap.set("Major", MAJOR_MODE)

// next note of current note in some scale; only note, no scale involvde
export const nextInMode = (mode, curNote, key) => {
    const modeArr = modeMap.get(mode)
    const modeNumArr = modeArr.map(note => {
        return note2Number(note)
    })
    const keyNum = note2Number(key)
    const curNoteMode = modeNumArr.map(noteNum => {
        return number2Note((noteNum + keyNum + 108) % 12, false)
    })
    curNoteMode.push(curNoteMode[0])
    let bef = '*'
    for (let note of curNoteMode) {
        if (bef == curNote) return note
        bef = note
    }

}


export { intervalSounds, chordSounds, noteSounds, melodySounds }
export { intervalPlayForms, chordPlayForms, notePlayForms, melodyPlayForms }
