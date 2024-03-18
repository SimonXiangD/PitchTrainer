import React from 'react';
import { Col, Row, Select, Space, Typography } from 'antd';
import { TitleCen } from './titleFunc';
import { upFirst } from '../configs/levelTypes';
import Button from 'antd-button-color';

const { Text, Title } = Typography;


export const SelectOptions = (data, key, setData, originalWholeData) => {
    return (
        <>
        <Text style={{margin: 5, fontSize: 16}} >{`  ${upFirst(key)}  `}</Text>
        <Select
            key={key}
            defaultValue={data.cur}
            style={{
                width: 100,
                margin: 5,
            }}
            onChange={(value) => { 
                console.log(value); 
                const ansData = {...originalWholeData}
                ansData[key] = {
                    ...data,
                    cur: value
                }
                setData(
                    ansData
                ) }}
            options={data.options.map((t) => {
                return {
                    label: t,
                    value: t,
                }
            })}
        />
        </>
    )
}

export const SelectGroup = ({para, setPara, buttonInfo}) => {
    const datas = {
        ...para
    }
    return (
        <Row >
        {Object.entries(datas).map(([key, data])=>{
            

            console.log(data, key)
            return (
                <Col style={{minWidth: 120}} key={key + "in chord choice"}>
                {SelectOptions(data, key, setPara, para)}
                </Col>
            ) 

        })}
        <Col style={{minWidth: 120, margin: 5}}>
            <Button type={buttonInfo.type} onClick={buttonInfo.clickFunc}>{buttonInfo.name}</Button>
        </Col>
        
        </Row>
    )
}