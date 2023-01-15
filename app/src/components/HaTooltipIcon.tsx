import { Tooltip } from "antd";
import {QuestionCircleOutlined} from '@ant-design/icons';

type HaTooltipProps = {
    text: string;
}

export const HaTooltipIcon = ({text}: HaTooltipProps) => {
    return (
        <Tooltip placement="right" title={text}>
            <QuestionCircleOutlined/>
        </Tooltip>
    );
}