import React from 'react';
import { Flex, Progress } from 'antd';
import { TitleCen } from './titleFunc';
const twoColors = {
    '0%': '#108ee9',
    '100%': '#87d068',
};
const conicColors = {
    '0%': '#87d068',
    '50%': '#ffe58f',
    '100%': '#ffccc7',
};

export const ProgressBarTrain = ({ progress }) => {
    return (
        <Progress style={{minWidth: 100}} percent={progress} strokeColor={twoColors} />
    )
}

export const ProgressFigureOneLine = ({right, wrong, level=5}) => {
    return (
        <TitleCen level={level} text={`${right} / ${right + wrong}`}></TitleCen>
    )
}