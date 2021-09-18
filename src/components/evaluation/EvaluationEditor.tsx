/* eslint-disable prettier/prettier */
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { Button, SelectControlled } from '@/components/elements';
import { RequestEvaluationBody } from '@/services/api';

import { TYPE_EVALUATION } from './constants';

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

  const [type, setType] = useState("EVALUATION")
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
    let body: RequestEvaluationBody
    if (type === "SCORE") {
      body = {
        score: data.content,
        content: data.content,
        candidateId: candidateId || '',
        teamId: teamId || '',
        userId: userId,
        round: round,
      }
    } else {
      body = {
        content: data.content,
        candidateId: candidateId || '',
        teamId: teamId || '',
        userId: userId,
        round: round,
      }
    }
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

  const handleChangeType = (value: string) => {
    setType(value)
  }
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center text-base font-semibold space-x-4 space-y-2">
          <SelectControlled border size="small" options={TYPE_EVALUATION} value={type} onChange={handleChangeType} />

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


};
