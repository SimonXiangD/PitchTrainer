import { Row, theme } from "antd";
import { Content } from "antd/es/layout/layout"
import { ChooseModal, HintModal } from "../uiItems/HintModal";
import { useContext } from "react";
import { playContext } from "./playGround";
import { Outlet } from "react-router-dom";
import { playMap } from "../configs/playConfig";

export const PlayCore = ({project}) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const {playState, setPlayState} = useContext(playContext)

    const endTrain = () => {
        setPlayState(0)
    }

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
                {playMap.get(project)}
                {/* playMap.get(project) */}
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