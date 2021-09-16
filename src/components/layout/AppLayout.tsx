import classNames from 'classnames';
import useWindowSize from 'hooks/useWindowSize';
import Head from 'next/head';
import { useState } from 'react';

import { useAppSelector } from '@/hooks';
import { getCSSVar } from '@/utils/cssVar';

import { Header } from './header';
import { SidebarDesktop, SidebarMobile } from './sidebar';
import { TMenuItem } from './sidebar/MenuItem';
type IProps = {
  title: string;
  children: JSX.Element;
  menus: TMenuItem[];
  pageKey: string;
};
export const AppLayout: React.FC<IProps> = ({
  title,
  children,
  menus,
  pageKey,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const handleToggleSidebar = () => {
    setIsMobile((value) => !value);
  };
  const size = useWindowSize();
  const headerHeight = getCSSVar('header-height', '56px');

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Header handleToggleSidebar={handleToggleSidebar} user={user} />
      <div style={{ height: headerHeight }}></div>
      {/* {isMobileSize && (
        <>
          <SidebarMobile
            menuActiveKey={pageKey}
            menus={menus}
            isOpen={isMobile}
            onClose={handleToggleSidebar}
          />
        </>
      )} */}

      <SidebarDesktop menus={menus} menuActiveKey={pageKey} />

      <div className={classNames('transition-all duration-300 xl:pl-sidebar')}>
        <main>{children}</main>
      </div>
    </>
  );
};
