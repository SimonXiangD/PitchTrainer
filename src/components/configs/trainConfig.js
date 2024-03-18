import { TitleCen } from '../uiItems/titleFunc'
import { intervalSounds, melodySounds, chordSounds, noteSounds } from '../../utils/musicTerms'
import { intervalPlayForms, melodyPlayForms, chordPlayForms, notePlayForms } from '../../utils/musicTerms'
export const generateConfig = (obj) => {

    const { type, soundNames, playForms } = obj

    // speed, interval second of separate sounds
    const speedInit = {
        // min and max for range
        min: 0.1,
        max: 5,
        cur: 1,
    }

    // playForm mode
    const playFormInit = {
        cur: 0,
        options: playForms,
    }

    // prelude mode
    const preludeInit = {
        // usePrelude: false,
        cur: 1,
        options: ["melody", "cadence", "none"]
    }

    // action after choosing wrong ans
    const wrongThenInit = {
        options: ["play wrong note", "silent"],
        cur: 0,
    }

    // action after choosing right ans
    const rightThenInit = {
        options: ["play correct note", "silent"],
        cur: 0,
    }

    // time of note
    const noteBpmInit = {
        min: 0.01,
        max: 10,
        cur: 2,
    }

    const waitIntervalInit = {
        min: 0,
        max: 5,
        cur: 3,
    }

    const scaleRangeInit = {
        min: 0,
        max: 7,
        cur: {
            min: 3,
            max: 4,
        },
    }

    // 0 for unlimited
    const questionNumberInit = {
        min: 0,
        max: 100,
        cur: 20,
    }

    const selectedModeInit = {
        cur: 0,
        options: ["train", "listen", "play"]
    }


    const soundsInit = soundNames.map((soundName, index) => {
        // 12 modes
        return {
            name: soundName,
            playable: true,
            description: `${index + 1} semitones`,
            key: `${type}: ${index + 1}`,
            isCorrect: -1, // -1 for not engaging, 1 for false, 2 for true
        }
    })

    const initConfig = {
        sounds: soundsInit,
        speed: speedInit,
        waitInterval: waitIntervalInit,
        questionNumber: questionNumberInit,

        noteBpm: noteBpmInit,

        wrongThen: wrongThenInit,
        rightThen: rightThenInit,

        playForm: playFormInit,
        prelude: preludeInit,

        scaleRange: scaleRangeInit,

        type: type,

        selectedMode: selectedModeInit,
    }

    return initConfig;
}


export const generateSpecificConfig = (obj) => {

    const { type, soundNames, playForms } = obj

    const playFormInit = {
        cur: 0,
        options: playForms,
    }

    const soundsInit = soundNames.map((soundName, index) => {
        // 12 modes
        return {
            name: soundName,
            playable: true,
            description: `${index + 1} semitones`,
            key: `${type}: ${index + 1}`,
            isCorrect: -1,
        }
    })

    const initConfig = {
        sounds: soundsInit,
        playForm: playFormInit,
        type: type,
    }

    return initConfig;

}

const uniqueProps = {
    "interval": {

    },
    "chord": {

    },
    "note": {

    },
    "melody": {

    }
}


export const initialConfig = generateConfig({ type: "interval", soundNames: intervalSounds, playForms: intervalPlayForms })
export const intervalConfig = generateSpecificConfig({ type: "interval", soundNames: intervalSounds, playForms: intervalPlayForms })
export const chordConfig = generateSpecificConfig({ type: "chord", soundNames: chordSounds, playForms: chordPlayForms })
export const noteConfig = generateSpecificConfig({ type: "note", soundNames: noteSounds, playForms: notePlayForms })
export const melodyConfig = generateSpecificConfig({ type: "melody", soundNames: melodySounds, playForms: melodyPlayForms })

export const alterConfigDifficulty = (spd, preludeUsage, waitTime, diff, diffMap, scaleNum = { min: 4, max: 4 }) => {
    const genConf = (config) => {
        return ({
            ...config,
            speed: {
                ...config.speed,
                cur: spd
            },
            prelude: {
                ...config.prelude,
                cur: preludeUsage,

            },
            waitInterval: {
                ...config.waitInterval,
                cur: waitTime
            },
            sounds:
                config.sounds.map((sound, index) => {
                    return {
                        ...sound,
                        playable: diffMap.get(sound.name) <= diff
                    }
                })
            ,
            scaleRange: {
                ...config.scaleRange,
                cur: scaleNum
            }
        })
    }
    return genConf
}

const diffMap = new Map();
const chordDiff = [1, 1, 2, 1, 1, 2, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3]
const noteDiff = [1, 3, 2, 3, 2, 1, 3, 1, 3, 2, 3, 2]
const melodyDiff = [1, 3, 2, 3, 2, 1, 3, 1, 3, 2, 3, 2]
const intervalDiff = [2, 1, 2, 1, 2, 3, 1, 3, 2, 3, 2, 1]

for (let i = 0; i < 12; i++) {
    diffMap.set(noteSounds[i], noteDiff[i]);
    diffMap.set(melodySounds[i], melodyDiff[i]);
    diffMap.set(intervalSounds[i], intervalDiff[i]);
}

for (let i = 0; i < chordDiff.length; i++) {
    diffMap.set(chordSounds[i], chordDiff[i]);
}


export const easyConfig = alterConfigDifficulty(1, 0, 0, 1, diffMap, { min: 4, max: 4 })
export const mediumConfig = alterConfigDifficulty(2, 1, 2, 2, diffMap, { min: 3, max: 5 })
export const hardConfig = alterConfigDifficulty(0.5, 2, 1, 3, diffMap, { min: 0, max: 7 })


const configMap = new Map();
configMap.set("chord", chordConfig)
configMap.set("interval", intervalConfig)
configMap.set("note", noteConfig)
configMap.set("melody", melodyConfig)

export { configMap }