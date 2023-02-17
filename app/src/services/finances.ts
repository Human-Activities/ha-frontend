import axios from "axios";
import { Bill } from "../model/types.api";
import { CreateBillValues, UpdateBillValues } from "../model/types.app";
import { ApiURL } from "../model/utils";

export async function getUserBills(): Promise<Bill[]> {
    const { data } = await axios.get(`${ApiURL}bills/get-all`);
    return data;

    // const currentUserGuid = localStorage.getItem("userGuid") || "test";
    // return [
    //     { 
    //     guid: "12345-test-5234c-csdc23e2e-ddsvdsfv23d", name: "test bill", 
    //     userGuid: currentUserGuid, total: 242.5, createDate: "2023-01-23", accountBillNumber: 1, 
    //     items: [
    //         { guid: "1231231-12312dsadasd-123fddfd23-12313ccsdc32", author: { name: "test" , userGuid: currentUserGuid}, name: "Clothes", price: 150.5, category: { id: 1, name: "Test"} },
    //         { guid: "1231231-12312dsadasd-45345rfd23-12313ccsdc32", author: { name: "test" , userGuid: currentUserGuid}, name: "Food", price: 50, category: { id: 1, name: "Test"} },
    //         { guid: "1231231-12312dsadasd-123fddfd23-12313ccsdc32", author: { name: "test" , userGuid: currentUserGuid}, name: "Test", price: 42, category: { id: 1, name: "Test"} },
    //     ]
    //     },
    //     { 
    //     guid: "543453234-test-5234c-csdc23e2e-ddsvdsfv23d", name: "test bill 3", 
    //     userGuid: currentUserGuid, total: 25, createDate: "2023-01-27", accountBillNumber: 3, 
    //     items: [
    //         { guid: "1231231-12312dsadasd-123cccccdf-12313ccsdc32", author: { name: "test" , userGuid: currentUserGuid}, name: "Test", price: 2, category: { id: 1, name: "Test"} },
    //         { guid: "1231231-12312dsadasd-313ffdf-12313ccsdc32", author: { name: "test" , userGuid: currentUserGuid}, name: "Drinks", price: 5, category: { id: 1, name: "Test"} },
    //         { guid: "023jo2n-12312dsadasd-f4324rfvfvew2-12313ccsdc32", author: { name: "test" , userGuid: currentUserGuid}, name: "Tickets", price: 3, category: { id: 1, name: "Test"} },
    //         { guid: "9ibsdv-12312dsadasd-f4324rfvfvew2-12313ccsdc32", author: { name: "test" , userGuid: currentUserGuid}, name: "Papers", price: 10, category: { id: 1, name: "Test"} },
    //         { guid: "1231231-dcsdcs-f4324rfvfvew2-12313ccsdc32", author: { name: "test" , userGuid: currentUserGuid}, name: "Testttt", price: 5, category: { id: 1, name: "Test"} },
    //     ]
    //     }
    // ]
}

