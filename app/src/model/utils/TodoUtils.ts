import { Section, Task, TodoListTemplate, ToDoListType } from "../types.api";

function generateSectionWithTasksFromTemplate(sectionTemplate: Section): Section {
    let section = {name: sectionTemplate.name, tasks: [] as Task[]} as Section;
    if (sectionTemplate.tasks && sectionTemplate.tasks.length > 0) {
        sectionTemplate.tasks.forEach(t => {
            section.tasks.push({name: t.name, priority: t.priority, isDone: false} as Task);
        })
    }
    return section;
}

export class TodoUtils {
    public static createTodoListFromTemplate(template: TodoListTemplate): TodoListTemplate | null {
        if (template != null) {
            let todoList = {isFavorite: false, toDoListType: ToDoListType.Normal, sections: [] as Section[]} as TodoListTemplate;
            todoList.name = template.name;
            if (template.sections && template.sections.length > 0) {
                template.sections.forEach(s => {
                    todoList.sections.push(generateSectionWithTasksFromTemplate(s));
                })
            }
            return todoList;
        } else {
            return null;
        }
    }
}