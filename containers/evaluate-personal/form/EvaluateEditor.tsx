import { DeleteIcon, DropDown, EditIcon, Editor, Input } from '@components';
import { Picker } from 'emoji-mart';
import React, { useState } from 'react';

type Props = {
  description?: string;
  onChangeEditor: (value: string, icon: string, idx: number) => void;
  placeholder?: string;
  index: number;
  icon: string;
  isEditor?: boolean;
};

export const EvaluateEditor: React.FC<Props> = ({
  description,
  onChangeEditor,
  icon,
  index,
  placeholder,
  isEditor = false,
}) => {
  const [emoji, setEmoji] = useState(icon || '');
  return (
    <React.Fragment>
      <div className="flex items-center text-base font-semibold space-x-4 space-y-2">
        <DropDown
          animation={false}
          placement="left"
          overlay={
            <Picker
              onClick={(e) => {
                //eslint-disable-next-line
                  //@ts-ignore
                const icon = e.native;
                setEmoji(icon);
                onChangeEditor(description || '', icon, index);
              }}
              showPreview={false}
              useButton
              showSkinTones={false}
            />
          }
        >
          <div className="flex items-center justify-center pr-1 text-center rounded-full w-7 h-7 hover:bg-primary-50">
            <span>{emoji || '😍'}</span>
          </div>
        </DropDown>
        {isEditor ? (
          <div className="w-full">
            <Editor
              value={description}
              onChange={(e) => onChangeEditor(e.target.value, emoji, index)}
              placeholder={placeholder}
            />
          </div>
        ) : (
          <Input value={description} type="primary" />
        )}
        <button>
          <EditIcon />
        </button>
        <button>
          <DeleteIcon />
        </button>
      </div>
    </React.Fragment>
  );
};
