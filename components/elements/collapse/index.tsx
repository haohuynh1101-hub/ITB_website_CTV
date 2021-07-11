import React from 'react';
import { Collapse as ReactCollapse } from 'react-collapse';

type IProps = {
  isOpened: boolean;
  children: JSX.Element;
};

export const Collapse: React.FC<IProps> = ({ isOpened, children }) => {
  return <ReactCollapse isOpened={isOpened}>{children}</ReactCollapse>;
};
