import * as Tone from "tone"
import { randomElement } from "../../utils/giveTips";
import { noteSounds } from "../../utils/musicTerms";
import { NOTE_RANGE, number2Note } from "./playSpecific";

// Juste quelques tests à partir des docs du site Tone.js ! https://tonejs.github.io/

// PIANO SAMPLER
const sampler = new Tone.Sampler({
    urls: {
        A0: "A0.mp3",
        C1: "C1.mp3",
        "D#1": "Ds1.mp3",
        "F#1": "Fs1.mp3",
        A1: "A1.mp3",
        C2: "C2.mp3",
        "D#2": "Ds2.mp3",
        "F#2": "Fs2.mp3",
        A2: "A2.mp3",
        C3: "C3.mp3",
        "D#3": "Ds3.mp3",
        "F#3": "Fs3.mp3",
        A3: "A3.mp3",
        C4: "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        A4: "A4.mp3",
        C5: "C5.mp3",
        "D#5": "Ds5.mp3",
        "F#5": "Fs5.mp3",
        A5: "A5.mp3",
        C6: "C6.mp3",
        "D#6": "Ds6.mp3",
        "F#6": "Fs6.mp3",
        A6: "A6.mp3",
        C7: "C7.mp3",
        "D#7": "Ds7.mp3",
        "F#7": "Fs7.mp3",
        A7: "A7.mp3",
        C8: "C8.mp3"
    },

    // Cela règle la durée de permanence des notes jouées
    // release: 1,

    // Source locale des sons
    // baseUrl: "./audio/salamander/"

    baseUrl: "https://tonejs.github.io/audio/salamander/"
}).toDestination();
// piano({
//     parent: document.querySelector("#content"),
//     noteon: note => sampler.triggerAttack(note.name),
//     noteoff: note => sampler.triggerRelease(note.name),

// });
// const reverb = new Tone.Reverb(10);
// sampler.chain(reverb, Tone.Destination);

let oneSoundSamplerToReleaseTimeOutIds = []

export const stopSamplerAll = () => {
    for (let pa of oneSoundSamplerToReleaseTimeOutIds) {
        clearTimeout(pa.timeId)
        pa.res()
        // pa.rej("stopped")
        pa.timeId = null
    }
    oneSoundSamplerToReleaseTimeOutIds = []

    sampler.releaseAll()
    // for(let i = NOTE_RANGE.min; i <= NOTE_RANGE.max; i++) {
    // console.log(number2Note(i))
    // sampler.triggerRelease([number2Note(i)], 0)
    // }
    // Tone.Transport.stop()
}

export const playSoundDemo = () => {
    // sampler.triggerAttackRelease(["C4", "E4", "G4"], 10)

    sampler.triggerAttack([randomElement(noteSounds) + "4"], 10)
}

export const playSoundOnce = async (sounds, time) => {
    // const now = Tone.now()
    sampler.triggerAttack(sounds)
    console.log(sounds)
    return new Promise((res, rej) => {
        let timeId = setTimeout(() => {
            sampler.triggerRelease(sounds)
            res()
        }, (time) * 1000)
        oneSoundSamplerToReleaseTimeOutIds.push({ timeId: timeId, rej: rej, res: res })
    })

    // sampler.triggerAttackRelease(sounds, time)
    // sampler.triggerRelease(sounds, time)
}


export const playSoundMulti = async (sounds, time, interval = 1) => {
    let accuTime = 0
    let piList = []
    for (let [index, value] of sounds.entries()) {
        let curTime = accuTime
        let timeoutArr = oneSoundSamplerToReleaseTimeOutIds
        let pi = new Promise((res, rej) => {
            let timeId = setTimeout(() => {
                playSoundOnce(value, time).then(()=>{
                    res()
                })
            }, curTime)
            timeoutArr.push({ timeId: timeId, rej: rej, res: res })

        })
        accuTime += interval * 1000
        piList.push(pi)
    }
    return Promise.all(piList).then(()=>{
        // console.log("1111")
    })
}


const playSingleNote = (note, time) => {
    sampler.triggerAttackRelease([note], time)
}

const chordMap = new Map();


const playChord = (chord, time) => {
    sampler.triggerAttackRelease(chordMap.get(chord), time)
}

const playInterval = (interval, time) => {
    sampler.triggerAttack()
}

const playTypeMap = new Map()

playTypeMap.set("note", playSingleNote)
playTypeMap.set("chord", playChord)
playTypeMap.set("note", playSingleNote)
playTypeMap.set("note", playSingleNote)

