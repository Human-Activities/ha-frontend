import { GroupTO } from "../TOs";
import { PanelSubMenu } from "./Constants";
import { StringUtils } from "./StringUtils";

export type SubMenuLink = {
    key: string | number;
    name: string;
    path: string;
}

export type MenuItem = {
    key: string | number;
    name: string;
    tooltipText?: string;
    active?: boolean;
    submenuList?: SubMenuLink[];
    click?: () => void;
}

const generateSubMenu = (isGroup: boolean, groupId?: string | number): SubMenuLink[] => {
        return PanelSubMenu.map(key => {
            return {key: `${key}-${groupId}`, name: StringUtils.capitalizeFirst(key), path: `/panel/${isGroup ? 'groups/' : ''}${key}`};
        })
}

export class MenuUtils {
    public static generateMenuProviderForPanel(groups: GroupTO[], addGroupClick?: () => void): MenuItem[] {
        const defaultKey = 'panel-menu-item'
        const provider: MenuItem[] = [ 
            {key: defaultKey + '-0', name: 'Your Panel', submenuList: generateSubMenu(false, 'user')}
        ];

        groups.forEach(g => 
            provider.push({key: `${defaultKey}-${g.id}`, name: g.name, submenuList: generateSubMenu(true, g.id)}));
        
        provider.push({key: defaultKey + '-add', name: '+', tooltipText: 'Create a new group', click: addGroupClick});

        return provider
    }
}