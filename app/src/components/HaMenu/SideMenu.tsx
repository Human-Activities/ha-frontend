import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "antd/es/form/Form";
import { AppContext, AppContextType } from "../../context";
import { Group } from "../../model/types.api";
import { MenuUtils, RequestStatus, notify, ModalFormParams, MenuItem, useModal } from "../../model/utils";
import { GroupService } from "../../services";
import { HaMenu } from "./HaMenu";
import { HaModal } from "../HaModal";
import { CreateGroupForm } from "../../modules/GroupPage";
import { useTranslation } from "react-i18next";

const submenuKeys = ["activities", "todo-lists", "settlements", "events"];
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
    const { status, data } = await GroupService.create(value);
    if (status === RequestStatus.SUCCESS) {
      const { message } = data;
      closeAddGroupModal();
      getGroups();
      notify("success", "Creation successful", message);
    }
  };

  const {
    isOpen: addGroupModalOpen,
    open: showAddGroupModal,
    close: closeAddGroupModal,
    props: addgroupModalProps,
  } = useModal("Create new group", "small", {
    instance: groupFormInstance,
    onFetch: onCreateGroup,
  } as ModalFormParams<Group>);

  const getGroups = useCallback(async () => {
    const { status, data, error } = await GroupService.getGroups();
    if (status === RequestStatus.SUCCESS) {
      setGroups(data || []);
    }
  }, []);

  useEffect(() => {
    getGroups();

    const submenu = submenuKeys.map<SubmenuElement>((key) => {
      const name = t(`submenu.${key}`);
      return { key, name };
    });
    const menu = MenuUtils.generateMenuProviderForPanel(groups, submenu, () => showAddGroupModal());
    setMenuProvider(menu);
  }, [t, getGroups]);

  return (
    <>
      <HaMenu provider={menuProvider} onExpand={onExpand} />
      <HaModal title={""} {...addgroupModalProps} open={addGroupModalOpen}>
        <CreateGroupForm form={groupFormInstance} />
      </HaModal>
    </>
  );
};
