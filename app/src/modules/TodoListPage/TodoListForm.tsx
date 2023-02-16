import { CloseOutlined } from "@ant-design/icons";
import { Card, Checkbox, Form, FormInstance, Input } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HaButton, HaSelect } from "../../components";
import { Section, Task, TaskPriority, TodoListTemplate, ToDoListType } from "../../model/types.api";
import { notify, TodoUtils } from "../../model/utils";
import { TodoListService } from "../../services";
import { PanelPage } from "../PanelPage";


type TodoListFormProps = {
    todoListGuid?: string;
}


export const TodoListForm = () => {
    const [step, setStep] = useState(1);
    const [templates, setTemplates] = useState<TodoListTemplate[]>([]);
    const [todoList, setTodoList] = useState<TodoListTemplate>({toDoListType: ToDoListType.Normal} as TodoListTemplate);
    const navigate = useNavigate();
    const {state} = useLocation();
    const [selectedTodoListGuid, setSelectedTodoListGuid] = useState<string>(state?.todoListGuid as string);

    const getTemplates = async() => {
        const data = await TodoListService.getTemplates();
        if (data != null && data.length > 0) {
            setTemplates(data);
        }
    } 

    const getTodoList = async() => {
        if (selectedTodoListGuid) {
            const data = await TodoListService.getTodoList(selectedTodoListGuid);
            if (data != null) {
                const isFromTemplate = !state?.isEditView && (data.toDoListType === ToDoListType.Base || data.toDoListType === ToDoListType.Template);
                if (isFromTemplate) {
                    const todoFromTemplate = TodoUtils.createTodoListFromTemplate(data);
                    if (todoFromTemplate) {
                        setTodoList(todoFromTemplate);
                    }
                } else {
                    setTodoList(data);
                }
            }
        }
        setStep(2);
    }

    useEffect(() => {
        if (state == null || state?.todoListGuid == null || state?.todoListGuid?.length === 0) {
            getTemplates();
        } else {
            getTodoList();
        }
    }, []);

    useEffect(() => {}, [todoList]);

    const addSection = useCallback(() => {
        let section = {tasks: [], name: '', sectionGuid: ''};
        let sections: Section[];
        if (todoList.sections) {
            sections = [...todoList.sections];
        } else {
            sections = [];
        }
        sections.unshift(section);
        setTodoList((prev) => {
            const copy = {...prev};
            copy.sections = sections; 
            return copy;
        });
    },[todoList]);

    const addTodo = useCallback((section: Section) => {
        let todo: Task = {priority: TaskPriority.Medium} as Task;
        let todos: Task[] = [...section.tasks, todo];
        section.tasks = todos;
        setTodoList((prev) => {
            const copy = {...prev};
            copy.sections.forEach(s => {
                if (s === section) {
                    s.tasks = todos;
                }
            });
            return copy;
        })
    },[todoList]);

    const deleteSection = useCallback((section: Section) => {
        if (todoList.sections) {
            const index = todoList.sections.indexOf(section);
            if (index != -1) {
                setTodoList((prev) => {
                    const copy = {...prev};
                    copy.sections.splice(index, 1);
                    return copy;
                });
            }
        }
    },[todoList]);

    const deleteTask = useCallback((task: Task, section: Section) => {
        if (section.tasks) {
            const indexOfTask = section.tasks.indexOf(task);
            const indexOfSection = todoList.sections.indexOf(section);
            if (indexOfSection != -1 && indexOfTask != -1) {
                setTodoList((prev) => {
                    const copy = {...prev};
                    section.tasks.splice(indexOfTask,1);
                    copy.sections[indexOfSection] = section;
                    return copy;
                })
            }
        }
    },[todoList]);

    const saveTodoList = async() => {
        if (todoList != null) {
            if (todoList.toDoListGuid != null && todoList.toDoListGuid.length > 0) {
                const result = await TodoListService.updateTodoList(todoList);
                if (result != null) {
                    setTodoList(result);
                    notify("success", "Save succesful", "List was saved successfully")
                    return;
                }
            } else {
                const result = await TodoListService.createTodoList(todoList);
                if (result != null) {
                    setTodoList(result);
                    notify("success", "List created!", "List was created successfully");
                    return;
                }
            }
            notify("error", "Error", "Something went wrong trying to save the list");
        }
    }

    return (
        <PanelPage>
            <div className="ha-v-flexbox align-center">
                {step === 1 && 
                    <div className="form-card ha-v-flexbox align-center" style={{height: '18em', width: '20em', gap: '1em'}}>
                        <div className="ha-v-flexbox align-center" style={{gap: '1em'}}>
                            <label>Select template:</label>
                            <HaSelect 
                                options={templates.map(t => {return {value: t.toDoListGuid, label: t.name}})} 
                                style={{width: '12em'}} 
                                onChange={(value) => setSelectedTodoListGuid(value as string)}/>
                            <HaButton style={{width: '12em'}} label="Use template" onClick={async() => { await getTodoList() }}/>
                        </div>
                        <div className="ha-v-flexbox align-center" style={{gap: '1em'}}>
                            <label>or...</label>
                            <HaButton label="Create new" style={{width: '12em'}} onClick={async() => await getTodoList()}/>
                        </div>
                    </div> 
                }
                {step === 2 &&
                <>
                    <div className="form-card ha-scroll" style={{width: '40em', maxHeight: '36em', padding: '2em', overflow: 'auto'}}>
                        <div className="ha-h-flexbox">
                            <Input bordered={false} placeholder='Todo list title' size={'large'} defaultValue={todoList.name} onChange={(e) => setTodoList((prev) => { prev.name = e.target.value; return prev})}/>
                            <HaButton size='medium' type='primary' onClick={() => addSection()}>+Section</HaButton>
                        </div>
                        {
                            todoList.sections && todoList.sections.map((s,i) => ( 
                                    <div key={s.sectionGuid ?? `section${i}`} style={{padding: 5}}>
                                        <div className="ha-h-flexbox">
                                            <Input bordered={false} size='middle' placeholder="Section title" defaultValue={s.name} onChange={(e)=> s.name = e.target.value} />
                                            <HaButton variant="negative" style={{border: 'none'}} size='small' icon={<CloseOutlined/>} onClick={() => deleteSection(s)}/>
                                        </div>
                                        {
                                            s.tasks && s.tasks.map((t,j) => 
                                            <div key={t.taskGuid ?? `section${i}-task${j}`} className="ha-h-flexbox" style={{width: '100%', margin: '1em 0 1em 1em', gap:'1em'}}>
                                                <Checkbox defaultChecked={t.isDone} onChange={(e) => t.isDone = e.target.checked}>
                                                </Checkbox>
                                                <Input bordered={false} size='small' placeholder="Task name" defaultValue={t.name} onChange={(e) => t.name = e.target.value}/>
                                                <div style={{gap: '1em', width: '15em'}} className="ha-h-flexbox">
                                                    <label>Priority:</label>
                                                    <HaSelect options={[{value: TaskPriority.Low, label: "Low"}, {value: TaskPriority.Medium, label: "Medium"}, {value: TaskPriority.High, label: "High"}]} 
                                                        onChange={(value) => t.priority = value as number} defaultValue={t.priority} 
                                                        style={{
                                                            width: '7em'
                                                        }}/>
                                                    <HaButton style={{border: 'none'}} size='small' variant="negative" icon={<CloseOutlined/>} onClick={() => deleteTask(t,s)}/>
                                                </div>
                                            </div>)
                                        }
                                        <HaButton size='medium' style={{marginTop: '2em'}}  type='primary' onClick={() => addTodo(s)}>+Todo</HaButton>
                                    </div>
                                ))
                        }
                    </div>
                    <div className="ha-h-flexbox" style={{gap: '1em', width: '10em'}}>
                        <HaButton size="large" type='default' label="Cancel" onClick={() => navigate("/todo-lists")} />
                        <HaButton size="large" type='primary' label="Save" onClick={async() => await saveTodoList()}/>
                    </div>
                </>
                }
            </div>
        </PanelPage>
    )
}