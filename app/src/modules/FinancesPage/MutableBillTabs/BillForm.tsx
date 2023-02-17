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
    }, [values, values.name, values.billItems])

    const addItem = useCallback(() => {
        setValues(prevState => {
            const i = (values.billItems?.length ?? 0) + 1;
            return {...prevState, billItems: [...values.billItems, { number: i, userGuid }]}
        });
    }, [values.billItems, setValues]);
    
    const removeItem = useCallback((item: CreateBillItem) => {
        setValues(prevState => {
            const items = prevState.billItems.filter(e => e.number !== item.number)
                .map((e, i) => ({ ...e, number: i + 1 }));
            return { ...prevState, billItems: items };
        });
    }, [values.billItems, setValues]);

    const changeItem = useCallback((item: CreateBillItem) => {
        setValues((prevState) => {
            const items = [...prevState.billItems];
            const index = items.findIndex(element => element.number == item.number);
            items[index].name = item.name;
            items[index].totalValue = item.totalValue;
            return {...prevState, billItems: items}
        });
    }, [values.billItems, setValues]);

    const changeBillName = useCallback((value: string) => {
        setValues((prevState) => {
            return {...prevState, name: value};
        });
    }, [values.name, setValues]);

    const resetBill = () => {
        setValues((prevState) => {
            return {...prevState, name: "", billItems: [], categoryGuid: ""};
        });
    }

    return (
        <div className="form-wrapper">
            <BillHeader billName={values.name} billUserGuid={values.userGuid} onAddItem={addItem} resetBill={resetBill} changeBillName={changeBillName}/>
            <hr />
            <BillsListHeader />
            {values.billItems?.map((item) => {
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
            <span>Category</span>
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
                value={item.totalValue || 0}
                onChange={(e) => onChange({...item, totalValue: e || 0})} 
                disabled={disabled}
                />
            <HaSelect 
                className="bill-item--category"
                disabled={disabled} 
                options={billItemCategories.map(c => ({value: c.id, label: c.name}))}
                defaultValue={item.categoryId}
                onChange={(value) => {
                    console.log(value);
                    const newItem = item;
                    newItem.categoryId = value as number;
                    onChange(newItem)
                    console.log(item)
                }
                    }/>
            {!disabled && (
                <HaButton onClick={() => onDelete(item)} variant="negative" icon={<AiOutlineClose />} />
            )}
        </div>
    )
}