import axios from "axios";
import { TodoListTemplate, ToDoListType } from "../model/types.api";
import { RequestStatus } from "../model/utils";

export class TodoListService {
    public static async getTodoLists(groupGuid?: string): Promise<TodoListTemplate[] | null> {
        try {
            const { data } = await axios.get(`https://localhost:7124/api/todolists/get-all/${groupGuid ? groupGuid : ''}`);
            return data as TodoListTemplate[];
        } catch(err: any) {
            return null;
        }
    }

    public static async setFavorite(guid: string, favorite: boolean): Promise<RequestStatus> {
        try {
            await axios.put('https://localhost:7124/api/todolists/set-favourite', {toDoListGuid: guid, isFavorite: favorite});
            return RequestStatus.SUCCESS;
        } catch (err) {
            return RequestStatus.ERROR;
        }
    }

    public static async getTemplates(groupGuid?: string): Promise<TodoListTemplate[] | null> {
        try {
            const { data } = await axios.get(`https://localhost:7124/api/todolists/get-templates/${groupGuid ? groupGuid : ''}`);
            return data as TodoListTemplate[];
        } catch (err) {
            return null;
        }
    }

    public static async setTemplate(guid: string, toDoListType: ToDoListType): Promise<RequestStatus> {
        try {
            await axios.put('https://localhost:7124/api/todolists/set-template', {todoListGuid: guid, toDoListType: toDoListType});
            return RequestStatus.SUCCESS
        } catch(err) {
            return RequestStatus.ERROR;
        }
    }

    public static async createTodoList(todoList: TodoListTemplate): Promise<TodoListTemplate | null> {
        try {
            const {data} = await axios.post('https://localhost:7124/api/todolists/create', todoList);
            return data as TodoListTemplate;
        } catch(err) {
            return null;
        }
    }

    public static async updateTodoList(todoList: TodoListTemplate) {
        try {
            const {data} = await axios.put('https://localhost:7124/api/todolists/edit', todoList);
            return data as TodoListTemplate;
        } catch(err) {
            return null;
        }
    }

    public static async deleteTodoList(guid: string) {
        try {
            await axios.delete(`https://localhost:7124/api/todolists/delete/${guid}`);
            return RequestStatus.SUCCESS;
        } catch (err) {
            return RequestStatus.ERROR;
        }
    }

    public static async getTodoList(guid: string): Promise<TodoListTemplate | null> {
        try {
            const { data } = await axios.get(`https://localhost:7124/api/todolists/get/${guid}`);
            return data as TodoListTemplate;
        } catch(err) {
            return null;
        }
    }
}