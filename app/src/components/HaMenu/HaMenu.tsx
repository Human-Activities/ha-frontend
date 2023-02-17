import { Avatar, Tooltip } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuItem, MenuUtils, StringUtils, SubMenuLink } from "../../model/utils";
import HaButton from "../HaButton";
import "./HaMenu.scss";

type HaMenuProps = {
  provider: MenuItem[];
  mode?: "horizontal" | "vertical";
  onExpand?: (value: boolean) => void;
};

export const HaMenu = ({ provider, onExpand, mode }: HaMenuProps) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem>({} as MenuItem);
  const [dataProvider, setDataProvider] = useState<MenuItem[]>(provider);
  const [subMenuVisible, setSubMenuVisible] = useState(false);
  const [subMenuMounted, setSubMenuMounted] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setDataProvider(provider);
  }, [provider]);

  useEffect(() => {
    if (provider != null && provider.length > 0) {
      let selected;
      for(let i of provider){
        const isActive = MenuUtils.isMenuItemInPath(i, location.pathname);
        if (isActive != null) {
          if (i.submenuList && i.submenuList.length > 0) {
            const activeLink = MenuUtils.findSubMenuLinkInPath(i.submenuList, location.pathname);
            if (activeLink != null) {
              i.active = true;
              activeLink.active = true;
              selected = i;
              break;
            }
          }
        }
      }
      
      if (selected == null) {
        selected = provider[0];
        if (selected.submenuList && selected.submenuList.length > 0) {
          onSubMenuClick(selected.submenuList[0]);
        }
      }
      setSelectedItem(selected);

      if (onExpand) {
        setSubMenuMounted(true);
        setSubMenuVisible(true);
        onExpand(true);
      }
    }
  }, [provider]);

  const onMenuMainItemClick = (menuItem: MenuItem) => {
    if (menuItem.key !== selectedItem.key) {
      menuItem.active = !menuItem.active;
      setSubMenuMounted(true);
    } else {
      setSubMenuMounted((prev) => {
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

    setSelectedItem((prev) => {
      if (prev.key !== menuItem.key) {
        prev.active = false;
      }
      return menuItem;
    });

    setDataProvider((prev) => {
      const newProv = [...prev];
      const index = newProv.indexOf(menuItem);
      if (index !== -1) {
        newProv[index] = menuItem;
      }
      return newProv;
    });
  };

  const onSubMenuClick = (activeLink: SubMenuLink) => {
    navigate(activeLink.path, {state: {groupGuid: activeLink.groupGuid}});
  };

  return (
    <div className="ha-h-flexbox menu-box">
      <nav className={`${mode === "horizontal" ? "ha-h-flexbox" : "ha-v-flexbox"} align-center main-navbar`}>
        {dataProvider.map((item) => {
          const shortcut = StringUtils.generateShortcutString(item.name);
          return (
            <Tooltip key={item.key} placement="right" title={item.name}>
              <Avatar
                className="menu-avatar"
                size={40}
                shape={"circle"}
                style={{
                  verticalAlign: "middle",
                  border: item.active ? "solid 1px lightblue" : "inherit",
                  backgroundColor: item.active ? "var(--menu-avatar-hover-bg-color)" : "",
                }}
                onClick={() => onMenuMainItemClick(item)}
              >
                {shortcut}
              </Avatar>
            </Tooltip>
          );
        })}
      </nav>
      {selectedItem != null && selectedItem.submenuList && subMenuVisible && (
        <div
          className="ha-v-flexbox align-center sublink-menu"
          style={
            subMenuMounted ? { animation: "inAnimation 250ms ease-in" } : { animation: "outAnimation 250ms ease-out" }
          }
          onAnimationEndCapture={(event) => {
            if (!subMenuMounted) {
              event.currentTarget.style.display = "none";
              setSubMenuVisible(false);
            }
          }}
        >
          <Tooltip placement="right" title={selectedItem.name}>
            <label className="sublink-label">{selectedItem.name}</label>
          </Tooltip>
          <nav>
            {selectedItem.submenuList.map((item) => {
              return (
                <HaButton
                  key={item.key}
                  type="text"
                  style={item.active ? { border: "1px solid white", fontWeight: 700 } : {}}
                  onClick={() => {
                    onSubMenuClick(item);
                  }}
                >
                  {item.name}
                </HaButton>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
};
