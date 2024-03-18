import { Typography } from "antd"
const { Text, Title } = Typography

export const TitleCen = ({text, level=1}) => {
    return (
        <span> <Title level={level} style={{
            textAlign: "center",
            margin: 10,
        }}>{text}</Title> </span>

    )
}