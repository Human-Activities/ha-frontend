import { Select } from "antd"
import { DefaultOptionType } from "antd/es/select";

export type HaSelectProps = {
    options: DefaultOptionType[];
    multi?: boolean;
    onChange: (value: string | string[] | number | number[]) => void;
    disabled?: boolean;
    allowClear?: boolean;
}

export const HaSelect = ({
    options, 
    multi, 
    onChange, 
    disabled,
    allowClear,
}: HaSelectProps) => {
    return (
        <Select
            mode={multi ? "multiple" : undefined}
            options={options}
            onChange={(value) => onChange?.(value)}
            filterOption={
                (input, option) => (option?.label?.toString() ?? '').includes(input)}
            disabled={disabled}
            allowClear={allowClear}
            showArrow
         />
    )
}