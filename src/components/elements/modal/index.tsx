import { Dialog, Transition } from '@headlessui/react';
import useWindowSize from 'hooks/useWindowSize';
import React, { Fragment, useRef } from 'react';

import { ModalHeader } from './ModalHeader';

type IProps = {
  visible: boolean;
  children?: React.ReactNode;
  title?: string;
  footer?: JSX.Element;
  onCancel: () => void;
  onOk?: () => void;
};
const Modal: React.FC<IProps> = ({
  visible = false,
  children,
  title = 'Basic Modal',
  onCancel,
  footer,
}) => {
  const cancelButtonRef = useRef(null);
  const size = useWindowSize();
  const isMobile = size.width < 786;

  return (
    <Transition.Root show={visible} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={visible}
        onClose={onCancel}
      >
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              style={isMobile ? { minWidth: '360px' } : { width: '786px' }}
              className="modal"
            >
              {/* header */}
              <ModalHeader title={title} onCancel={onCancel} />
              {/* body content */}
              <div className="modal-body">{children}</div>
              {/* footer */}
              <div className=" modal-footer">{footer}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export { Modal };
