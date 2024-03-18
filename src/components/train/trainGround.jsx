import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Space, Layout, Menu, theme, Typography } from 'antd';
import Button from "antd-button-color";
import TrainArea from './trainCore';
import { generateSubNavFrom } from '../configs/levelTypes';
import { useContext } from 'react';
import { ConfigContext } from '../globalStates/ConfigContext';
import { configMap } from '../configs/trainConfig';
import { easyConfig, mediumConfig, hardConfig } from '../configs/trainConfig';
import { ConfigComponent } from './trainConfigUI';
import { TrainResult } from './trainResult';
import { generateInitProgress } from '../configs/progressConfig';
import { stopSamplerAll } from '../playSound/playFunction';


const { Header, Content, Sider } = Layout;
const { Text, Title } = Typography;

const TrainGround = () => {

    const [collapsed, setCollapsed] = useState(true);
    const { config, setConfig, trainState, setTrainState, progress, setProgress } = useContext(ConfigContext)

    const items2 = generateSubNavFrom((e, choice) => {
        setCollapsed(true);
        setConfig({ ...config, ...configMap.get(choice) })
    });

    const startTraining = () => {
        stopSamplerAll()
        setTrainState(1)
        setProgress(generateInitProgress())
    }

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();



    return (
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

                    {trainState == 0 && <Content
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
                        {/* <Button type='text' >Master </Button> */}
                        {/* <Button block type="primary" disabled={true}  ghost style={{whiteSpace: "normal",height:'auto',marginBottom:'10px', }}>Wrap around text</Button> */}

                    </Content>}

                    {trainState == 0 && <Content
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
                                <Text  >Click the icon <MenuUnfoldOutlined /> to choose the mode of training.</Text>
                                <Text  >Click the difficulty button(Easy, Medium, Hard) to quickly select a difficulty. </Text>
                                <Text  >You can also edit the config parameters separately to customize difficulty.</Text>
                                <Text  >Click the "START" button to go!</Text>
                            </Space>
                        </Space>
                        <Button block type="primary" disabled={false}
                            style={{ whiteSpace: "normal", height: 'auto', minHeight: 50, marginTop: 10, }}
                            onClick={startTraining}>START</Button>


                    </Content>}




                    {trainState == 0 && <ConfigComponent></ConfigComponent>}

                    {trainState == 1 && <TrainArea></TrainArea>}

                    {trainState == 2 && <TrainResult></TrainResult>}



                </Layout>
            </Layout>
        </Layout>
    );
};
export default TrainGround;