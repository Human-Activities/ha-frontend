import axios from "axios";
import { ActivityCategory, BillItemCategory } from "../model/types.api";

export async function getActivityCategories(): Promise<ActivityCategory[]> {
    const { data } = await axios.get("https://localhost:7124/api/categories/get-activity-categories")
    return data;
}

export async function getBillItemCategories(): Promise<BillItemCategory[]> {
    const { data } = await axios.get("https://localhost:7124/api/categories/get-bill-item-categories")
    return data;
}