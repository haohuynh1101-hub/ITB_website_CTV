import useWindowSize from '@hooks/useWindowSize';
import ReactDrawer from 'rc-drawer';

interface IProps {
  title?: string;
  subTitle?: string | JSX.Element;
  visible: boolean;
  placement?: 'left' | 'right';
  level?: string;
  width?: string | number;
  onClose: () => void;
  afterVisibleChange?: (visible: boolean) => void;
  footer?: JSX.Element;
  id?: string;
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
      <i className="fas fa-times" />
    </button>
  </div>
);

export const Drawer: React.FC<IProps> = ({
  title,
  subTitle,
  visible,
  children,
  footer,
  onClose,
  afterVisibleChange,
  placement = 'right',
  level,
  width = '50vw',
  id,
}) => {
  const headerHeight = title ? 64 : 0;
  const footerHeight = footer ? 64 : 0;
  const maxHeight = `calc(100vh - ${headerHeight + footerHeight}px)`;

  const props = !level
    ? {
        getContainer: undefined,
      }
    : {};
  const size = useWindowSize();
  const isMobile = size.width < 768;
  return (
    <ReactDrawer
      title={title}
      open={visible}
      onClose={onClose}
      handler={false}
      width={isMobile ? '100vw' : width}
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
      <div className="px-6 py-4 overflow:auto">{children}</div>
      {footer && (
        <div className="flex items-center h-16 px-6 py-4 border-t">
          {footer}
        </div>
      )}
    </ReactDrawer>
  );
};
