import { Header } from "antd/es/layout/layout";
import React, { ReactNode } from "react";
import './HaPageHeader.scss';

type HaPageHeaderProps = {
    title: string;
    toolbar?: ReactNode;
}

export const HaPageHeader = ({title, toolbar}: HaPageHeaderProps) => {
    return (
        <Header className="ha-h-flexbox align-center page-header">
            <h3>{title}</h3>
            <div className="ha-h-flexbox align-center header-toolbar">
            {
                toolbar
            }
            </div>
         </Header>
    )
}

