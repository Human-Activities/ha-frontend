import React, { ReactNode, useState } from "react";
import { Layout } from "antd";
import "./PanelPage.scss";
import { SideMenu } from "../../components/HaMenu/SideMenu";

type PanelProps = {
  children?: ReactNode;
};

const { Sider, Content } = Layout;

export const PanelPage = ({ children }: PanelProps) => {
  const [expanded, setExpanded] = useState(false);
  const onExpand = (value: boolean) => setExpanded(value);

  return (
    <Layout style={{ width: "100%", height: "50em" }}>
      <Sider id="sider" className={`ha-v-flexbox ${expanded ? "expanded" : ""}`}>
        <SideMenu onExpand={onExpand} />
      </Sider>
      <Content className="panel-content ha-scroll">{children}</Content>
    </Layout>
  );
};
