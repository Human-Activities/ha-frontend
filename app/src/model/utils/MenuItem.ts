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