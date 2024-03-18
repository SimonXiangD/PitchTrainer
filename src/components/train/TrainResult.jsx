import Button from 'antd-button-color';
import { Content, } from 'antd/es/layout/layout';
import { Row, theme, Col } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { ConfigContext } from '../globalStates/ConfigContext';
import { generateInitProgress } from '../configs/progressConfig';
import { ResultPie } from '../uiItems/ProgressPie';
import { TitleCen } from '../uiItems/titleFunc';
import { commentOnProgressResult, getCorrectRate } from '../../utils/giveTips';
import { ProgressCardList, getProgressInfos } from '../uiItems/TrainCardList';
import { ProgressFigureOneLine } from '../uiItems/ProgressBar';

export const TrainResult = () => {
    const { trainState, setTrainState, progress, setProgress, config, setConfig } = useContext(ConfigContext)

    const restartTrain = () => {
        setProgress(generateInitProgress())
        setTrainState(1)
    }
    const reConfigTrain = () => {
        setTrainState(0)
    }

    const [progressInfos, setProgressInfos] = useState(getProgressInfos(progress, config))

    useEffect(() => {
        setProgressInfos(getProgressInfos(progress, config))
    }, [progress])

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
                <Row justify="center" style={{ marginTop: 0 }}>
                    <Col span={24}>
                        <TitleCen level={3} text={commentOnProgressResult(progress)} ></TitleCen>
                    </Col>


                    <ResultPie rate={getCorrectRate(progress)}></ResultPie>
                    <Col span={24}>
                        <ProgressFigureOneLine right={progress.rightNum} wrong={progress.wrongNum}></ProgressFigureOneLine>

                    </Col>
                    <Button type="primary" style={{ margin: 10 }} block onClick={restartTrain} >Restart</Button>

                    <Button type="info" style={{ margin: 10 }} block onClick={reConfigTrain} >Return to Config Page</Button>

                </Row>
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
                    <Col key="title analysis" span={24}>
                        <TitleCen level={3} text={"Detailed Analysis"} ></TitleCen>

                    </Col>
                    <Col key="correct text comment " span={24}>
                        <TitleCen level={4} text={`You identified ${progress.rightNum} of ${progress.rightNum + progress.wrongNum} correctly, with a rate of ${getCorrectRate(progress)}%!`} ></TitleCen>
                    </Col>
                    <ResultPie rate={getCorrectRate(progress)}></ResultPie>
                    <Col key="correct data points comment " span={24}>
                        <TitleCen level={4} text={`Here are the accuracy analysis for each sound.`} ></TitleCen>
                    </Col>

                    <Col style={{ textAlign: 'center' }} key="correct data points comment button " span={24}>
                        <Button style={{ margin: 5, verticalAlign: 'middle', }} type={"primary"} onClick={() => { setProgressInfos([...progressInfos].reverse()) }}>Reverse display order</Button>

                    </Col>

                    <ProgressCardList progressCardInfos={progressInfos} ></ProgressCardList>


                </Row>
            </Content>

            {/* Result page */}


        </>
    )
}