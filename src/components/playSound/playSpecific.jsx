import { randomElement, randomNumberInRange, getRandomIntInclusive } from "../../utils/giveTips"
import { intervalSounds, noteSounds, chordSounds, chordForms } from "../../utils/musicTerms"
import { playSoundOnce } from "./playSingle"

const NOTE_RANGE = { min: 0, max: 96 }

const arr2Str = (arr) => {
    let ans = ""
    for (let i = 0; i < arr.length; i++) {
        ans += " "
        ans += arr[i]
    }
    return ans
}

// 0 for C0, 12 for C1, ... 96 for C8(max)
const number2Note = (num) => {
    let scale = Math.floor(num / 12), note = num % 12;
    return noteSounds[note] + scale;
}

const note2Number = (note) => {
    for (let [index, val] of noteSounds.entries()) {
        if (note == val) return index
    }
}

const chordForm2chordArr = (chordForm) => {
    // first convert all note to number
    const chordArr = []
    for (let i = 0; i < chordForm.length; i++) {
        if (i < chordForm.length - 1 && (chordForm[i + 1] == '#' || chordForm[i + 1] == 'b')) {
            chordArr.push(note2Number(chordForm.substr(i, 2)));
            i++;
        }
        else {
            chordArr.push(note2Number(chordForm.substr(i, 1)));
        }
    }

    // then make sure it in ascending order

    let bef = -1;
    for (let [index, val] of chordArr.entries()) {
        if (val < bef) {
            chordArr[index] += 12
        }
        bef = chordArr[index]
    }

    return chordArr
}

const chordArrs = chordForms.map(chordForm => chordForm2chordArr(chordForm))

const generateSingleNoteGroup = () => {
    const noteNumber = randomNumberInRange(NOTE_RANGE)
    return [number2Note(noteNumber)]
}

const generateChordNoteGroup = (name, config) => {
    let chordArr;
    for (let [index, value] of chordSounds.entries()) {
        if (value == name) {
            chordArr = chordArrs[index]
        }
    }
    let ok = false

    let noteNums
    let scaleRange = config.scaleRange.cur
    let curRange = { min: 12 * (scaleRange.min), max: 12 * (scaleRange.max + 1) }
    while (!ok) {

        let startNoteNum = randomNumberInRange(curRange)
        noteNums = chordArr.map(chordNoteNum => {
            return chordNoteNum + startNoteNum;
        })
        ok = true
        for (let [index, value] of noteNums.entries()) {
            // now we do not consdier cases where start and end are not in the same scale, like 11, 13 chord
            if (value > curRange.max || value < curRange.min) {
                ok = false
            }
        }
    }
    console.log(noteNums)
    return noteNums.map(num => number2Note(num))
}

const generateIntervalNoteGroup = (name) => {
    let intervalArr;
    for (let [index, value] of intervalSounds.entries()) {
        if (value == name) {
            intervalArr = [0, index + 1]
        }
    }
    let ok = false
    let noteNums
    while (!ok) {
        let startNoteNum = randomNumberInRange(NOTE_RANGE)
        noteNums = intervalArr.map(noteNum => {
            return noteNum + startNoteNum;
        })
        ok = true
        for (let [index, value] of noteNums.entries()) {
            if (value > NOTE_RANGE.max) {
                ok = false
            }
        }
    }
    return noteNums.map(noteNum => number2Note(noteNum))
}

const generateMelodyNoteGroup = (noteNum) => {

}

// playForm: 1 for melody (seperate), 2 for chord (together), 3 for random of 1 and 2


export const genRandomProblem = (config) => {

    const avaiableSounds = []
    for (let sound of config.sounds) {
        if (sound.playable) avaiableSounds.push(sound)
    }

    const name = randomElement(avaiableSounds).name

    let playNotes = []

    const type = config.type

    let playForm = 2 // default: harmonic

    let playFormName = config.playForm.options[config.playForm.cur]

    if (type == "note") {
        let ok = false
        let scaleNum
        while (!ok) {
            scaleNum = randomNumberInRange(config.scaleRange.cur)
            ok = true
            if (note2Number(name) + 12 * scaleNum > NOTE_RANGE.max) ok = false
        }
        let note = `${name}${scaleNum}`
        playNotes.push(note)
    }
    if (type == 'chord') {
        playNotes = generateChordNoteGroup(name, config)
        if (playFormName == "All Mixed") {
            playFormName = randomElement(["Ascend", "Descend", "Ascend & Descend", "Harmonic"])
        }
        if (playFormName == "Ascend & Descend") {
            playFormName = randomElement(["Ascend", "Descend"])
        }
        if (playFormName == "Ascend") {
            playForm = 1
        }
        if (playFormName == "Descend") {
            playForm = 1
            playNotes = playNotes.reverse()
        }
        if (playFormName == "Harmonic") {
            playForm = 2
        }

    }
    if (type == 'interval') {
        playNotes = generateIntervalNoteGroup(name)
        if (playFormName == "All Mixed") {
            playFormName = randomElement(["Ascend", "Descend", "Ascend & Descend", "Harmonic"])
        }
        if (playFormName == "Ascend & Descend") {
            playFormName = randomElement(["Ascend", "Descend"])
        }
        if (playFormName == "Ascend") {
            playForm = 1
        }
        if (playFormName == "Descend") {
            playForm = 1
            playNotes = playNotes.reverse()
        }
        if (playFormName == "Harmonic") {
            playForm = 2
        }
    }

    // wait till further implement
    if (type == 'melody') {
        playNotes = generateIntervalNoteGroup(name)
        if (playFormName == "Random") {
            // playFormName = randomElement(["Ascend", "Descend", "Ascend & Descend", "Harmonic"])
        }
        if (playFormName == "Ascend") {
            playForm = 1
        }
        if (playFormName == "Descend") {
            playForm = 1
            playNotes = playNotes.reverse()
        }
    }


    let showName = `${name}:${arr2Str(playNotes)}`

    if (type == 'note') showName = playNotes[0]

    const ans = {
        showName: showName,
        playForm: playForm,
        playNotes: playNotes,
        name: name
    }

    return ans
}


export const playWrongSoundWithBase = (problem) => {
    playSoundOnce(["C", "E", "G"].map(t => t + "4"))
}