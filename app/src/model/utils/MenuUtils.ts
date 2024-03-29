import { SubmenuElement } from "../../components/HaMenu/SideMenu";
import { Group } from "../types.api";

export type SubMenuLink = {
  key: string;
  name: string;
  path: string;
  active?: boolean;
  groupGuid?: string;
};

export type MenuItem = {
  key: string;
  name: string;
  active?: boolean;
  submenuList?: SubMenuLink[];
  click?: () => void;
};

// todo: swap current menu with some context-dependent,
// fetch all menu data (groups) and store them in context and local storage to ease access the menu items
// thanks to this we could route by /groups/best-groups-ever/activities
// and then inside the activities component just fetch data by group[name].groupGuid
const generateSubMenu = (menuItems: SubmenuElement[], groupId?: string): SubMenuLink[] => {
  return menuItems.map((item) => ({
    key: `${item.key}-${groupId}`,
    name: item.name,
    groupGuid: groupId,
    path: `/${groupId?.length ? `groups/${groupId}/` : ""}${item.key}`,
  }));
};

export class MenuUtils {
  public static generateMenuProviderForPanel(
    groups: Group[],
    submenuList: SubmenuElement[],
    addGroupClick?: () => void
  ): MenuItem[] {
    const defaultKey = "panel-menu-item";
    const provider: MenuItem[] = [
      { key: defaultKey + "-0", name: "YourPanel", submenuList: generateSubMenu(submenuList) },
    ];

    groups.forEach((g) =>
      provider.push({ 
        key: `${defaultKey}-${g.groupGuid}`, 
        name: g.name, 
        submenuList: generateSubMenu(submenuList, g.groupGuid) 
      })
    );

    provider.push({ key: defaultKey + "-add", name: "+", click: addGroupClick });

    return provider;
  }

  public static isMenuItemInPath(item: MenuItem, path: string): boolean {
    if (item == null) return false;
    if (item.submenuList == null) return false;

    return item.submenuList.some((s) => path.includes(s.path));
  }

  public static findSubMenuLinkInPath(links: SubMenuLink[], path: string): SubMenuLink | undefined {
    const item = links.find((l) => {
      const sliced = path.replace('/add','');
      return sliced === l.path;
    });
    return item;
  }
}
