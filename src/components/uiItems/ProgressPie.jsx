import React from 'react';
import { Flex, Progress } from 'antd';
const twoColors = {
  '0%': '#108ee9',
  '100%': '#87d068',
};
const conicColors = {
  '0%': '#ffccc7',
  '50%': '#ffe58f',
  '100%': '#87d068',
};

export const ResultPie = ({ rate }) => {
  return (
    <Progress style={{ margin: 5 }} type="circle" percent={rate} strokeColor={conicColors} />
  )
}
