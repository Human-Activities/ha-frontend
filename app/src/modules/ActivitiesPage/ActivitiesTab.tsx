import { Card } from "antd";
import React from "react";

// tempporary mock of Activity, declare in type.d.ts
export type Activity = {
    title: string;
    category: string;
    description: string;
    author?: string; // todo as a User/Person type
    createdDate?: Date;
}

export type TabProps = {
    activities: Activity[];
}

export const ActivitiesTab = ({ activities }: TabProps) => {
    return (
        <Card style={{ width: '100%' }}>
            {activities.map((activity, i) => {
                return (
                    <Card key={i} title={activity.title} extra={<p>{activity.category}</p>} style={{ width: '50%'}}>
                        <h3>{activity.description}</h3>
                        {/* todo rest */}
                    </Card>
                )
            })}
        </Card>
    );
}