
import { playSoundOnce, stopSamplerAll, playSoundMulti } from "./playFunction"
import { note2NumberFull } from "./playSpecific"

export const playProblem = async (obj, config) => {
    /*
     const ans = {
            showName: showName,
            playForm: playForm,
            playNotes: playNotes,
        }
    */
    if (obj.playForm == 2) {
        stopSamplerAll()
        await playSoundOnce(obj.playNotes, config.noteBpm.cur)
    }

    if (obj.playForm == 1) {
        // 
        stopSamplerAll()
        const correctSounds = generateSoundsOnConfigMode(obj, config)
        await playSoundMulti(correctSounds, config.noteBpm.cur, config.speed.cur)
    }
    // console.log("asfasfsadfasfsf")

    return 

}

export const generateSoundsOnConfigMode = (obj, config) => {
    // console.log(obj)
    // console.log(config)

    const type = obj.type, originPlayForm = obj.originPlayForm

    let sounds = [], originalNotes = obj.playNotes

    if(originPlayForm == 'Ascend') {
        if(type == "chord" || type == 'note' || type == 'interval') {
            originalNotes.sort(ascCmp)
            sounds = originalNotes.map(t=>[t])

        }
    }

    if(originPlayForm == 'Descend') {
        if(type == "chord" || type == 'note' || type == 'interval') {
            originalNotes.sort(descCmp)
            sounds = originalNotes.map(t=>[t])

        }
    }

    return sounds

}

const ascCmp = (a, b) => {
    return note2NumberFull(a) - note2NumberFull(b)
}

const descCmp = (b, a) => {
    return note2NumberFull(a) - note2NumberFull(b)
}