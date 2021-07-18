/* eslint-disable @typescript-eslint/no-explicit-any */
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React from 'react';

type IEvent = {
  target: { value: string };
};

type IProps = {
  value?: string;
  placeholder?: string;
  onChange?: (event: IEvent) => void;
  onBlur?: () => void;
  onFocus?: () => void;
};

const Editor: React.FC<IProps> = ({
  value,
  placeholder,
  onChange,
  onBlur,
  onFocus,
}) => {
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        config={{
          placeholder,
        }}
        data={value}
        // onReady={(editor: string) => {
        //   console.log("Editor is ready to use!", editor);
        // }}

        onChange={(_event: any, editor: any) => {
          const data = editor.getData();
          if (onChange) {
            onChange({
              target: {
                value: data,
              },
            });
          }
        }}
        onBlur={() => {
          onBlur && onBlur();
        }}
        onFocus={() => {
          onFocus && onFocus();
        }}
      />
    </div>
  );
};

export default Editor;
