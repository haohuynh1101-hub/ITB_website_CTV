import Head from 'next/head';
import classNames from 'classnames';
import { TMenuItem } from './sidebar/MenuItem';
import { SidebarDesktop, SidebarMobile } from './sidebar';
import { useState } from 'react';
import useWindowSize from '@hooks/useWindowSize';
import { Header } from './header';
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

      {isMobileSize && (
        <>
          <SidebarMobile
            menuActiveKey={pageKey}
            menus={menus}
            isOpen={isMobile}
            onClose={handleToggleSidebar}
          />
        </>
      )}

      <SidebarDesktop menus={menus} menuActiveKey={pageKey} />

      <div
        className={classNames(
          'pt-10 transition-all duration-300 md:pl-64 overflow-auto'
        )}
      >
        <main className="p-8">{children}</main>
      </div>
    </>
  );
};
