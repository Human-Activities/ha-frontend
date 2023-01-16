import React from 'react';
import { PanelPage } from '../PanelPage';

type TodoListPageProps = {
    isGroup?: boolean;
    guid?: string;
}

export const TodoListPage = ({isGroup, guid}: TodoListPageProps) => {
    return (
        <PanelPage>
            Test
        </PanelPage>
    );
}