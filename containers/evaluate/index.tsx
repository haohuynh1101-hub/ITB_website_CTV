import { columns, dataDemo } from '../manage-ctv/constant';
import { Table, SelectControlled, EvaluateItem } from '@components';
import { useState } from 'react';
import { PLusIcon } from '@components';
import { FormEvaluate } from './form/form-evaluate';

const dataSelect = [
  {
    name: 'Nhóm 1',
    value: '1',
  },
  {
    name: 'Nhóm 2',
    value: '2',
  },
  {
    name: 'Nhóm 3',
    value: '3',
  },
  {
    name: 'Nhóm 4',
    value: '4',
  },
  {
    name: 'Nhóm 5',
    value: '5',
  },
];
export const EvaluateContainer = () => {
  const [selected, setSelected] = useState<string>('');
  const [isInsert, setIsInsert] = useState(false);

  const handleSelect = (key: string) => {
    setSelected(key);
  };

  const onInsert = () => {
    setIsInsert((value) => !value);
  };
  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="w-36">
            <SelectControlled
              value={selected}
              options={dataSelect}
              onChange={handleSelect}
              placeholder="Nhóm CTV"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span>Số thành viên:</span>
              <span className="font-medium">7</span>
            </div>

            <div className=" flex items-center space-x-2">
              <span>Supporter:</span>
              <span className="font-medium">Huyền Thương, Bảo Trâm</span>
            </div>
          </div>
        </div>

        <Table columns={columns} data={dataDemo} />

        <div className="space-y-4">
          <div className="font-medium flex items-center  space-x-4 text-lg">
            <span>Nhận xét nhóm:</span>

            <button onClick={onInsert}>
              <PLusIcon />
            </button>
          </div>

          {isInsert && <FormEvaluate />}

          <EvaluateItem
            title="Nhóm này làm việc oki nhá!"
            owner="Vũ Quang Huy"
          />
          <EvaluateItem
            title="Nhóm này làm việc oki nhá!"
            owner="Vũ Quang Huy"
          />
        </div>
      </div>
    </>
  );
};
