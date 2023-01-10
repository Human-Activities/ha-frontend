import { Card } from "antd";

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
        <Card className="acticities-container-card">
            {activities.map((activity, i) => {
                return (
                    <Card 
                        className="activity-card"
                        headStyle={{background: "#f7f7f7", opacity: 0.8, textAlign: "left", paddingLeft: "10%"}}
                        bodyStyle={{background: "rgba(255, 255, 255, 0.8)", textAlign: "left"}}
                        key={i} 
                        title={<span className="activity-card-title">{activity.title}</span>} 
                        extra={<span className="activity-card-extra">{activity.category}</span>} 
                    >
                        <h3 className="activity-card-content">{activity.description}</h3>
                        {/* todo rest, body may be ReactNode, so we can generate lists, bills, descriptions, pictures, etc */}
                    </Card>
                )
            })}
        </Card>
    );
}