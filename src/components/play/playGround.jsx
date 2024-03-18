import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Space, Layout, Menu, theme, Typography } from 'antd';
import Button from "antd-button-color";
import { generateSubNavFrom } from '../configs/levelTypes';
import { useContext } from 'react';
import { stopSamplerAll } from '../playSound/playFunction';
import { PLAY_CHOICES, playMap } from '../configs/playConfig';
import { TitleCen } from '../uiItems/titleFunc';
import { PlayConfigComponent } from './playConfigUI';
import { easyConfig, hardConfig, mediumConfig } from '../configs/trainConfig';
import { ConfigContext } from '../globalStates/ConfigContext';
import { PlayCore } from './playCore';


export const playContext = React.createContext(null);

const { Header, Content, Sider } = Layout;
const { Text, Title } = Typography;

export const PlayGround = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [playState, setPlayState] = useState(0)
    const [playProject, setPlayProject] = useState(PLAY_CHOICES[0])

    const { config, setConfig, trainState, setTrainState, progress, setProgress } = useContext(ConfigContext)


    const items2 = generateSubNavFrom((e, choice) => {
        setCollapsed(true);
        setPlayProject(playMap.get(choice))
    }, PLAY_CHOICES);

    const startPlaying = () => {
        stopSamplerAll()
        setPlayState(1)
        console.log(playProject)
    }

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();



    return (
        <playContext.Provider value={{
            playState: playState,
            setPlayState: setPlayState,
        }}>
        <Layout>
            <Layout>
                <Sider
                    trigger={null}
                    collapsible collapsed={collapsed}
                    collapsedWidth={0}
                    width={200}
                    style={{
                        background: colorBgContainer,
                    }}
                >

                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{
                            height: '100%',
                            borderRight: 0,
                        }}
                        items={items2}
                    />
                </Sider>
                <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                >

                    {playState == 0 && <Content
                        style={{

                            padding: 12,
                            marginTop: 20,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        >
                        </Button>
                        

                        <Button type='success' style={{ margin: 5 }} onClick={() => { setConfig(easyConfig(config)) }}  >Easy</Button>
                        <Button type='primary' style={{ margin: 5 }} onClick={() => { setConfig(mediumConfig(config)) }}>Medium </Button>
                        <Button type='info' style={{ margin: 5 }} onClick={() => { setConfig(hardConfig(config)) }} >Hard </Button>
                       
                        {/* <Button type='text' >Master </Button>
                        <Button block type="primary" disabled={true}  ghost style={{whiteSpace: "normal",height:'auto',marginBottom:'10px', }}>Wrap around text</Button> */}

                    </Content>}

                    {playState == 0 && <Content
                        style={{
                            margin: 0,
                            marginTop: 20,
                            padding: 24,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >

                        <Space direction="vertical">
                            {/* <Title level={4}>sfafsdfafdasf</Title> */}
                            <Space direction="vertical">
                                <Text  >Click the icon <MenuUnfoldOutlined /> to choose the mode of playing.</Text>
                                <Text  >Click the difficulty button(Easy, Medium, Hard) to quickly select a difficulty. </Text>
                                <Text  >You can also edit the config parameters separately to customize difficulty.</Text>
                                <Text  >Click the "START" button to go!</Text>
                            </Space>
                        </Space>
                        <Button block type="primary" disabled={false}
                            style={{ whiteSpace: "normal", height: 'auto', minHeight: 50, marginTop: 10, }}
                            onClick={startPlaying}>START</Button>


                    </Content>}




                    {playState == 0 && <PlayConfigComponent></PlayConfigComponent>}

                    {playState == 1 && <PlayCore project={playProject} ></PlayCore>}

                    {/* {playState == 2 && <PlayResult></PlayResult>} */}



                </Layout>
            </Layout>
        </Layout>
        </playContext.Provider>
    );
}