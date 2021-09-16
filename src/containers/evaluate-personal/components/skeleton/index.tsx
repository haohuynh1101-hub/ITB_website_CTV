import classNames from 'classnames';

type IProps = {
  isBorder?: boolean;
};
export const Skeleton: React.FC<IProps> = ({ isBorder = true }) => {
  return (
    <div
      className={classNames('bg-white divide-y animate-pulse', {
        'border rounded-md': isBorder,
      })}
    >
      <div className="p-4">
        <span className="flex w-48 h-4 mr-4 font-medium bg-gray-100 rounded-full animate-pulse" />
      </div>
      <div className="p-4">
        <span className="flex w-40 h-4 mr-4 font-medium bg-gray-100 rounded-full animate-pulse" />
      </div>
      <div className="p-4">
        <span className="flex w-48 h-4 mr-4 font-medium bg-gray-100 rounded-full animate-pulse" />
      </div>
    </div>
  );
};
