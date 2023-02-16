import { Card } from "antd";
import { Activity } from "../../model/types.api";
import cx from "classnames";
import { HaButton } from "../../components";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { useContext, useState } from "react";
import { AppContext, AppContextType } from "../../context";
import { DeleteActivityModal, useDeleteActivityModal } from "./DeleteActivity/DeleteActivityModal";

export type TabProps = {
    activities: Activity[];
}

type ActivityBtnGroupProps = {
    cta: () => void;
    openEditModal?: (activity: Activity) => void;
    openDeleteModal: () => void;
}

export const ActivitiesTab = ({ activities }: TabProps) => {
    const { user: { userGuid: loggeduserGuid } } = useContext(AppContext) as AppContextType;
    const [ctaActivity, setCtaActivity] = useState<Activity | null>();
    const deleteActivityModal = useDeleteActivityModal();

    deleteActivityModal.close = () => {
        setCtaActivity(null);
        deleteActivityModal.close();
    }
    
    return (
        <div className="wrapper">
            <div className="activities-container-card">
                {activities.map((activity) => {
                    return (
                        <Card 
                            className="activity-card"
                            headStyle={{background: activity.userGuid === loggeduserGuid ? "#ffd582" : "#ffe1a5", opacity: 0.8, textAlign: "left", paddingLeft: "10%"}}
                            bodyStyle={{background: "rgba(255, 255, 255, 0.8)", textAlign: "left"}}
                            key={activity.guid} 
                            title={<ActivityHeader {...activity} />} 
                            extra={activity.userGuid === loggeduserGuid && <ActivityBtnGroup openDeleteModal={deleteActivityModal.open} cta={() => setCtaActivity(activity)} />} 
                        >
                            <h3 className="activity-card-category">{activity.category.name}</h3>
                            <p className="activity-card-description">{activity.description}</p>
                        </Card>
                    )
                })}
                {ctaActivity && <DeleteActivityModal modal={deleteActivityModal} activity={ctaActivity}/>}
            </div>
        </div>
    );
}

const ActivityHeader = ({title, author, userGuid}: Activity) => {
    const { user: { userGuid: loggeduserGuid } } = useContext(AppContext) as AppContextType;

    return (
        <div className={cx("activity-card-header", userGuid === loggeduserGuid && "current-user-author")}>
            <span className="activity-card-title">{title}</span>
            <span className="activity-card-author">{author}</span>
        </div>
    )
}

const ActivityBtnGroup = ({ cta, openDeleteModal, openEditModal }: ActivityBtnGroupProps) => {
    return (
        <div className="ha-btn-group">
            <HaButton variant="positive" icon={<FaRegEdit />} onClick={() => {}}></HaButton>
            <HaButton 
                variant="negative" 
                icon={<FaRegTrashAlt />} 
                onClick={() => {
                    cta();
                    openDeleteModal();
                }}>
            </HaButton>
        </div>
    )
}