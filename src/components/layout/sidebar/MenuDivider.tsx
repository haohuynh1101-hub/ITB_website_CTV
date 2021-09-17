import classNames from 'classnames';

type IProps = {
  isMargin?: boolean;
};

export const MenuDivider: React.FC<IProps> = ({ isMargin = true }) => {
  return (
    <li>
      <span
        className={classNames('block h-px bg-gray-200', { 'my-2': isMargin })}
      />
    </li>
  );
};
