import { Card } from "antd";
import { Bill, BillItem } from "../../model/types.api";
import { HaButton } from "../../components";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { useContext, useState } from "react";
import { AppContext, AppContextType } from "../../context";
import { DeleteBillModal, useDeleteBillModal } from "./DeleteBill/DeleteBillModal";

import "./FinancesPage.scss";

export type TabProps = {
    bills: Bill[];
    openBillDetails: (bill: Bill) => void;
    refreshGrid: () => void;
}

type BillBtnGroupProps = {
    openDetailsTab: () => void;
    openDeleteModal: () => void;
    deleteDisabled: boolean;
}

export const FinancesTab = ({ bills, openBillDetails, refreshGrid }: TabProps) => {
    const { user: { userGuid: loggedUserGuid } } = useContext(AppContext) as AppContextType;
    const [ctaBill, setCtaBill] = useState<Bill | null>();
    const deleteBillModal = useDeleteBillModal();

    deleteBillModal.close = () => {
        setCtaBill(() => null);
        deleteBillModal.close();
    }
    
    return (
        <div className="finances-wrapper">
            <div className="finances-container-card">
                {bills.map((bill) => {
                    const deleteDisabled = loggedUserGuid !== bill.userGuid;
                    return (
                        <Card 
                            className="bill-card"
                            headStyle={{background: "#ffd582", opacity: 0.8, textAlign: "left", paddingLeft: "10%"}}
                            bodyStyle={{background: "rgba(255, 255, 255, 0.8)", textAlign: "left"}}
                            key={bill.billGuid} 
                            title={<Header {...bill} />}
                            extra={
                                <BillBtnGroup 
                                    deleteDisabled={deleteDisabled}
                                    openDeleteModal={() => {
                                        setCtaBill(bill);
                                        deleteBillModal.open()
                                    }} 
                                    openDetailsTab={() => {
                                        setCtaBill(bill);
                                        openBillDetails(bill);
                                    }}
                                />
                            }>
                            {bill.billItems.map(item => <BillListItem {...item} />)}
                        </Card>
                    )
                })}
                {ctaBill && <DeleteBillModal modal={deleteBillModal} bill={ctaBill} refreshGrid={refreshGrid}/>}
            </div>
        </div>
    );
}

const Header = ({name, createDate, total}: Bill) => {
    return (
        <div className="bill-card-header">
            <span className="bill-card-title">{name}</span>
            <span className="bill-card-author">{createDate}</span>
        </div>
    )
}

const BillBtnGroup = ({ openDeleteModal, openDetailsTab, deleteDisabled }: BillBtnGroupProps) => {
    return (
        <div className="ha-btn-group">
            <HaButton 
                variant="positive" 
                icon={<FaRegEdit />} 
                onClick={openDetailsTab} />
            <HaButton 
                variant="negative" 
                icon={<FaRegTrashAlt />} 
                onClick={openDeleteModal} 
                disabled={deleteDisabled}/>
        </div>
    )
}

const BillListItem = ({ name, totalValue }: BillItem) => {
    // todo: consider currency depending on set locale
    return (
        <p>{`* ${name}: ${totalValue.toFixed(2)}$`}</p>
    )
}