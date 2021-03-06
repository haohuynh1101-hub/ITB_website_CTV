/* eslint-disable prettier/prettier */
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import {
  convertSimpleToComplexOptions,
  Drawer,
  FormItem,
  Input,
  ISelectComplexOption,
  SelectComplex,
} from '@/components/elements';
import { FooterForm } from '@/components/footer-drawer/FooterForm';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  createTeamAsync,
  getCandidatesAsync,
  updateTeamAsync,
} from '@/redux/reducers';
import { getMembersAsync } from '@/redux/reducers/member';
import { RequestTeamBody } from '@/services/api';

import { IFormValues } from '../type';

type IProps = {
  id: string;
  defaultValues: IFormValues;
  visible: boolean;
  //
  afterVisibleChange?: (visible: boolean) => void;
  onClose: () => void;
  onAfterVisibleChange: (visible: boolean) => void;
};

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

const _DrawerTeam: React.FC<IProps> = ({
  id,
  defaultValues,
  visible,
  onClose,
  onAfterVisibleChange,
}) => {
  const [loading, setLoading] = useState({ update: false, archive: false });
  const isUpdate = defaultValues?._id;

  const dispatch = useAppDispatch();
  const candidateReducer = useAppSelector((state) => state.candidate);
  const memberReducer = useAppSelector((state) => state.member);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (visible && memberReducer.members.length < 1) {
      Promise.all([
        dispatch(getCandidatesAsync({ role: 'CANDIDATE', isArchived: false })),
        dispatch(getMembersAsync({ role: 'SUPPORTER' })),
      ]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    if (defaultValues) {
      reset({
        teamName: defaultValues?.teamName,
        leaderId: defaultValues?.leaderId,
        memberIds: defaultValues?.memberIds,
        supporterIds: defaultValues?.supporterIds,
      });
    } else {
      reset({
        teamName: '',
        leaderId: '',
        memberIds: [],
        supporterIds: [],
      });
    }
  }, [defaultValues, visible, reset]);

  const candidatesOptions = candidateReducer.candidates.map((user) => ({
    icon: user.avatar,
    name: user.fullName,
    value: user._id,
  }));

  const selectCandidatesOptions: ISelectComplexOption[] = useMemo(() => {
    return convertSimpleToComplexOptions(candidatesOptions, true);
  }, [candidatesOptions]);

  const supportersOptions = memberReducer.members.map((user) => ({
    icon: user.avatar,
    name: user.fullName,
    value: user._id,
  }));

  const selectSupportersOptions: ISelectComplexOption[] = useMemo(() => {
    return convertSimpleToComplexOptions(supportersOptions, true);
  }, [supportersOptions]);

  const onSubmit = async (data: RequestTeamBody) => {
    setLoading((prevState) => ({ ...prevState, update: true }));

    try {
      if (isUpdate) {
        const result = await dispatch(
          updateTeamAsync({ teamId: defaultValues?._id, data: data })
        );
        if (result.meta.requestStatus === 'rejected') {
          return toast.error('C???p nh???t nh??m kh??ng th??nh c??ng');
        }

        toast.success('C???p nh???t nh??m th??nh c??ng');
      } else {
        const result = await dispatch(createTeamAsync({ data }));
        if (result.meta.requestStatus === 'rejected') {
          return toast.error('T???o nh??m kh??ng th??nh c??ng');
        }
        toast.success('T???o nh??m th??nh c??ng');
      }
    } catch (error) {
      throw new Error('Error');
    } finally {
      setLoading((prevState) => ({ ...prevState, update: false }));
      onClose();
    }
  };
  return (
    <Drawer
      id={id}
      title={isUpdate ? 'C???p nh???t nh??m' : 'T???o nh??m'}
      placement="right"
      visible={visible}
      onClose={onClose}
      afterVisibleChange={onAfterVisibleChange}
      footer={
        <FooterForm
          isUpdate={isUpdate}
          isSubmitting={loading.update}
          onClick={handleSubmit(onSubmit)}
        />
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormItem label="T??n nh??m" isRequired error={errors.teamName?.message}>
          <Controller
            control={control}
            name="teamName"
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                placeholder="T??n nh??m"
                type="primary"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </FormItem>

        <div className="grid grid-cols-2 gap-4">
          <FormItem
            label="Nh??m tr?????ng"
            isRequired
            error={errors.leaderId?.message}
          >
            <Controller
              control={control}
              name="leaderId"
              render={({ field: { value, onChange } }) => (
                <SelectComplex
                  name="leader"
                  placeholder="Nh??m tr?????ng"
                  selected={value}
                  isClearable
                  onValueChange={onChange}
                  options={selectCandidatesOptions}
                />
              )}
            />
          </FormItem>

          <FormItem
            label="Ng?????i h??? tr???"
            isRequired
            error={(errors.supporterIds as any)?.message}
          >
            <Controller
              control={control}
              name="supporterIds"
              defaultValue={[]}
              render={({ field: { value, onChange } }) => (
                <SelectComplex
                  placeholder="Ng?????i h??? tr???"
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

        <FormItem
          label="Th??nh vi??n"
          isRequired
          error={(errors.memberIds as any)?.message}
        >
          <Controller
            control={control}
            name="memberIds"
            render={({ field: { value, onChange } }) => (
              <SelectComplex
                placeholder="Th??nh vi??n"
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
