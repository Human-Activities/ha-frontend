import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "antd/es/form/Form";
import { AppContext, AppContextType } from "../../context";
import { Group } from "../../model/types.api";
import { MenuUtils, RequestStatus, notify, MenuItem, useModal, submenuKeys } from "../../model/utils";
import { GroupService } from "../../services";
import { HaMenu } from "./HaMenu";
import { HaModal } from "../HaModal";
import { CreateGroupForm } from "../../modules/GroupPage";
import { useTranslation } from "react-i18next";

export type SubmenuElement = {
  key: string;
  name: string;
};

type SideMenuProps = {
  onExpand: (value: boolean) => void;
};

export const SideMenu = ({ onExpand }: SideMenuProps) => {
  const { user } = React.useContext(AppContext) as AppContextType;
  const [groups, setGroups] = useState<Group[]>([]);
  const { t } = useTranslation("menus");
  const [menuProvider, setMenuProvider] = useState<MenuItem[]>([]);
  const [groupFormInstance] = useForm();

  const onCreateGroup = async (value: Group) => {
    const result = await GroupService.create(value);
    if (result != null) {
      closeAddGroupModal();
      getGroups().then(val =>
        {
          const submenu = submenuKeys.map<SubmenuElement>((key) => {
            const name = t(`submenu.${key}`);
            return { key, name };
          });
          const menu = MenuUtils.generateMenuProviderForPanel(val, submenu, () => showAddGroupModal());
          setMenuProvider(menu);
      });
      notify("success", "Creation successful", "Group created successfully!");
    }
  };

  const {
    isOpen: addGroupModalOpen,
    open: showAddGroupModal,
    close: closeAddGroupModal,
    props: addgroupModalProps,
  } = useModal({
    title: "Create new group", 
    variant: "small", 
    form: {
      instance: groupFormInstance,
      onFetch: onCreateGroup,
    }
  });

  const getGroups = useCallback(async () => {
    const result = await GroupService.getGroups();
    return result;
  }, []);

  useEffect(() => {
    getGroups().then(val =>
      {
        const submenu = submenuKeys.map<SubmenuElement>((key) => {
          const name = t(`submenu.${key}`);
          return { key, name };
        });
        const menu = MenuUtils.generateMenuProviderForPanel(val, submenu, () => showAddGroupModal());
        setMenuProvider(menu);
  });
  }, [t, getGroups]);

  return (
    <>
      <HaMenu provider={menuProvider} onExpand={onExpand} />
      <HaModal {...addgroupModalProps} open={addGroupModalOpen}>
        <CreateGroupForm form={groupFormInstance} />
      </HaModal>
    </>
  );
};
