import { CloseIcon } from 'components';
import { BREAKPOINTS } from 'constants/index';
import useWindowSize from 'hooks/useWindowSize';
import ReactDrawer from 'rc-drawer';
import { useMemo } from 'react';

interface IProps {
  id?: string;
  title?: string;
  subTitle?: string | JSX.Element;
  visible: boolean;
  placement?: 'left' | 'right';
  level?: string;
  width?: string | number;
  onClose: () => void;
  afterVisibleChange?: (visible: boolean) => void;
  footer?: JSX.Element;
  shouldResponsive?: boolean;
}

const Header = ({ title, subTitle, onClose, level }) => (
  <div className="flex flex-row items-center h-16 px-6 py-4 border-b">
    {level && (
      <button
        onClick={onClose}
        className="mr-4 text-gray-300 hover:text-gray-400"
      >
        <i className="fas fa-chevron-left" />
      </button>
    )}
    <div className="flex items-baseline flex-1 space-x-4">
      <h3 className="text-lg font-medium">{title}</h3>
      {subTitle && (
        <div className="flex-1 truncate">
          {typeof subTitle === 'string' ? (
            <span className="text-gray-600">{subTitle}</span>
          ) : (
            <div>{subTitle}</div>
          )}
        </div>
      )}
    </div>
    <button
      className="p-1 text-lg text-gray-300 bg-white rounded-full cursor-pointer hover:text-gray-400 focus:outline-none"
      onClick={onClose}
    >
      <CloseIcon />
    </button>
  </div>
);

export const Drawer: React.FC<IProps> = ({
  id,
  title,
  subTitle,
  visible,
  children,
  footer,
  level,
  placement = 'right',
  width = '768px',
  shouldResponsive = true,
  onClose,
  afterVisibleChange,
}) => {
  const headerHeight = title ? 64 : 0;
  const footerHeight = footer ? 64 : 0;
  const maxHeight = `calc(100vh - ${headerHeight + footerHeight}px)`;
  const windowSize = useWindowSize();

  const drawerWidth = useMemo(() => {
    if (!shouldResponsive) {
      return width;
    }

    if (windowSize.width >= BREAKPOINTS.xl) {
      return width;
    }

    if (windowSize.width >= BREAKPOINTS.md) {
      return 'calc(100vw - 32px)';
    }

    return '100vw';
  }, [shouldResponsive, width, windowSize?.width]);

  const props = !level
    ? {
      getContainer: undefined,
    }
    : {};

  return (
    <ReactDrawer
      title={title}
      open={visible}
      onClose={onClose}
      handler={false}
      width={drawerWidth}
      placement={placement}
      id={id}
      level={level}
      levelMove={32}
      afterVisibleChange={afterVisibleChange}
      {...props}
    >
      {title && (
        <Header
          title={title}
          subTitle={subTitle}
          onClose={onClose}
          level={level}
        />
      )}
      <div
        className="px-6 py-4 overflow-auto overflow-x-hidden"
        style={{ height: maxHeight }}
      >
        {children}
      </div>
      {footer && (
        <div className="flex items-center h-16 px-6 py-4 border-t">
          {footer}
        </div>
      )}
    </ReactDrawer>
  );
};
