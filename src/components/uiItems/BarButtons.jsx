import React from "react"
import Button from "antd-button-color"
import { Col, Row, Slider, InputNumber } from 'antd';
import { TitleCen } from "./titleFunc";
import { upFirst } from "../configs/levelTypes";

export const SlideBarRangeProp = ({ config, setConfig, propName, propTitle, sliderStep = 1 }) => {
    let cfg = {
        ...config
    }

    const propChoose = (value) => {

        cfg[propName] = {
            ...cfg[propName],
            cur: {
                min: value[0],
                max: value[1],
            }
        }
        setConfig(cfg)

    }
    return (
        <>
            <TitleCen text={propTitle}></TitleCen>
            <Row justify="center">
                <Col span={12}>
                    <Slider
                        range
                        min={config[propName].min}
                        max={config[propName].max}
                        value={[config[propName].cur.min, config[propName].cur.max]}
                        onChange={propChoose}
                        step={sliderStep}

                    />
                </Col>
                <Col span={2}>
                    <InputNumber
                        min={config[propName].min}
                        max={config[propName].cur.max}
                        style={{ margin: '0 16px', width: 50 }}
                        value={config[propName].cur.min}
                        onChange={(value) => {
                            cfg[propName] = {
                                ...cfg[propName],
                                cur: {
                                    ...cfg[propName].cur,
                                    min: value,
                                }
                            }
                            setConfig(cfg)
                        }}
                        step={sliderStep}
                    />
                    <InputNumber
                        min={config[propName].cur.min}
                        max={config[propName].max}
                        style={{ margin: '0 16px', width: 50 }}
                        value={config[propName].cur.max}
                        onChange={(value) => {
                            cfg[propName] = {
                                ...cfg[propName],
                                cur: {
                                    ...cfg[propName].cur,
                                    max: value,
                                }
                            }
                            setConfig(cfg)
                        }}
                        step={sliderStep}
                    />
                </Col>
            </Row>
        </>
    )
    // return (
    //     <Slider range defaultValue={[20, 50]} disabled={disabled} />
    // )
}

export const SlideBarProp = ({ config, setConfig, propName, propTitle, sliderStep = 1 }) => {
    let cfg = {
        ...config
    }

    const propChoose = (value) => {
        cfg[propName] = {
            ...cfg[propName],
            cur: value
        }
        setConfig(cfg)

    }
    return (
        <>
            <TitleCen text={propTitle}></TitleCen>
            <Row justify="center">
                <Col span={12}>
                    <Slider
                        min={config[propName].min}
                        max={config[propName].max}
                        value={config[propName].cur}
                        onChange={propChoose}
                        step={sliderStep}

                    />
                </Col>
                <Col span={2}>
                    <InputNumber
                        min={config[propName].min}
                        max={config[propName].max}
                        style={{ margin: '0 16px', width: 50 }}
                        value={config[propName].cur}
                        onChange={propChoose}
                        step={sliderStep}
                    />
                </Col>
            </Row>
        </>
    )
}

export const ButtonSelecOne = ({ config, setConfig, propName, propTitle }) => {
    let cfg = {
        ...config
    }

    const handleButtonSelection = (e) => {
        cfg[propName].cur = e.currentTarget.name
        setConfig(cfg)
    }

    return (
        <>
            <TitleCen text={propTitle}></TitleCen>
            <Row justify="center">
                {config[propName].options.map((option, index) => {
                    return (
                        <Col key={`${option} with ${index} in ${config.type}`}>
                            <Button style={{ margin: 10, }} name={index} onClick={handleButtonSelection}
                                type={index == config[propName].cur ? "primary" : "lightdark"}
                            >{upFirst(option)}</Button>
                        </Col>
                    )
                })}

            </Row>
        </>
    )
}

export const ButtonGroupWithFunc = ({ config, setConfig, propName, clickFunc, tagName, disableCtl = false, buttonSize = 200, size = "" }) => {
    const judgeButtonType = (soundInfo, tagName) => {
        if (soundInfo.isCorrect == -1) {
            return soundInfo[tagName] ? "primary" : "default"
        }
        if (soundInfo.isCorrect == 1) return "warning"
        if (soundInfo.isCorrect == 2) return "success"
    }
    return (
        <Row justify="center">
            {config[propName].map((soundInfo, index) => {
                return (
                    <Col key={soundInfo["key"]}>
                        <Button style={{ margin: 10, width: buttonSize, }} id={soundInfo.key}
                            key={soundInfo["key"]} name={soundInfo["name"]}
                            onClick={clickFunc}
                            type={judgeButtonType(soundInfo, tagName)}
                            size={size}
                            // disabled={true}
                            disabled={soundInfo[tagName] ? false : disableCtl}

                        >{soundInfo["name"]}</Button>
                    </Col>
                )
            })}
        </Row>
    )
}
