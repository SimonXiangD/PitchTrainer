import React from 'react';
import { Card, Progress } from 'antd';
import { ProgressFigureOneLine } from './ProgressBar';
const { Meta } = Card;


const DemoCard = () => {
    return (
        <Card
            hoverable
            style={{
                width: 240,
            }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
            <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
    )
}
const DemoCard2 = () => {
    return (
        <Card
            hoverable
            style={{
                width: 240,
            }}
            cover={<img alt="example" src={"https://source.unsplash.com/random"} />}
        >
            <Meta title={"asdf"} description={"asdf"} />
        </Card>
    )
}

const CardTemp = ({ imageUrl, title, description }) => {
    return (
        <Card
            hoverable
            style={{
                maxWidth: 200,
                // width: ,
                // minWidth: 20,
                margin: 20,

            }}
            bordered={true}
            cover={<img alt="example" src={imageUrl} />}
        >
            <Meta title={title} description={description} />
        </Card>
    )

}
// const RandomCard1 = CardTemp({ imageUrl: "https://source.unsplash.com/random", title: "listtrial", description: "just trying" })

// const RandomCard1 = () => { return (<CardTemp title="Rand1" description="A random card" imageUrl="https://source.unsplash.com/random"></CardTemp>) }
const RandomCard1 = () => (<CardTemp {...{ imageUrl: "https://source.unsplash.com/random", title: "listtrial", description: "just trying" }}></CardTemp>)
const RandomCard2 = () => (<CardTemp title="Rand2" description="A random card" imageUrl="https://source.unsplash.com/random"></CardTemp>)
export { RandomCard1, RandomCard2, DemoCard, DemoCard2 }
export { CardTemp }


export const ProgressCard = ({ progressCardInfo}) => {
    return (
        <Card  title={<span style={{textAlign: "center"}}>{progressCardInfo.name}</span>} style={{margin: 5, }} hoverable>
            <Progress style={{minWidth: 200}} percent={progressCardInfo.rate}></Progress>
            <ProgressFigureOneLine level={5} right={progressCardInfo.rightNum} wrong={progressCardInfo.wrongNum}></ProgressFigureOneLine>
            {/* <p>asfasfaasf</p> */}
        
        </Card>
    )
}
