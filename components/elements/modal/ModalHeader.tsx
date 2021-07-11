import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
type IPropsModalHeader = {
  title?: string;
  onCancel?: () => void;
};
export const ModalHeader: React.FC<IPropsModalHeader> = ({
  title,
  onCancel,
}) => {
  return (
    <div className="modal-header">
      <div className=" items-center justify-between grid grid-cols-6">
        <div className="col-span-3">
          <div className="flex items-center ">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium text-gray-900 leading-6"
            >
              {title}
            </Dialog.Title>
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex items-center justify-end">
            <button className="focus:outline-none" onClick={onCancel}>
              <XIcon className="w-6 h-6 text-gray-900" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
