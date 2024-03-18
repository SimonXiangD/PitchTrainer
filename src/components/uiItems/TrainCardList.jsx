import React from 'react';
import { Col, Row } from 'antd';
import { CardTemp } from './TrainCards';
import { ProgressCard } from './TrainCards';
import { Flex, Progress } from 'antd';
import { Space, Layout, theme, Typography, Modal } from 'antd';

const { Text, Title } = Typography;


export const getProgressInfos = (progress, config) => {
    const resMap = new Map();
    // console.log(progress)
    progress.rightSounds.forEach((value, key, map) => {
        if (!resMap.has(key)) resMap.set(key, { right: 0, wrong: 0 })
        resMap.set(key, { ...resMap.get(key), right: resMap.get(key).right + value })
    })
    progress.wrongSounds.forEach((value, key, map) => {
        if (!resMap.has(key)) resMap.set(key, { right: 0, wrong: 0 })
        resMap.set(key, { ...resMap.get(key), wrong: resMap.get(key).wrong + value })
    })

    const correctRate = (value) => {
        if (value.right + value.wrong == 0) return 0
        return Math.round(value.right * 100 / (value.right + value.wrong))
    }

    const cardInfos = []
    resMap.forEach((value, key, map) => {
        cardInfos.push({
            name: key,
            rate: correctRate(value),
            rightNum: value.right,
            wrongNum: value.wrong,
            allNum: value.right + value.wrong,
        })
    })
    cardInfos.sort((ci2, ci1) => {
        if(ci1.rate == ci2.rate) return ci1.allNum - ci2.allNum;
        return ci1.rate - ci2.rate
    })
    return cardInfos
}


export const ProgressCardList = ({ progressCardInfos }) => {
    return (
        <Row    >
            {
                progressCardInfos.map((progressCardInfo, index) => {
                    return (
                        <Col span={24} key={`progressCardInfo: ${index}`}>
                            <ProgressCard progressCardInfo={progressCardInfo}></ProgressCard>
                        </Col>
                    )
                })
                // <Col span={8}>
                //     <CardTemp {...(cardInfos[0])}></CardTemp>
                // </Col>
            }
        </Row>

    )
}

export const TrainCardList = (cardInfos) => {
    return (
        <Row    >
            {
                cardInfos.map((cardInfo, index) => {
                    return (
                        <Col key={`cardInfo: ${index}`}>
                            <CardTemp {...(cardInfo)}></CardTemp>
                        </Col>
                    )
                })
                // <Col span={8}>
                //     <CardTemp {...(cardInfos[0])}></CardTemp>
                // </Col>
            }
        </Row>

    )
    // const cardLists = cardInfos.map(cardInfo => {
    //     return () => (

    //     )
    // });
    // return (
    //     <Row gutter={16}>
    //         {cardLists}
    //     </Row>
    // )
};

export const RandomCardListNum = ({ num = 5 }) => {
    const cardInfos = Array(num).fill({
        imageUrl: "https://source.unsplash.com/random",
        title: "listtrial",
        description: "just trying"
    })
    return TrainCardList(cardInfos)
}
