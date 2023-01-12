import { Avatar, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItem, StringUtils } from "../../model/utils";
import HaButton from "../HaButton";
import './HaMenu.scss';

type HaMenuProps = {
    provider: MenuItem[];
    defaultSelected?: MenuItem
    mode?: 'horizontal' | 'vertical'
    onExpand?: (value: boolean) => void;
}

export const HaMenu = ({ provider, onExpand, defaultSelected, mode }: HaMenuProps) => {

    const [selectedItem, setSelectedItem] = useState<MenuItem>((defaultSelected ? Object.assign(defaultSelected, {active: true}) : {}) as MenuItem);
    const [dataProvider, setDataProvider] = useState<MenuItem[]>(provider);
    const [subMenuVisible, setSubMenuVisible] = useState(false);
    const [subMenuMounted, setSubMenuMounted] = useState(false);

    const navigate = useNavigate();

    useEffect(() =>{
        if (defaultSelected && defaultSelected.click){
            defaultSelected.click();
        }
    }, [])

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
                if (menuItem.key === selectedItem.key) {
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

    return (
        <div className='ha-h-flexbox menu-box'>
            <nav className={`${mode === 'horizontal' ? 'ha-h-flexbox' : 'ha-v-flexbox'} align-center main-navbar`}>
                {
                    dataProvider.map(mi => {
                        const shortcut = StringUtils.generateShortcutString(mi.name);
                        return (
                            <Tooltip key={ mi.key } placement="right" title={ mi.tooltipText || mi.name }>
                                <Avatar className="menu-avatar" size={ 40 } shape={ 'circle' } style={{ verticalAlign:'middle', border: mi.active ? 'solid 1px lightblue' : ''}} onClick={() => onMenuMainItemClick(mi)}>
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
                onAnimationEnd={()=> { if(!subMenuMounted) setSubMenuVisible(false); }}>
                <Tooltip placement="right" title={selectedItem.tooltipText || selectedItem.name}>
                    <label className="sublink-label">{selectedItem.name}</label>
                </Tooltip>    
                <nav>
                    {
                        selectedItem.submenuList.map(si => {
                            return <HaButton key={si.key} type="text" style={{color: 'white'}} onClick={()=> navigate(si.path)}>{si.name}</HaButton>
                        })
                    }
                </nav>
            </div>
            )}
        </div>
    );
}