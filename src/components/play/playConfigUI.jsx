import React, { useContext, useState } from "react"
import { TitleCen } from "../uiItems/titleFunc";
import { upFirst } from "../configs/levelTypes";
import { ConfigContext } from "../globalStates/ConfigContext";
import { SlideBarProp, ButtonGroupWithFunc, ButtonSelecOne, SlideBarRangeProp } from "../uiItems/BarButtons";
import { isMelody } from "../playSound/playSpecific";
import { theme } from "antd";
import { Content } from "antd/es/layout/layout";

export const PlayConfigComponent = () => {
    const { config, setConfig, } = useContext(ConfigContext)
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
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


            {/* <SlideBarProp config={config} setConfig={setConfig} propName={"questionNumber"} propTitle={"Question number"} sliderStep={5} ></SlideBarProp> */}
            {/* <SlideBarRangeProp config={config} setConfig={setConfig} propName={"scaleRange"} propTitle={"Scale Range"} ></SlideBarRangeProp> */}
            {/* <SlideBarProp config={config} setConfig={setConfig} propName={"waitInterval"} propTitle={"Sound Interval"} sliderStep={0.01} ></SlideBarProp> */}

            {isMelody(config) && <SlideBarProp config={config} setConfig={setConfig} propName={"speed"} propTitle={"Note Interval(Unit 1)"} sliderStep={0.01} ></SlideBarProp>}
            <SlideBarProp config={config} setConfig={setConfig} propName={"noteBpm"} propTitle={"Note length"} sliderStep={0.01} ></SlideBarProp>
            {/* <ButtonSelecOne config={config} setConfig={setConfig} propName={"prelude"} propTitle={"Prelude"}></ButtonSelecOne> */}

            {/* <ButtonSelecOne config={config} setConfig={setConfig} propName={"wrongThen"} propTitle={"Action after wrong"}></ButtonSelecOne> */}
            {/* <ButtonSelecOne config={config} setConfig={setConfig} propName={"rightThen"} propTitle={"Action after correct"}></ButtonSelecOne> */}
            {config[""]}
        </Content>
    )
}