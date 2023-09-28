import dynamic from "next/dynamic";
import useSticky from "@utils/use-sticky";
import React, { useState } from "react";
import { useUI } from "@contexts/ui.context";
import Container from "@components/ui/container";
import Logo from "@components/ui/logo";
import { Drawer } from "@components/common/drawer/drawer";

const AuthMenu = dynamic(() => import("./auth-menu"), { ssr: false });
const MobileMenu = dynamic(() => import("./mobile-menu"), { ssr: false });

const Header = () => {
  const { sticky } = useSticky();
  const { openSidebar, closeSidebar, displaySidebar } = useUI();
  const contentWrapperCSS = { left: 0 };

  function handleMobileMenu() {
    return openSidebar();
  }

  return (
    <>
      <header
        className={`${
          sticky
            ? "header-sticky"
            : "relative py-[8px] border-b border-orange bg-[#f8f6f0]"
        }`}
      >
        <Container className="flex items-center">
          <Logo />

          <AuthMenu />
          <button
            onClick={handleMobileMenu}
            className="btn-orange lg:hidden block ml-auto"
          >
            <i className="icon_menu"></i>
          </button>
        </Container>
      </header>

      <Drawer
        placement="left"
        open={displaySidebar}
        onClose={closeSidebar}
        handler={false}
        showMask={true}
        level={null}
        contentWrapperStyle={contentWrapperCSS}
      >
        <MobileMenu />
      </Drawer>
    </>
  );
};

export default Header;
