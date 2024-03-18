import Button from 'antd-button-color';
import { Space, Layout, theme, Typography, Modal } from 'antd';
import { ButtonGroupWithFunc } from '../uiItems/BarButtons';

import { Outlet } from 'react-router-dom';
import { useContext, useEffect, useState, useRef } from 'react';
import { ConfigContext } from '../globalStates/ConfigContext';
import { TitleCen } from '../uiItems/titleFunc';
import { Col, Row, Slider, InputNumber, Progress } from 'antd';
import { HintModal, ChooseModal } from '../uiItems/HintModal';
import { ProgressBarTrain } from '../uiItems/ProgressBar';
import { playSoundDemo, stopSamplerAll, } from '../playSound/playFunction';
import { genRandomProblem, playWrongSoundWithBase } from '../playSound/playSpecific';
import { playProblem } from '../playSound/playProblem';

const { Header, Content, Sider } = Layout;



const TrainArea = () => {

    const { config, setConfig, trainState, setTrainState, progress, setProgress } = useContext(ConfigContext)

    const endTrain = () => {
        // stopSamplerAll()
        setConfig({
            ...config,
            sounds: config.sounds.map(sound => {
                return {
                    ...sound,
                    isCorrect: -1,
                }
            })
        })
        setTrainState(2)
    }

    const [curProblem, setCurProblem] = useState({})

    // -1 for not answered, 0 for not passed, 1 for passed and waiting for next one
    const [ansStatus, setAnsStatus] = useState(-1)

    const startNewProblem = (currentProgress) => {


        // init buttons and ans status

        setAnsStatus(-1)

        setConfig({
            ...config,
            sounds: config.sounds.map(sound => {
                return {
                    ...sound,
                    isCorrect: -1
                }
            })
        })

        // generate a random problem suited to current config

        setCurProblem(genRandomProblem(config))

        // playsound

    }

    useEffect(() => {
        if (trainState == 1) {
            playCurProblem()

        }
    }, [curProblem])

    const playCurProblem = async (play = true) => {
        // playSoundOnce([curProblem], config)
        if (!play) return
        await playProblem(curProblem, config).then(() => {
            // console.log("")
        })
    }




    const effectRan = useRef(false);

    // onload sound play
    useEffect(() => {
        if (!effectRan.current && !progress.started) {
            startNewProblem(progress)
            setProgress({
                ...progress,
                started: true
            })
        }
        return () => effectRan.current = true;

    }, [])

    useEffect(() => {
        if (ansStatus == 1) {

            playCurProblem(config.rightThen.cur == 0).then(() => {


                if (config.questionNumber.cur && progress.finishedNum >= config.questionNumber.cur - 1) {
                    setTimeout(() => {
                        endTrain()
                    }, 2000)
                    return
                }

                // passing outdated data
                setTimeout(() => {
                    startNewProblem(progress)
                }, config.waitInterval.cur * 1000)


            }).catch((e) => {
                console.log(e)
            })
        }
    }, [ansStatus])

    const correctAns = (sound) => {
        if (ansStatus == -1) {
            setProgress({
                ...progress,
                rightNum: progress.rightNum + 1,
                finishedNum: progress.finishedNum + 1,

                rightSounds: progress.rightSounds.set(sound, (progress.rightSounds.get(sound) ?? 0) + 1),
            })

        }
        else if (ansStatus == 0) {
            setProgress({
                ...progress,
                finishedNum: progress.finishedNum + 1,
            })
        }
        setAnsStatus(1)


    }

    const wrongAns = (soundFalse) => {
        let sound = curProblem.name
        playWrongSoundWithBase(curProblem, soundFalse, config, config.wrongThen.cur == 0).then(() => {
            if (ansStatus == -1) {
                setProgress({
                    ...progress,
                    wrongNum: progress.wrongNum + 1,
                    wrongSounds: progress.wrongSounds.set(sound, (progress.wrongSounds.get(sound) ?? 0) + 1),
                    chosen: true,
                })
                setAnsStatus(0)
            }
        })


    }


    const clickButtonHandler = (e) => {
        const buttonVal = e.currentTarget.name
        if (curProblem.name == buttonVal) {
            setConfig({
                ...config,
                sounds: config.sounds.map(sound => {
                    if (sound.name !== buttonVal) return sound;
                    return {
                        ...sound,
                        isCorrect: 2
                    }
                })
            })
            correctAns(buttonVal)
        }
        else {
            setConfig({
                ...config,
                sounds: config.sounds.map(sound => {
                    if (sound.name !== buttonVal) return sound;
                    return {
                        ...sound,
                        isCorrect: 1
                    }
                })
            })
            wrongAns(buttonVal)
        }
    }


    const replayFuncTrial = () => {
        playCurProblem()
        // endTrain()
        // setProgress({
        //     ...progress,
        //     finishedNum: progress.finishedNum + 1,
        // })
    }


    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <>

            <Content
                style={{
                    margin: 0,
                    marginTop: 20,
                    padding: 24,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <TitleCen level={2} text={ansStatus !== 1 ? "?" : curProblem.showName}></TitleCen>

                <ButtonGroupWithFunc
                    config={config} setConfig={setConfig} propName={"sounds"}
                    disableCtl={true} tagName={"playable"} buttonSize={80}
                    size={'small'}
                    clickFunc={clickButtonHandler}
                ></ButtonGroupWithFunc>

                <Row justify="center" style={{ margin: 20 }}>
                    <Button type='success' style={{ margin: 5 }} onClick={replayFuncTrial}   >Replay</Button>
                    <Button type='lightdark' style={{ margin: 5 }} onClick={() => { stopSamplerAll() }}   >Pause</Button>
                </Row>

                <ProgressBarTrain progress={Math.round(100 * (config.questionNumber.cur ? (progress.finishedNum / config.questionNumber.cur) : 0))} ></ProgressBarTrain>


            </Content>

            <Content
                style={{
                    margin: 0,
                    marginTop: 20,
                    padding: 24,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <Row justify="center" style={{ marginTop: 0 }}>

                    <ChooseModal endFunc={endTrain} buttonType='warning' name="Exit"
                        title='Confirmation' text={"Are you sure to end training now?"}
                    ></ChooseModal>

                    <HintModal></HintModal>


                </Row>
            </Content>

            <Outlet></Outlet>
        </>
    )
}

export default TrainArea;