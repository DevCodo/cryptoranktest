"use client";
import React from "react";
import { Layout, Menu, MenuProps } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled, { createGlobalStyle } from "styled-components";
const { Content, Sider } = Layout;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body, .ant-layout {
    height: 100%;
  }
  `;

const StyledContent = styled(Content)`
  padding: 24px;
`;

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems: MenuProps["items"] = ["converter", "watchlist"].map(
    (item) => {
      return {
        key: item,
        label: <Link href={`/${item}`}>{item}</Link>,
      };
    }
  );

  return (
    <Layout>
      <GlobalStyle />
      <Sider width={200}>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[pathname.slice(1)]}
          triggerSubMenuAction="click"
          items={menuItems}
        />
      </Sider>
      <Layout>
        <StyledContent>{children}</StyledContent>
      </Layout>
    </Layout>
  );
}
