import { StarOutlined, StarFilled, CaretRightFilled } from "@ant-design/icons";
import { Button, Divider, Tooltip } from "antd";
import { useEffect, useState } from "react";
import cx from 'classnames';
import { Task, TodoListTemplate, ToDoListType } from "../../model/types.api";

type TodoListPageItemProps = {
    item: TodoListTemplate;
    onFavorite?: (todo: TodoListTemplate, favorite: boolean) => void;
    onSetTemplateClick?: (todo: TodoListTemplate, type: ToDoListType) => void;
    onEdit?: (guid: string) => void;
    onDelete?: (todo: TodoListTemplate) => void;
}


export const TodoListPageItem = ({item, onSetTemplateClick, onDelete, onFavorite, onEdit}: TodoListPageItemProps) => {
    const [starHover, setStarHover] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {}, [item.toDoListType])

    const StarButton = () => {
        if (item?.isFavorite) {
            return starHover ? <StarOutlined style={{color: 'yellow', fontSize: '1.5em'}}/> : <StarFilled style={{color: 'yellow', fontSize: '1.5em'}}/>
        } else {
            return starHover ? <StarFilled style={{color: 'yellow', fontSize: '1.5em'}}/> : <StarOutlined style={{color: 'yellow', fontSize: '1.5em'}}/>
        }
    }

    const todoList = () => {
        const tasks = [] as Task[];
        item.sections.forEach(s => {
            const filtered = s.tasks.filter(t => !t.isDone);
            tasks.push(...filtered);
        });
        tasks.sort((a,b) => b.priority - a.priority);
        return tasks;
    }

    const doneTasks = () => {
        const tasks = [] as Task[];
        item.sections.forEach(s => {
            const filtered = s.tasks.filter(t => t.isDone);
            tasks.push(...filtered);
        });
        tasks.sort((a,b) => b.priority - a.priority);
        return tasks;
    }

    return (
        <div className={cx('ha-v-flexbox  list-item', expanded && 'expanded')}>
            <div className={cx('ha-h-flexbox list-item-header',expanded && 'expanded')}>
                <CaretRightFilled rotate={expanded ? 90 : 0} style={{fontSize: '2em'}} onClick={() => setExpanded(!expanded)}/>
                <div className='ha-h-flexbox' style={{gap: '1em'}}>
                    <b>{item.name}</b>
                    <b>Created: {new Date(item?.createdDate)?.toLocaleDateString()}</b>
                </div>
                <div className='ha-h-flexbox item-toolbar'>
                    <div className='ha-h-flexbox'>
                        { item.toDoListType === 1 &&
                            <>
                                <Button type="link" size='small' style={{border: 'none'}} onClick={() => onSetTemplateClick?.(item, ToDoListType.Template)}>Create a template</Button> 
                                <Divider type='vertical'/>
                            </>
                        }
                        { item.toDoListType === 2 &&
                            <>
                                <Button type="link" size='small' style={{border: 'none'}} onClick={() => onSetTemplateClick?.(item, ToDoListType.Normal)}>Delete a template</Button> 
                                <Divider type='vertical'/>
                            </>
                        }
                        <Button type='link' size="small" style={{border: 'none'}} onClick={() => onEdit?.(item.toDoListGuid)}>Edit</Button>
                        <Divider type='vertical'/>
                        <Button type='link' size="small" style={{border: 'none'}} danger onClick={() => onDelete?.(item)}>Delete</Button>
                    </div>
                    <Tooltip title={`${item && item.isFavorite ? 'Unmark as favoutire' : 'Mark as favourite'}`} placement='top'>
                        <div className='star-button' onClick={() => onFavorite?.(item, !item.isFavorite)} onMouseOverCapture={()=> setStarHover(true)} onMouseOutCapture={() => setStarHover(false)}>
                            <StarButton/>
                        </div>
                    </Tooltip>
                </div>
            </div>
            {expanded && 
            <div className="ha-v-flexbox align-center" style={{height: '100%'}}>
                <div className="ha-h-flexbox align-center overview-container">
                    <div className="ha-v-flexbox" style={{width: '50%'}}>
                        <b>TODOs:</b>
                        <ul className="tasks-list">
                            {todoList().map(t => <li>{t.name}</li>)}
                        </ul>
                    </div>
                    <div className="ha-v-flexbox" style={{width: '50%'}}>
                        <b>Done:</b>
                        <ul className="done-list">
                            {doneTasks().map(t => <li>{t.name}</li>)}
                        </ul>
                    </div>
                </div>
                <Button type='link' size='small' style={{margin: '0 auto', border: 'none'}}>View whole list</Button>
            </div>
            }
        </div>
    )
}