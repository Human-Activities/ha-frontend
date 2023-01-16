import React from "react";
import { AppContext, AppContextType } from "../../context";
import { Group } from "../types.api";
import { PanelSubMenu } from "./Constants";
import { StringUtils } from "./StringUtils";

export type SubMenuLink = {
    key: string | number;
    translate: string;
    path: string;
    active?: boolean;
}

export type MenuItem = {
    key: string | number;
    name: string;
    translate?: string;
    active?: boolean;
    submenuList?: SubMenuLink[];
    click?: () => void;
}

const generateSubMenu = (isGroup: boolean, groupId?: string | number): SubMenuLink[] => {
        return PanelSubMenu.map(key => {
            return {key: `${key}-${groupId}`, translate: StringUtils.capitalizeFirst(key), path: `/${isGroup ? 'groups/' : ''}${key}`};
        })
}

export class MenuUtils {

    public static generateMenuProviderForPanel(groups: Group[], addGroupClick?: () => void): MenuItem[] {
        const defaultKey = 'panel-menu-item'
        const provider: MenuItem[] = [ 
            {key: defaultKey + '-0', name: 'YourPanel', submenuList: generateSubMenu(false, 'user')}
        ];

        groups.forEach(g => 
            provider.push({key: `${defaultKey}-${g.guid}`, name: g.name, submenuList: generateSubMenu(true, g.guid)}));
        
        provider.push({key: defaultKey + '-add', name: '+', translate: 'CreateGroup', click: addGroupClick});

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