export async function getGroupBills(groupGuid: string): Promise<Bill[]> {
    const { data } = await axios.get(`${ApiURL}bills/get-all/${groupGuid}`);
    return data;

    // const currentUserGuid = localStorage.getItem("userGuid") || "test";
    // return [
    //     { 
    //     guid: "12345-test-5234c-csdc23e2e-ddsvdsfv23d", name: "test bill", 
    //     userGuid: currentUserGuid, total: 242.5, createDate: "2023-01-23", accountBillNumber: 1, 
    //     groupGuid: "test-12312321-group-guid",
    //     items: [
    //         { guid: "1231231-12312dsadasd-123fddfd23-12313ccsdc32", author: { name: "test" , userGuid: currentUserGuid}, name: "Clothes", price: 150.5, category: { id: 1, name: "Test"} },
    //         { guid: "1231231-12312dsadasd-45345rfd23-12313ccsdc32", author: { name: "test" , userGuid: currentUserGuid}, name: "Food", price: 50, category: { id: 1, name: "Test"} },
    //         { guid: "1231231-12312dsadasd-123fddfd23-12313ccsdc32", author: { name: "test" , userGuid: currentUserGuid}, name: "Test", price: 42, category: { id: 1, name: "Test"} },
    //     ]
    //     },
    //     { 
    //     guid: "543453234-test-5234c-csdc23e2e-ddsvdsfv23d", name: "test bill 2", 
    //     userGuid: currentUserGuid, total: 90, createDate: "2023-01-27", accountBillNumber: 2, 
    //     groupGuid: "test-12312321-group-guid",
    //     items: [
    //         { guid: "1231231-12312dsadasd-123cccccdf-12313ccsdc32", author: { name: "test" , userGuid: "xdd"}, name: "Food", price: 30, category: { id: 1, name: "Test"} },
    //         { guid: "1231231-12312dsadasd-313ffdf-12313ccsdc32", author: { name: "test" , userGuid: currentUserGuid}, name: "Pet food", price: 23, category: { id: 1, name: "Test"} },
    //         { guid: "023jo2n-12312dsadasd-f4324rfvfvew2-12313ccsdc32", author: { name: "test" , userGuid: "dasdassad"}, name: "Tickets", price: 12, category: { id: 1, name: "Test"} },
    //         { guid: "9ibsdv-12312dsadasd-f4324rfvfvew2-12313ccsdc32", author: { name: "test" , userGuid: currentUserGuid}, name: "Papers", price: 10.5, category: { id: 1, name: "Test"} },
    //         { guid: "1231231-dcsdcs-f4324rfvfvew2-12313ccsdc32", author: { name: "test" , userGuid: currentUserGuid}, name: "Paint", price: 14.5, category: { id: 1, name: "Test"} },
    //     ]
    //     },
    //     { 
    //     guid: "543453234-test-5234c-csdc23e2e-ddsvdsfv23d", name: "test bill 3", 
    //     userGuid: "disabled", total: 25, createDate: "2023-01-27", accountBillNumber: 3,
    //     groupGuid: "test-12312321-group-guid", 
    //     items: [
    //         { guid: "1231231-12312dsadasd-123cccccdf-12313ccsdc32", author: { name: "test" , userGuid: currentUserGuid}, name: "Test", price: 2, category: { id: 1, name: "Test"} },
    //         { guid: "1231231-12312dsadasd-313ffdf-12313ccsdc32", author: { name: "test" , userGuid: currentUserGuid}, name: "Drinks", price: 5, category: { id: 1, name: "Test"} },
    //         { guid: "023jo2n-12312dsadasd-f4324rfvfvew2-12313ccsdc32", author: { name: "test" , userGuid: currentUserGuid}, name: "Tickets", price: 3, category: { id: 1, name: "Test"} },
    //         { guid: "9ibsdv-12312dsadasd-f4324rfvfvew2-12313ccsdc32", author: { name: "test" , userGuid: currentUserGuid}, name: "Papers", price: 10, category: { id: 1, name: "Test"} },
    //         { guid: "1231231-dcsdcs-f4324rfvfvew2-12313ccsdc32", author: { name: "test" , userGuid: currentUserGuid}, name: "Testttt", price: 5, category: { id: 1, name: "Test"} },
    //     ]
    //     }
    // ]
}

export async function deleteBill(billGuid: string) {
    const { data } = await axios.delete(`${ApiURL}bills/delete/${billGuid}`);
    return data;
}

export async function createBill(bill: CreateBillValues) {
    //bill.items.forEach(item => item.number = undefined)
    const { data } = await axios.post(`${ApiURL}bills/create`, bill);
    return data;
}

export async function updateBill(bill: UpdateBillValues): Promise<Bill> {
    const { data } = await axios.put(`${ApiURL}bills/edit`, bill);
    return data;
}