import { Input, InputNumber } from "antd";
import { useCallback, useContext, useEffect, useState } from "react";
import { HaButton, HaSelect } from "../../../components";
import { AiOutlineClose, AiOutlinePlus, AiOutlineClear } from "react-icons/ai";

import "./CreateUpdateBill.scss"
import { BillFormValues, CreateBillItem, CreateBillValues, UpdateBillValues } from "../../../model/types.app";
import { AppContext, AppContextType } from "../../../context";

export type CreateBillProps<T extends BillFormValues> = {
    bill: T;
    updateBill: (values: T) => void;
}

export const CreateBillForm = <T extends BillFormValues, >({ bill, updateBill }: CreateBillProps<T>) => {
    const [values, setValues] = useState<T>(bill);
    const {user: { userGuid }} = useContext(AppContext) as AppContextType;

    useEffect(() => {
        updateBill(values);
    }, [values])

    const addItem = useCallback(() => {
        const i = (values.items?.length ?? 0) + 1;
        setValues({...values, items: [...values.items, { number: i, userGuid } as CreateBillItem]});
    }, [values.items, setValues]);
    
    const removeItem = useCallback((item: CreateBillItem) => {
        setValues(prevState => {
            const items = prevState.items.filter(e => e.number !== item.number)
                .map((e, i) => ({ ...e, number: i + 1 }));
            return { ...prevState, items };
        });
    }, [values.items, setValues]);

    const changeItem = useCallback((item: CreateBillItem) => {
        setValues((prevState) => {
            const items = [...prevState.items];
            const index = items.findIndex(element => element.number == item.number);
            items[index].name = item.name;
            items[index].price = item.price;
            return {...prevState, items}
        });
    }, [values.items, setValues]);

    const changeBillName = useCallback((value: string) => {
        setValues((prevState) => {
            return {...prevState, name: value};
        });
    }, [values.name, setValues]);

    const resetBill = () => {
        setValues((prevState) => {
            return {...prevState, name: "", items: [], categoryGuid: ""};
        });
    }

    return (
        <div className="form-wrapper">
            <BillHeader billName={values.name} billUserGuid={values.userGuid} onAddItem={addItem} resetBill={resetBill} changeBillName={changeBillName}/>
            <hr />
            <BillsListHeader />
            {values.items?.map((item) => {
                return <BillElement key={item.number} item={item} onChange={changeItem} onDelete={removeItem} /> 
            })}
        </div>
    );
}

type BillHeaderProps = {
    onAddItem: () => void;
    resetBill: () => void;
    changeBillName: (value: string) => void;
    billName: string;
    billUserGuid: string;
}

const BillHeader = ({onAddItem, resetBill, changeBillName, billName, billUserGuid}: BillHeaderProps) => {
    const {user: { userGuid }} = useContext(AppContext) as AppContextType;
    const fullEditDisabled = userGuid !== billUserGuid;

    return (
        <div className="bill-header">
            <Input 
                type="text" 
                className="bill-header--name-input"
                value={billName} 
                onChange={(e) => changeBillName(e.target.value)}
                placeholder="Bill name"
                disabled={fullEditDisabled}
            />
            <div className="bill-header--btn-container">
                <HaButton onClick={onAddItem}><AiOutlinePlus /> Add item</HaButton>
                {fullEditDisabled && <HaButton onClick={resetBill}><AiOutlineClear /> Reset</HaButton>}
            </div>
        </div>
    )
}

const BillsListHeader = () => {
    return (
        <div className="bills-header">
            <span>No.</span>
            <span>Name</span>
            <span>Price</span>
        </div>
    )
}

type BillElementProps = {
    item: CreateBillItem;
    onChange: (newItem: CreateBillItem) => void;
    onDelete(item: CreateBillItem): void;
}

const BillElement = ({item, onChange, onDelete}: BillElementProps) => {
    const {user: { userGuid }, appData: { billItemCategories }} = useContext(AppContext) as AppContextType;
    const disabled = userGuid !== item.userGuid;
    return (
        <div className="bill-item">
            <div className="bill-item--number"><span>#{item.number}</span></div>
            <Input 
                className="bill-item--name" 
                type="text" 
                value={item.name} 
                onChange={(e) => onChange({...item, name: e.target.value})}
                disabled={disabled}
                />
            <InputNumber 
                className="bill-item--price"
                controls={false}
                value={item.price || 0}
                onChange={(e) => onChange({...item, price: e || 0})} 
                disabled={disabled}
                />
            <HaSelect 
                disabled={disabled} 
                options={billItemCategories.map(item => ({value: item.id, label: item.name}))} 
                onChange={(value) => onChange({...item, categoryId: value as number})}/>
            {!disabled && (
                <HaButton onClick={() => onDelete(item)} variant="negative" icon={<AiOutlineClose />} />
            )}
        </div>
    )
}