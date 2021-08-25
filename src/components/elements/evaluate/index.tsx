import { DeleteIcon, EditIcon } from '../../icons';

type IProps = {
  title: string;
  owner: string;
};
export const EvaluateItem: React.FC<IProps> = ({ title, owner }) => {
  return (
    <>
      <div className="px-4 py-2 my-4 bg-gray-300 grid grid-cols-5 rounded-md">
        <div className="flex items-center flex-1 col-span-3">
          <span>{title}</span>
        </div>

        <div className="flex items-center justify-end col-span-2 space-y-2">
          <div className="flex flex-col items-center justify-end">
            <span>Nhận xét bởi:</span>
            <span className="font-medium"> {owner}</span>
          </div>

          <div className="flex flex-row-reverse items-center">
            <div>
              <button>
                <DeleteIcon size={20} />
              </button>
            </div>

            <div className="mx-4">
              <button>
                <EditIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
