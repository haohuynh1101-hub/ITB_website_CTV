/* eslint-disable prettier/prettier */
import { yupResolver } from '@hookform/resolvers/yup';
import { Picker } from 'emoji-mart';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { Button, DropDown } from '@/components/elements';
import { RequestEvaluationBody } from '@/services/api';

import { SmileIcon } from '..';

export type IFormValue = {
    _id: string;
    content: string;
    icon: string;
};

type IProps = {
    placeholder?: string;
    defaultValue?: IFormValue;
    round: string;
    candidateId?: string;
    teamId?: string;
    userId: string;
    //
    onCreate: (data: RequestEvaluationBody) => Promise<boolean>;
    onUpdate: (
        evaluationId: string,
        data: RequestEvaluationBody
    ) => Promise<boolean>;
};

const schema = yup.object().shape({
    content: yup.string().required(),
});

export const EvaluateEditor: React.FC<IProps> = ({
    placeholder,
    defaultValue,
    round,
    candidateId,
    teamId,
    userId,
    //
    onCreate,
    onUpdate,
}) => {
    const [emoji, setEmoji] = useState('');
    const isUpdate = defaultValue?._id;
    const { control, handleSubmit, reset } = useForm<IFormValue>({
        resolver: yupResolver(schema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    });
    useEffect(() => {
        if (defaultValue) {
            reset({
                _id: defaultValue?._id,
                content: defaultValue?.content,
                icon: defaultValue?.icon,
            });
        } else {
            reset({
                _id: '',
                content: '',
                icon: '',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValue]);

    const onSubmit = async (data: IFormValue) => {
        const body: RequestEvaluationBody = {
            content: data.content,
            icon: data.icon,
            candidateId: candidateId || "",
            teamId: teamId || "",
            userId: userId,
            round: round,
        };
        try {
            if (isUpdate) {
                onUpdate(defaultValue?._id, body);
            } else {
                const res = await onCreate(body);
                if (!res) {
                    toast.error('Bình luận không thành công');
                }
            }
        } catch (error) {
            throw new Error();
        } finally {
            reset({
                _id: '',
                content: '',
                icon: '',
            });
        }
    };
    return (
        <React.Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center text-base font-semibold space-x-4 space-y-2">
                    <Controller
                        control={control}
                        name="icon"
                        render={({ field: { value, onChange } }) => (
                            <DropDown
                                animation={false}
                                placement="left"
                                overlay={
                                    <Picker
                                        onClick={(e) => {
                                            //eslint-disable-next-line
                                            //@ts-ignore
                                            const icon = e.native;
                                            setEmoji(value || icon);
                                            onChange(icon);
                                        }}
                                        showPreview={false}
                                        useButton
                                        showSkinTones={false}
                                    />
                                }
                            >
                                <div className="flex items-center justify-center  text-center rounded-full w-7 h-7 hover:bg-primary-50">
                                    <span>{value || <SmileIcon />}</span>
                                </div>
                            </DropDown>
                        )}
                    />

                    <Controller
                        control={control}
                        name="content"
                        render={({ field: { value, onChange } }) => (
                            <textarea
                                className="w-full h-20 px-4 py-2 border focus:outline-none max-h-96"
                                value={value}
                                onChange={onChange}
                                placeholder={placeholder}
                            />
                        )}
                    />

                    <div>
                        <Button
                            title="Lưu"
                            type="primary"
                            onClick={handleSubmit(onSubmit)}
                        />
                    </div>
                </div>
            </form>
        </React.Fragment>
    );

    // return (
    //     <React.Fragment>
    //         <div className="flex items-center text-base font-semibold space-x-4 space-y-2">
    //             <DropDown
    //                 animation={false}
    //                 placement="left"
    //                 overlay={
    //                     <Picker
    //                         onClick={(e) => {
    //                             //eslint-disable-next-line
    //                             //@ts-ignore
    //                             const icon = e.native;
    //                             setEmoji(icon);
    //                             onChangeEditor(description || '', icon);
    //                         }}
    //                         showPreview={false}
    //                         useButton
    //                         showSkinTones={false}
    //                     />
    //                 }
    //             >
    //                 <div className="flex items-center justify-center  text-center rounded-full w-7 h-7 hover:bg-primary-50">
    //                     <span>{icon ||
    //                         <SmileIcon />
    //                     }</span>

    //                 </div>
    //             </DropDown>
    //             <div className="w-full h-full">
    //                 <textarea
    //                     className="w-full h-20 px-4 py-2 border focus:outline-none max-h-40"
    //                     value={description}
    //                     onChange={(e) => onChangeEditor(e.target.value, emoji)}
    //                     placeholder={placeholder}
    //                 />
    //             </div>

    //             <div>
    //                 <Button title="Lưu" type="primary" onClick={onSubmit} disabled={!description} />
    //             </div>
    //         </div>
    //     </React.Fragment>
    // );
};
