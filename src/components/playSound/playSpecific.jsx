import { randomElement, randomNumberInRange, getRandomIntInclusive } from "../../utils/giveTips"
import { intervalSounds, noteSounds, chordSounds, chordForms } from "../../utils/musicTerms"
import { playProblem } from "./playProblem"
import { playSoundOnce } from "./playFunction"
import { chordArrs } from "../../utils/musicTerms"

export const NOTE_RANGE = { min: 0, max: 96 }

const arr2Str = (arr) => {
    let ans = ""
    for (let i = 0; i < arr.length; i++) {
        ans += " "
        ans += arr[i]
    }
    return ans
}

// 0 for C0, 12 for C1, ... 96 for C8(max)
export const number2Note = (num, needNum = true) => {
    let scale = Math.floor(num / 12), note = num % 12;
    if(!needNum) return noteSounds[note]
    return noteSounds[note] + scale;
}

export const note2Number = (note) => {
    for (let [index, val] of noteSounds.entries()) {
        if (note == val) return index
    }
}


export const note2NumberFull = (note) => {
    let nt = note.substr(0, note.length-1)
    for (let [index, val] of noteSounds.entries()) {
        if (nt == val) return index + 12 * parseInt(note[note.length-1])
    }
}

export const chordForm2chordArr = (chordForm) => {
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


const generateSingleNoteGroup = () => {
    const noteNumber = randomNumberInRange(NOTE_RANGE)
    return [number2Note(noteNumber)]
}

const findChordArr = (name) => {
    let chordArr;
    for (let [index, value] of chordSounds.entries()) {
        if (value == name) {
            chordArr = chordArrs[index]
        }
    }
    return chordArr
}

const generateChordNoteGroup = (name, config) => {
    let chordArr = findChordArr(name)
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
    return { noteNums: noteNums, playNotes: noteNums.map(num => number2Note(num)) }
}

const findIntervalArr = (name) => {
    let intervalArr;
    for (let [index, value] of intervalSounds.entries()) {
        if (value == name) {
            intervalArr = [0, index + 1]
        }
    }
    return intervalArr
}

const generateIntervalNoteGroup = (name, config) => {
    let intervalArr = findIntervalArr(name)
    let ok = false
    let noteNums
    let scaleRange = config.scaleRange.cur
    let curRange = { min: 12 * (scaleRange.min), max: 12 * (scaleRange.max + 1) }

    while (!ok) {
        let startNoteNum = randomNumberInRange(curRange)
        noteNums = intervalArr.map(noteNum => {
            return noteNum + startNoteNum;
        })
        ok = true
        for (let [index, value] of noteNums.entries()) {
            if (value > curRange.max || value < curRange.min) {
                ok = false
            }
        }
    }
    return { noteNums: noteNums, playNotes: noteNums.map(num => number2Note(num)) }
}

const generateMelodyNoteGroup = (noteNum, config) => {

}


export const genFalseProblem = (problem, falseName, config) => {
    const type = problem.type
    const name = problem.name

    if (type == "note") {
        let diff = note2Number(falseName) - note2Number(name)
        let falseNoteNum = problem.noteNums[0] + diff
        if (falseNoteNum < NOTE_RANGE.min) falseNoteNum += 12
        else if (falseNoteNum > NOTE_RANGE.max) falseNoteNum -= 12
        return {
            ...problem,
            playNotes: [number2Note(falseNoteNum)],
            noteNums: [falseNoteNum],
        }
    }

    if (type == 'chord') {
        let falseChordArr = findChordArr(falseName)
        let startNote = problem.noteNums[0]
        let newArr = falseChordArr.map(num => num + startNote)

        // maybe will trigger bug if 0, 100 cases happen
        while (newArr[newArr.length - 1] > NOTE_RANGE.max) {
            for (let i = 0; i < newArr.length; i++) {
                newArr[i] -= 12
            }
        }

        return {
            ...problem,
            playNotes: newArr.map(num => number2Note(num)),
            noteNums: newArr,
        }
    }

    if (type == 'interval') {
        let falseIntervalArr = findIntervalArr(falseName)
        let startNote = problem.noteNums[0]
        let newArr = falseIntervalArr.map(num => num + startNote)

        // maybe will trigger bug if 0, 100 cases happen
        while (newArr[newArr.length - 1] > NOTE_RANGE.max) {
            for (let i = 0; i < newArr.length; i++) {
                newArr[i] -= 12
            }
        }

        return {
            ...problem,
            playNotes: newArr.map(num => number2Note(num)),
            noteNums: newArr,
        }
    }

}

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

    let noteNums

    let mayContainMelody = false

    if (type == "note") {
        let ok = false
        let scaleNum
        while (!ok) {
            scaleNum = randomNumberInRange(config.scaleRange.cur)
            ok = true
            if (note2Number(name) + 12 * scaleNum > NOTE_RANGE.max) ok = false
        }
        let note = `${name}${scaleNum}`
        noteNums = [scaleNum * 12 + note2Number(name)]
        playNotes.push(note)
    }
    if (type == 'chord') {
        let tmpVal = generateChordNoteGroup(name, config)
        playNotes = tmpVal.playNotes
        noteNums = tmpVal.noteNums
        if (playFormName == "All Mixed") {
            mayContainMelody = true
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
            // playNotes = playNotes.reverse()
        }
        if (playFormName == "Harmonic") {
            playForm = 2
        }

    }
    if (type == 'interval') {
        let tmpVal = generateIntervalNoteGroup(name, config)
        playNotes = tmpVal.playNotes
        noteNums = tmpVal.noteNums
        if (playFormName == "All Mixed") {
            mayContainMelody = true
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
            // playNotes = playNotes.reverse()
        }
        if (playFormName == "Harmonic") {
            playForm = 2
        }
    }

    // wait till further implement
    if (type == 'melody') {
        mayContainMelody = true
        playNotes = generateMelodyNoteGroup(name, config)
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
        originPlayForm: playFormName,
        noteNums: noteNums,
        name: name,
        type: type,
        mayContainMelody: mayContainMelody,
    }

    return ans
}


export const playWrongSoundWithBase = async (problem, soundFalse, config, play) => {
    if(!play) return
    let falseProblem = genFalseProblem(problem, soundFalse, config)
    await playProblem(falseProblem, config)
    return
    // playSoundOnce(["C", "E", "G"].map(t => t + "4")) 
}


export const isMelody = (config) => {

    // playForm: 1 for melody (seperate), 2 for chord (together), 3 for random of 1 and 2
    let problemOfConfig = genRandomProblem(config)
    return problemOfConfig.mayContainMelody || problemOfConfig.playForm == 1
}