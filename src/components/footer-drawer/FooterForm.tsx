/* eslint-disable prettier/prettier */
import classNames from 'classnames';
import { Button, DeleteIcon } from 'components';

type IProps = {
    id?: string;
    isUpdate?: string;
    isArchiving?: boolean;
    isSubmitting: boolean;
    isArchived?: boolean;
    disableCreate?: boolean
    //
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    onArchive?: () => void;

};
export const FooterForm: React.FC<IProps> = ({
    id,
    isUpdate,
    isArchiving,
    isSubmitting,
    isArchived = false,
    disableCreate = false,
    //
    onClick,
    onArchive,
}) => {

    const renderTitleArchive = () => {

        return isArchived ? 'unarchive' : 'archive';
    };
    return (
        <>
            <div
                id={id}
                className={classNames({
                    'flex items-center justify-between w-full space-x-4': isUpdate,
                    'w-full': !isUpdate,
                })}
            >
                {isUpdate && (
                    <>
                        <div className="flex items-center space-x-4">
                            <Button
                                htmlType="button"
                                icon={<DeleteIcon size={20} />}
                                title={renderTitleArchive()}
                                disabled={disableCreate}
                                loading={isArchiving}
                                onClick={onArchive}
                            />
                        </div>
                    </>
                )}
                <Button
                    htmlType="button"
                    type="primary"
                    title={isUpdate ? "Cập nhât" : "Tạo"}
                    onClick={onClick}
                    loading={isSubmitting}
                    disabled={disableCreate}
                    block={!isUpdate}
                />
            </div>
        </>
    );
};
