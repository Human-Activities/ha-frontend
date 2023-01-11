import { Card } from "antd";
import { Activity } from "../../types";
import cx from "classnames";
import { HaButton } from "../../components";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

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
                        headStyle={{background: activity.isCurrentUserAuthor ? "#b1e1ff" : "#f3f3f3", opacity: 0.8, textAlign: "left", paddingLeft: "10%"}}
                        bodyStyle={{background: "rgba(255, 255, 255, 0.8)", textAlign: "left"}}
                        key={i} 
                        title={<ActivityHeader {...activity} />} 
                        extra={activity.isCurrentUserAuthor && <ActivityBtnGroup activity={activity} />} 
                    >
                        <h3 className="activity-card-category">{activity.category}</h3>
                        <p className="activity-card-description">{activity.description}</p>
                        {/* todo rest, body may be ReactNode, so we can generate lists, bills, descriptions, pictures, etc */}
                    </Card>
                )
            })}
        </Card>
    );
}

const ActivityHeader = ({title, author, isCurrentUserAuthor}: Activity) => {
    return (
        <div className={cx("activity-card-header", isCurrentUserAuthor && "current-user-author")}>
            <span className="activity-card-title">{title}</span>
            <span className="activity-card-author">{author}</span>
        </div>
    )
}

const ActivityBtnGroup = ({ activity }: {activity: Activity}) => {
    return (
        <div>
            <HaButton icon={<FaRegEdit />}></HaButton>
            <HaButton icon={<FaRegTrashAlt />}></HaButton>
        </div>
    )
}