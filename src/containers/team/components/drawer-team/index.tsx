/* eslint-disable prettier/prettier */
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { FooterForm } from '@/components/drawer-ctv/FooterForm';
import { convertSimpleToComplexOptions, Drawer, FormItem, Input, ISelectComplexOption, SelectComplex } from '@/components/elements';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { createTeamAsync, getCandidatesAsync } from '@/redux/reducers';
import { RequestTeamBody } from '@/services/api';

import { IFormValues } from '../type';

type IProps = {
    id: string,
    defaultValues: IFormValues
    visible: boolean,
    afterVisibleChange?: (visible: boolean) => void
    onClose: () => void

}

const schema = yup.object().shape({
    teamName: yup.string().required('is required'),
    leaderId: yup.string().required('is required'),
    memberIds: yup
        .array()
        .of(yup.string())
        .min(1, 'is required')
        .required('is required'),
    supporterIds: yup
        .array()
        .of(yup.string())
        .min(1, 'is required')
        .required('is required'),
});

const _DrawerTeam: React.FC<IProps> = ({ id, defaultValues, visible, onClose, afterVisibleChange }) => {
    const [loading, setLoading] = useState({ update: false, archive: false });
    const isUpdate = defaultValues?._id

    const dispatch = useAppDispatch()
    const userReducer = useAppSelector((state) => state.users)

    const { supporters, candidates } = userReducer

    useEffect(() => {
        if (visible && candidates.length < 1) {
            console.log("true")
            dispatch(getCandidatesAsync())
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible])

    const candidatesOptions = candidates.map((user) => ({
        icon: user.avatar,
        name: user.fullName,
        value: user._id
    }))

    const selectCandidatesOptions: ISelectComplexOption[] = useMemo(() => {
        return convertSimpleToComplexOptions(candidatesOptions, true);
    }, [candidatesOptions]);

    const supportersOptions = supporters.map((user) => ({
        icon: user.avatar,
        name: user.fullName,
        value: user._id
    }))

    const selectSupportersOptions: ISelectComplexOption[] = useMemo(() => {
        return convertSimpleToComplexOptions(supportersOptions, true);
    }, [supportersOptions]);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IFormValues>({
        resolver: yupResolver(schema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    });

    const onSubmit = async (data: RequestTeamBody) => {
        setLoading((prevState) => ({ ...prevState, update: true }));

        try {
            if (isUpdate) {
                console.log("update")
            } else {
                const result = await dispatch(createTeamAsync({ data }))
                if (result.meta.requestStatus === "rejected") {
                    return toast.error("Tạo nhóm không thành công")
                }
                toast.success("Tạo nhóm thành công")

            }
        } catch (error) {
            toast.error("Tạo nhóm không thành công")
        } finally {
            setLoading((prevState) => ({ ...prevState, update: false }));

            onClose()
        }
    }
    return (
        <Drawer id={id}
            title={isUpdate ? 'Cập nhật Team' : 'Tạo mới Team'}
            placement="right"
            visible={visible}
            onClose={onClose}
            afterVisibleChange={afterVisibleChange}
            footer={
                <FooterForm
                    isUpdate={isUpdate}
                    isSubmitting={loading.update}
                    onClick={handleSubmit(onSubmit)}
                />
            }>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormItem label="Tên nhóm" isRequired error={errors.teamName?.message}>
                    <Controller
                        control={control}
                        name="teamName"
                        render={({ field: { value, onChange, onBlur } }) => (
                            <Input
                                placeholder="Tên nhóm"
                                type="primary"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                            />
                        )}
                    />
                </FormItem>

                <div className="grid grid-cols-2 gap-4">
                    <FormItem label="Nhóm trưởng"
                        isRequired error={errors.leaderId?.message}
                    >
                        <Controller
                            control={control}
                            name="leaderId"
                            render={({ field: { value, onChange } }) => (
                                <SelectComplex
                                    name="leader"
                                    placeholder="Nhóm trưởng"
                                    selected={value}
                                    isClearable
                                    onValueChange={onChange}
                                    options={selectCandidatesOptions}
                                />
                            )}
                        />
                    </FormItem>

                    <FormItem label="Người hỗ trợ"
                        isRequired error={(errors.supporterIds as any)?.message}
                    >
                        <Controller
                            control={control}
                            name="supporterIds"
                            defaultValue={[]}
                            render={({ field: { value, onChange } }) => (
                                <SelectComplex
                                    placeholder="Người hỗ trợ"
                                    name="supporterIds"
                                    options={selectSupportersOptions}
                                    selected={value}
                                    onValueChange={onChange}
                                    isClearable
                                    isMulti
                                />
                            )}
                        />
                    </FormItem>
                </div>

                <FormItem label='Thành viên'
                    isRequired error={(errors.memberIds as any)?.message}
                >
                    <Controller
                        control={control}
                        name="memberIds"
                        render={({ field: { value, onChange } }) => (
                            <SelectComplex
                                placeholder="Thành viên"
                                name="memberIds"
                                options={selectCandidatesOptions}
                                selected={value}
                                onValueChange={onChange}
                                isClearable
                                isMulti
                            />
                        )}

                    />
                </FormItem>


            </form>
        </Drawer>
    );
};

export const DrawerTeam = _DrawerTeam;
