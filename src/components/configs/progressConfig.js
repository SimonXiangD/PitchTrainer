export const generateInitProgress = () => {
    return {
        rightNum: 0,
        wrongNum: 0,
        finishedNum: 0,
        rightSounds: new Map(),
        wrongSounds: new Map(),
        started: 0,
    }
}
