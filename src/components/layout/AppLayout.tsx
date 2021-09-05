import classNames from 'classnames';
import useWindowSize from 'hooks/useWindowSize';
import Head from 'next/head';
import { useState } from 'react';

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

  const handleToggleSidebar = () => {
    setIsMobile((value) => !value);
  };
  const size = useWindowSize();
  const isMobileSize = size.width < 768;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Header handleToggleSidebar={handleToggleSidebar} />

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
        <main className="p-8">{children}</main>
      </div>
    </>
  );
};
