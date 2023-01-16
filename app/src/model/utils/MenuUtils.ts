import { Group } from "../types.api";
import { PanelSubMenu } from "./Constants";
import { StringUtils } from "./StringUtils";

export type SubMenuLink = {
    key: string | number;
    name: string;
    path: string;
    active?: boolean;
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
            return {key: `${key}-${groupId}`, name: StringUtils.capitalizeFirst(key), path: `/${isGroup ? 'groups/' : ''}${key}`};
        })
}

export class MenuUtils {
    public static generateMenuProviderForPanel(groups: Group[], addGroupClick?: () => void): MenuItem[] {
        const defaultKey = 'panel-menu-item'
        const provider: MenuItem[] = [ 
            {key: defaultKey + '-0', name: 'Your Panel', submenuList: generateSubMenu(false, 'user')}
        ];

        groups.forEach(g => 
            provider.push({key: `${defaultKey}-${g.guid}`, name: g.name, submenuList: generateSubMenu(true, g.guid)}));
        
        provider.push({key: defaultKey + '-add', name: '+', tooltipText: 'Create a new group', click: addGroupClick});

        return provider
    }

    public static isMenuItemInPath(item: MenuItem, path: string): boolean {
        if (item == null) return false;
        if (item.submenuList == null) return false;
        
        return item.submenuList.some(s => path.includes(s.path));
    }

    public static findSubMenuLinkInPath(links: SubMenuLink[], path: string): SubMenuLink | undefined {
        const item = links.find(l => path.includes(l.path));
        return item;
    } 
}