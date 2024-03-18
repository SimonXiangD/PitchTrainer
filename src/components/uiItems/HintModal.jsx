
import Button from 'antd-button-color';
import { Space, Layout, theme, Typography, Modal } from 'antd';
import { ButtonGroupWithFunc } from '../uiItems/BarButtons';

import { Outlet } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ConfigContext } from '../globalStates/ConfigContext';
import { TitleCen } from '../uiItems/titleFunc';
import { Col, Row, Slider, InputNumber } from 'antd';
import { randomTip } from '../../utils/giveTips';


const { Header, Content, Sider } = Layout;
const { Text, Title } = Typography;


export const ChooseModal = ({ endFunc, name, buttonType = "primary", title="hint", text }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (<>
        <Button type={buttonType} style={{margin: 5 }} onClick={showModal} >{name}</Button>
        <Modal
            open={isModalOpen}
            title={title}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[

                <Button key="primary" type="primary" onClick={endFunc ? endFunc : handleCancel} > Yes </Button>,
                <Button key="cancel" onClick={handleCancel}> No </Button>,
            ]}
        >
         <p>{text}</p>   
        </Modal>
    </>)
}

export const HintModal = ({ name="Tip", buttonType = "info", title="Tip", text }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (<>
        <Button type={buttonType} style={{margin: 5 }} onClick={showModal} >{name}</Button>
        <Modal
            open={isModalOpen}
            title={title}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[

                <Button key="cancel" type={"primary"} onClick={handleCancel}> Ok </Button>,
            ]}
        >
            <p>{text ? text : randomTip()}</p>
        </Modal>
    </>)
}