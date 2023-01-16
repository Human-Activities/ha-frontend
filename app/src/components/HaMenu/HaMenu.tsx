import { Avatar, Tooltip } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext, AppContextType } from "../../context";
import { MenuItem, MenuUtils, StringUtils, SubMenuLink } from "../../model/utils";
import { Trans, useTranslation } from 'react-i18next';
import HaButton from "../HaButton";
import './HaMenu.scss';

type HaMenuProps = {
    provider: MenuItem[];
    mode?: 'horizontal' | 'vertical'
    onExpand?: (value: boolean) => void;
}

export const HaMenu = ({ provider, onExpand, mode }: HaMenuProps) => {

    const [selectedItem, setSelectedItem] = useState<MenuItem>({} as MenuItem);
    const [dataProvider, setDataProvider] = useState<MenuItem[]>(provider);
    const [subMenuVisible, setSubMenuVisible] = useState(false);
    const [subMenuMounted, setSubMenuMounted] = useState(false);
    const {t} = useTranslation();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setDataProvider(provider);
    }, [provider])

    useEffect(() => {
        if (provider != null && provider.length > 0) {
            const activeItem = provider.find(i => MenuUtils.isMenuItemInPath(i, location.pathname)) || provider[0];
            if (activeItem != null) {
                activeItem.active = true;
                if (activeItem.submenuList && activeItem.submenuList.length > 0) {
                    const activeLink = MenuUtils.findSubMenuLinkInPath(activeItem.submenuList, location.pathname);
                    if (activeLink == null) { 
                        onSubMenuClick(activeItem.submenuList[0]);
                    } else {
                        activeLink.active = true;
                    }
                }
                setSelectedItem(activeItem);

                if (onExpand) {
                    setSubMenuMounted(true);
                    setSubMenuVisible(true);
                    onExpand(true);
                }
            }
        }
    }, [provider]);

    const onMenuMainItemClick = (menuItem: MenuItem) => {
        if (menuItem.key !== selectedItem.key) {
            menuItem.active = !menuItem.active;
            setSubMenuMounted(true);
        } else {
            setSubMenuMounted(prev => {
                const newMounted = !prev;
                return newMounted;
            });
        }

        if (menuItem.click != null) {
            menuItem.click();
        }

        if (onExpand) {
            if (menuItem.submenuList?.length) {
                if (menuItem.key === selectedItem.key && subMenuVisible) {
                    onExpand(false);
                } else {
                    onExpand(true);
                }
            } else {
                onExpand(false);
                setSubMenuMounted(false);
            }
        }

        if (!subMenuVisible) {
            setSubMenuVisible(true);
        }

        setSelectedItem(prev => {
            if (prev.key !== menuItem.key) {
                prev.active = false;
            }
            return menuItem;
        });

        setDataProvider(prev => {
            const newProv = [...prev];
            const index = newProv.indexOf(menuItem);
            if (index !== -1) {
                newProv[index] = menuItem;
            }
            return newProv;
        });
    }

    const onSubMenuClick = (activeLink: SubMenuLink) => {
        navigate(activeLink.path);
    }

    return (
        <div className='ha-h-flexbox menu-box'>
            <nav className={`${mode === 'horizontal' ? 'ha-h-flexbox' : 'ha-v-flexbox'} align-center main-navbar`}>
                {
                    dataProvider.map(mi => {
                        const shortcut = StringUtils.generateShortcutString(mi.name);
                        return (
                            <Tooltip key={ mi.key } placement="right" title={ mi.translate ? t(mi.translate) : mi.name }>
                                <Avatar className="menu-avatar" size={ 40 } shape={ 'circle' } style={{ verticalAlign:'middle', border: mi.active ? 'solid 1px lightblue' : 'inherit', backgroundColor: mi.active ? 'var(--menu-avatar-hover-bg-color)' : ''}} onClick={() => onMenuMainItemClick(mi)}>
                                    {shortcut}
                                </Avatar>
                            </Tooltip>
                        )
                    })
                }
            </nav>
            {selectedItem != null && selectedItem.submenuList && subMenuVisible &&
            (
            <div className="ha-v-flexbox align-center sublink-menu" 
                style={subMenuMounted ? {'animation':'inAnimation 250ms ease-in'} : {'animation': 'outAnimation 250ms ease-out'}}
                onAnimationEndCapture={(event)=> { if(!subMenuMounted) { event.currentTarget.style.display = 'none'; setSubMenuVisible(false); }}}>
                <Tooltip placement="right" title={selectedItem.translate ? t(selectedItem.translate) : selectedItem.name}>
                    <label className="sublink-label">{selectedItem.name}</label>
                </Tooltip>    
                <nav>
                    {
                        selectedItem.submenuList.map(si => {
                            return <HaButton key={si.key} type="text" style={si.active ? {border: '1px solid white', fontWeight: 700} : {}} onClick={()=> {onSubMenuClick(si)}}>{t(si.translate)}</HaButton>
                        })
                    }
                </nav>
            </div>
            )}
        </div>
    );
}