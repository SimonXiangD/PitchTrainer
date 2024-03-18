import React, { useContext, useState } from "react"
import { TitleCen } from "../uiItems/titleFunc";
import { upFirst } from "../configs/levelTypes";
import { ConfigContext } from "../globalStates/ConfigContext";
import { SlideBarProp, ButtonGroupWithFunc, ButtonSelecOne, SlideBarRangeProp } from "../uiItems/BarButtons";
import { isMelody } from "../playSound/playSpecific";
import { Content } from "antd/es/layout/layout";
import { theme } from "antd";


const ConfigComponent = () => {
    const { config, setConfig, } = useContext(ConfigContext)
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const soundChoose = (e) => {
        setConfig({
            ...config,
            sounds: config["sounds"].map(soundConfig => {
                if (soundConfig.key !== e.currentTarget.id) return soundConfig;
                return {
                    ...soundConfig,
                    playable: !soundConfig.playable
                }
            })
        })
    }




    return (
        <Content
                        style={{
                            margin: 0,
                            marginTop: 20,
                            padding: 24,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >

            {/* Buttons of Sounds */}

            <TitleCen text={`${upFirst(config.type)} Selection`}></TitleCen>



            <ButtonGroupWithFunc config={config} setConfig={setConfig} propName={"sounds"} disableCtl={false} tagName={"playable"} clickFunc={soundChoose} ></ButtonGroupWithFunc>

            <ButtonSelecOne config={config} setConfig={setConfig} propName={"playForm"} propTitle={"Mode"}></ButtonSelecOne>
            <SlideBarProp config={config} setConfig={setConfig} propName={"questionNumber"} propTitle={"Question number"} sliderStep={5} ></SlideBarProp>
            <SlideBarRangeProp config={config} setConfig={setConfig} propName={"scaleRange"} propTitle={"Scale Range"} ></SlideBarRangeProp>
            <SlideBarProp config={config} setConfig={setConfig} propName={"waitInterval"} propTitle={"Problem Interval"} sliderStep={0.01} ></SlideBarProp>

            {isMelody(config) && <SlideBarProp config={config} setConfig={setConfig} propName={"speed"} propTitle={"Note Interval"} sliderStep={0.01} ></SlideBarProp>}
            <SlideBarProp config={config} setConfig={setConfig} propName={"noteBpm"} propTitle={"Note length"} sliderStep={0.01} ></SlideBarProp>
            <ButtonSelecOne config={config} setConfig={setConfig} propName={"prelude"} propTitle={"Prelude"}></ButtonSelecOne>

            <ButtonSelecOne config={config} setConfig={setConfig} propName={"wrongThen"} propTitle={"Action after wrong"}></ButtonSelecOne>
            <ButtonSelecOne config={config} setConfig={setConfig} propName={"rightThen"} propTitle={"Action after correct"}></ButtonSelecOne>
            {config[""]}
        </Content>
    )
}

export { ConfigComponent }