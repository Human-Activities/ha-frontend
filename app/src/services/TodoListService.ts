import axios from "axios";
import { TodoListTemplate, ToDoListType } from "../model/types.api";
import { ApiURL, RequestStatus } from "../model/utils";

export class TodoListService {
    public static async getTodoLists(groupGuid?: string): Promise<TodoListTemplate[] | null> {
        try {
            const { data } = await axios.get(`${ApiURL}todolists/get-all/${guid ? guid : ''}`);
            return data as TodoListTemplate[];
        } catch(err: any) {
            return null;
        }
    }

    public static async setFavorite(guid: string, favorite: boolean): Promise<RequestStatus> {
        try {
            await axios.put(`${ApiURL}todolists/set-favourite`, {toDoListGuid: guid, isFavorite: favorite});
            return RequestStatus.SUCCESS;
        } catch (err) {
            return RequestStatus.ERROR;
        }
    }

    public static async getTemplates(groupGuid?: string): Promise<TodoListTemplate[] | null> {
        try {
            const { data } = await axios.get(`${ApiURL}todolists/get-templates/${guid ? guid : ''}`);
            return data as TodoListTemplate[];
        } catch (err) {
            return null;
        }
    }

    public static async setTemplate(guid: string, toDoListType: ToDoListType): Promise<RequestStatus> {
        try {
            await axios.put(`${ApiURL}todolists/set-template`, {todoListGuid: guid, toDoListType: toDoListType});
            return RequestStatus.SUCCESS
        } catch(err) {
            return RequestStatus.ERROR;
        }
    }

    public static async createTodoList(todoList: TodoListTemplate): Promise<TodoListTemplate | null> {
        try {
            const {data} = await axios.post(`${ApiURL}todolists/create`, todoList);
            return data as TodoListTemplate;
        } catch(err) {
            return null;
        }
    }

    public static async updateTodoList(todoList: TodoListTemplate) {
        try {
            const {data} = await axios.put(`${ApiURL}todolists/edit`, todoList);
            return data as TodoListTemplate;
        } catch(err) {
            return null;
        }
    }

    public static async deleteTodoList(guid: string) {
        try {
            await axios.delete(`${ApiURL}todolists/delete/${guid}`);
            return RequestStatus.SUCCESS;
        } catch (err) {
            return RequestStatus.ERROR;
        }
    }

    public static async getTodoList(guid: string): Promise<TodoListTemplate | null> {
        try {
            const { data } = await axios.get(`${ApiURL}todolists/get/${guid}`);
            return data as TodoListTemplate;
        } catch(err) {
            return null;
        }
    }
}