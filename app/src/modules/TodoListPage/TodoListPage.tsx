import React, { useEffect, useState } from 'react';
import { HaButton, HaPageHeader } from '../../components';
import { PanelPage } from '../PanelPage';
import { TodoListPageItem } from './TodoListPageItem';
import './TodoListPage.scss';
import { Dropdown, MenuProps, Space, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { TodoListTemplate, ToDoListType } from '../../model/types.api';
import { TodoListService } from '../../services';
import { useNavigate } from 'react-router-dom';
import { notify, RequestStatus } from '../../model/utils';

type TodoListPageProps = {
    isGroup?: boolean;
    guid?: string;
}

export const TodoListPage = ({isGroup, guid}: TodoListPageProps) => {
    
    const [dataProvider, setDataProvider] = useState<TodoListTemplate[]>([] as TodoListTemplate[]);
    const navigate = useNavigate();

    const getItems = async() => {
        const data = await TodoListService.getTodoLists();
        if (data != null)
        setDataProvider(data);
    }

    const addTodoList = () => {
        navigate("/todo-lists/add");
    }

    useEffect(() => {
        getItems();
    }, []);

    const removeItem = async(toRemove: TodoListTemplate) => {
        if (toRemove) {
            const result = await TodoListService.deleteTodoList(toRemove.toDoListGuid);
            if (result === RequestStatus.SUCCESS) {
                const index = dataProvider.findIndex(t => t.toDoListGuid === toRemove.toDoListGuid);
                if (index != -1) {
                    setDataProvider( prev => {
                        const updatedProvider = [...prev]
                        updatedProvider.splice(index, 1);
                        return updatedProvider;
                    })
                }
            } else {
                notify("error", "Error", "Could not delete selected list");
            }
        }
    }
    
    const setTemplate = async(todoList: TodoListTemplate, type: ToDoListType) => {
        const result = await TodoListService.setTemplate(todoList.toDoListGuid, type);
        if (result === RequestStatus.SUCCESS) {
            todoList.toDoListType = type;
            const index = dataProvider.findIndex(t => t.toDoListGuid === todoList.toDoListGuid);
            if (index != -1) {
                setDataProvider( prev => {
                    const updatedProvider = [...prev];
                    updatedProvider[index] = todoList;
                    return updatedProvider;
                })
            }
        } else {
            notify("error", "Error", "Could not set selected list as a template");
        }
    }

    const setIsFavorite = async(todoList: TodoListTemplate, setFavorite: boolean) => {
        const result = await TodoListService.setFavorite(todoList.toDoListGuid, setFavorite);
        if (result === RequestStatus.SUCCESS) {
            todoList.isFavorite = setFavorite;
        } else {
            notify("error","Error","Could not mark/unmark as favorite");
        }
    }
    
    const editItem = (guid: string) => {
        navigate("/todo-lists/add", {state: {todoListGuid: guid, isEditView: true}});
    }

    const sortList = (key: string, order: string) => {
        const toSort = [...dataProvider];
        switch (key) {
            case 'date':
                toSort.sort((a,b) => {
                    const dateA = new Date(a.createdDate).getDate();
                    const dateB = new Date(b.createdDate).getDate();
                    if (order === 'desc') {
                        if (dateA > dateB) return 1;
                        else if (dateA < dateB) return -1;
                    } else {
                        if (dateA > dateB) return -1;
                        else if (dateA < dateB) return 1;
                    }
                    return 0;
                });
                break;
            case 'name':
                toSort.sort((a,b) => {
                    if (order === 'desc') {
                        if (a.name > b.name) return 1;
                        else if (a.name < b.name) return -1;
                    } else {
                        if (a.name > b.name) return -1;
                        else if (a.name < b.name) return 1;
                    }
                    return 0;
                });
                break;
            case 'favorite':
                toSort.sort((a,b) => {
                    const dateA = new Date(a.createdDate).getDate();
                    const dateB = new Date(b.createdDate).getDate();
                    if (order === 'desc') {
                        if (a.isFavorite && !b.isFavorite) return 1;
                        else if (!a.isFavorite && b.isFavorite) return -1;
                    } else {
                        if (a.isFavorite &&!b.isFavorite) return -1;
                        else if (!a.isFavorite < b.isFavorite) return 1;
                    }
                    return 0;
                });
                break;        
        }
        setDataProvider(toSort);
    }

    return (
        <PanelPage>
            <HaPageHeader title='Todo Lists' toolbar={[<HaButton type='primary' style={{color: 'white'}} key='add-todo' onClick={addTodoList} label='Add new list'/>, <SortDropDown onSelect={sortList} key='sort' />]}/>
            <div className='todo-wrapper ha-scroll'>
                <div className='todos-grid' style={{padding: '1em 4em', gap: '1em'}}>
                    {dataProvider.map(tl => <TodoListPageItem item={tl} key={tl.toDoListGuid} 
                    onSetTemplateClick={setTemplate} onDelete={removeItem} onFavorite={setIsFavorite} onEdit={editItem}/>)}
                </div>
            </div>
        </PanelPage>
    );
}

type DropdownProps = {
    onSelect: (key: string, order: string) => void;
};

const SortDropDown = ({onSelect}: DropdownProps) => {
    const [order, setOrder] = useState<'asc'|'desc'>('asc');
    const [currentKey, setCurrentKey] = useState<string>('');
    const sortKeys: MenuProps['items'] = [
        { key: 'date', label: 'Date'},
        { key: 'name', label: 'Name'},
        { key: 'favorite', label: 'Favorite'}
    ];

    const onItemSelected = (key: string) => {
        onSelect(key, order);
        if (currentKey === key)
            setOrder(order === 'asc' ? 'desc' : 'asc');
        else setOrder('asc');
        setCurrentKey(key);    
    } 

    return (
        <Dropdown trigger={['click']} menu={{items: sortKeys, selectable: true, onClick: ({key}) => onItemSelected(key)}}>
            <Typography.Link>
                <Space>
                    Sort by
                    <DownOutlined/>
                </Space>
            </Typography.Link>
        </Dropdown>
    );
}