import styled from '@emotion/styled';
import classNames from 'classnames';
import React from 'react';

export type ITab = {
  key: string;
  name: string;
};

type ITabProps = {
  tab: ITab;
  isActive?: boolean;
  onClick: (value: string) => void;
};

const S4Tab = styled.div`
  position: relative;
  &:after {
  }
`;

const Tab: React.FC<ITabProps> = ({ tab, isActive, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(tab.key);
    }
  };

  return (
    <S4Tab
      className={classNames(
        'flex items-center font-medium px-4 cursor-pointer transition-colors duration-300 p-1 my-1 rounded',
        {
          'hover:bg-gray-200': !isActive,
          'bg-white shadow z-10': isActive,
        }
      )}
      onClick={handleClick}
      role="menuitem"
      tabIndex={0}
      onKeyPress={handleClick}
    >
      <span>{tab.name}</span>
    </S4Tab>
  );
};

type ITabsProps = {
  tabs: ITab[];
  activeKey: string;
  onChange: (key: string) => void;
};

export const Tabs: React.FC<ITabsProps> = ({ tabs, activeKey, onChange }) => {
  return (
    <div className="inline-flex items-center h-10 px-2 bg-gray-100 shadow-inner divide-x divide-gray-200 rounded-md">
      {tabs.map((tab) => {
        return (
          <Tab
            key={tab.key}
            tab={tab}
            isActive={tab.key === activeKey}
            onClick={onChange}
          />
        );
      })}
    </div>
  );
};
