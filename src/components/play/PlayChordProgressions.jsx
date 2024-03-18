import { useState } from "react"
import { CHORD_PROG_INIT_PARAS, generateDataForChordPara, modes, noteSounds } from "../../utils/musicTerms"
import { SelectGroup } from "../uiItems/selectOptions"
import { Button } from "antd"
import { Card, List } from 'antd';
import { v4 } from "uuid";
import { TitleCen } from "../uiItems/titleFunc";

const ChordProgressionUIList = ({data, buttonInfo}) => (
  <List
    grid={{
      gutter: 16,
      xs: 1,
      sm: 2,
      md: 4,
      lg: 4,
      xl: 6,
      xxl: 3,
    }}
    dataSource={data}
    renderItem={(item) => (
      <List.Item style={{margin: 5, }}>
        <Card  style={{textAlign: "center"}} title={item.title}>

          <TitleCen level={4} text={generateDataForChordPara(item)}></TitleCen>
        <Button  type="primary" danger name={item.key} onClick={buttonInfo.clickFunc}>Delete</Button>
        </Card>
      </List.Item>
    )}
  />
)

const info2ChordData = (para) => {
    const info = {...para}
    const key = v4();
    return {info: info, key: key}
}

export const PlayChordProg = () => {
    const [para, setPara] = useState(CHORD_PROG_INIT_PARAS)
    const [chordList, setChordList] = useState([])
    const addListChord = (para) => {
        const newListData = [...chordList, info2ChordData(para)]
        setChordList(newListData)
    }
    const deleteListChord = (e) => {
        const newListData = []
        chordList.forEach((chord)=>{
          if(chord.key != e.currentTarget.name) {
            newListData.push(chord)
          }
        })
        setChordList(newListData)
    }
    return (
        <>
            <SelectGroup para={para} setPara={setPara} buttonInfo={{name: "Add", clickFunc: ()=> addListChord(para), type: "info"}} ></SelectGroup>
            <ChordProgressionUIList data={chordList} configParas={para} buttonInfo={{clickFunc: deleteListChord}}></ChordProgressionUIList>
            <p>Chord progression play...</p>
        </>
    )
}