import ReactTooltip from 'rc-tooltip';

export type ITooltipPlacement =
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';

type ITrigger = 'hover' | 'click' | 'focus';

type IProps = {
  title: string;
  placement?: ITooltipPlacement;
  trigger?: ITrigger[];
  children?: JSX.Element;
};

export const Tooltip: React.FC<IProps> = ({
  title,
  placement = 'top',
  trigger = ['hover'],
  children,
}) => {
  if (!title) {
    return <>{children}</>;
  }

  return (
    <ReactTooltip
      placement={placement}
      trigger={trigger}
      overlay={<span>{title}</span>}
      overlayStyle={{ zIndex: 99999 }}
      mouseEnterDelay={0.1}
      mouseLeaveDelay={0.1}
    >
      {children}
    </ReactTooltip>
  );
};
