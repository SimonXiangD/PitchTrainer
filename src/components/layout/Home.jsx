import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { RandomCard1, RandomCard2, DemoCard, DemoCard2 } from '../uiItems/TrainCards';
import { RandomCardListNum, TrainCardList } from '../uiItems/TrainCardList';

const { Header, Content, Footer } = Layout;
const items = new Array(15).fill(null).map((_, index) => ({
    key: index + 1,
    label: `nav ${index + 1}`,
}));
const HomeComponent = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>

            <Content
                style={{
                    padding: '0 48px',
                }}
            >
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <h1>Welcome to Pitch Perfecter!</h1>
                    <p>This is a place where you can effectively train your listening skills. </p>
                    <p>With constant practice, you will be able to achieve at least relative pitch perfect.</p>

                    <h1>Quickstarts</h1>
                    {/* <RandomCard1></RandomCard1> */}
                    {/* <RandomCard2></RandomCard2> */}
                    {/* <DemoCard></DemoCard> */}
                    <RandomCardListNum num={20}></RandomCardListNum>
                </div>
            </Content>
        </Layout>
    );
};
export default HomeComponent;