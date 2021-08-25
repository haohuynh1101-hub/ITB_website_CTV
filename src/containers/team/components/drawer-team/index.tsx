/* eslint-disable prettier/prettier */
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FooterForm } from '@/components/drawer-ctv/FooterForm';
import { convertSimpleToComplexOptions, Drawer, FormItem, Input, ISelectComplexOption, SelectComplex } from '@/components/elements';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getCandidatesAsync } from '@/redux/reducers';

import { IFormValues } from '../type';

type IProps = {
    id: string,
    visible: boolean,
    onClose: () => void
    defaultValues: IFormValues
}

const schema = yup.object().shape({
    teamName: yup.string().required('is required'),
    leaderId: yup.string().email().required('is required'),
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

const _DrawerTeam: React.FC<IProps> = ({ id, defaultValues, visible, onClose }) => {
    const [loading, setLoading] = useState({ update: false, archive: false });
    const isUpdate = defaultValues?.id

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
        setValue,
        formState: { errors },
    } = useForm<IFormValues>({
        resolver: yupResolver(schema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    });

    const onSubmit = (data: IFormValues) => {
        console.log(data)
    }
    return (
        <Drawer id={id}
            title={isUpdate ? 'Cập nhật Team' : 'Tạo mới Team'}
            placement="right"
            visible={visible} onClose={onClose} footer={
                <FooterForm
                    isUpdate={isUpdate}
                    isSubmitting={loading.update}
                    onClick={handleSubmit(onSubmit)}
                />
            }>
            <form>
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
