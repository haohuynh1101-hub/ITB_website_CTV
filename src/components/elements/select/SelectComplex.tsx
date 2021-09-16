/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import styled from '@emotion/styled';
import _ from 'lodash';
import React from 'react';
import ReSelect, {
  ActionMeta,
  components,
  ControlProps,
  defaultTheme,
  GroupTypeBase,
  IndicatorProps,
  MultiValueProps,
  OptionProps,
  OptionTypeBase,
  Props as SelectProps,
  SingleValueProps,
  Styles,
} from 'react-select';
import { ThemeConfig } from 'react-select/src/theme';

const S4Prefix = styled.div`
  svg {
    width: 20px;
    height: 20px;
  }
`;

type ICustomChangeEvent = {
  target: {
    name?: string;
    value: string | string[];
  };
};

interface Props extends SelectProps<OptionTypeBase, boolean> {
  name: string;
  selected: string | string[];
  prefix?: JSX.Element;
  onValueChange?: (e: ICustomChangeEvent) => void;
}

export type ISelectComplexOption = {
  icon?: JSX.Element;
  label: string;
  value: string;
};

const theme: ThemeConfig = {
  colors: {
    ...defaultTheme.colors,
    primary: '#f37f26',
    primary25: '#ffefdd',
    primary50: '##ffd3b2',
    primary75: '#fab784',
    neutral10: '#fff',
  },
  borderRadius: 8,
  spacing: {
    baseUnit: 4,
    controlHeight: 40,
    menuGutter: 8,
  },
};

const customStyles: Partial<
  Styles<
    OptionTypeBase | GroupTypeBase<OptionTypeBase>,
    boolean,
    GroupTypeBase<OptionTypeBase>
  >
> = {
  menu: (provided) => {
    return {
      ...provided,
      zIndex: 32,
      paddingTop: 4,
      paddingBottom: 4,
    };
  },

  control: (provided, state) => {
    return {
      ...provided,

      borderColor: state.isFocused
        ? state.theme.colors.primary
        : state.isDisabled
          ? '#e5e7eb'
          : 'transparent',
      boxShadow: 'none',
      backgroundColor: '#f3f4f6', // gray-50

      opacity: state.isDisabled ? 0.5 : 1,

      '&:hover': {},
    };
  },

  valueContainer: (provided) => {
    return {
      ...provided,
      padding: '2px 14px',
    };
  },

  singleValue: (provided) => {
    return {
      ...provided,
      padding: 0,
      margin: 0,
      transition: 'opacity 300ms',
      color: '#000',
    };
  },

  multiValue: (provided) => {
    return {
      ...provided,
      transition: 'opacity 300ms',
      padding: 0,
      borderRadius: 3,
      marginLeft: 0,
      marginRight: 4,
      backgroundColor: '#fff', // "#F9FAFB",
      boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
    };
  },

  multiValueLabel: (provided) => {
    return {
      ...provided,
      fontSize: '0.875rem',
      paddingLeft: 8,
      paddingRight: 0,
    };
  },

  multiValueRemove: (provided) => {
    return {
      ...provided,
      color: '#9CA3AF',
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 1,
      cursor: 'pointer',
      ':hover': {
        color: '#6B7280',
      },
    };
  },

  indicatorsContainer: (provided) => {
    return {
      ...provided,
      padding: 0,
    };
  },

  indicatorSeparator: () => {
    return {
      display: 'flex',
      width: 16,
      height: 16,
    };
  },

  clearIndicator: () => {
    return {};
  },

  dropdownIndicator: () => {
    return {
      padding: '0 16px 0 0',
    };
  },

  placeholder: (provided) => {
    return {
      ...provided,
      color: '#9CA3AF', // text-gray-400
    };
  },
};

const Control = ({
  children,
  ...rest
}: React.PropsWithChildren<
  ControlProps<
    OptionTypeBase | GroupTypeBase<OptionTypeBase>,
    boolean,
    GroupTypeBase<OptionTypeBase>
  >
>) => {
  return (
    <components.Control {...rest}>
      {rest.selectProps?.prefix && (
        <S4Prefix className="pl-4">{rest.selectProps?.prefix}</S4Prefix>
      )}
      {children}
    </components.Control>
  );
};

const DropdownIndicator = (
  props: React.PropsWithChildren<
    IndicatorProps<
      OptionTypeBase | GroupTypeBase<OptionTypeBase>,
      boolean,
      GroupTypeBase<OptionTypeBase>
    >
  >
) => {
  return (
    <components.DropdownIndicator {...props}>
      <i className="text-gray-400 cursor-pointer fas fa-caret-down" />
    </components.DropdownIndicator>
  );
};

const ClearIndicator = (
  props: React.PropsWithChildren<
    IndicatorProps<
      OptionTypeBase | GroupTypeBase<OptionTypeBase>,
      boolean,
      GroupTypeBase<OptionTypeBase>
    >
  >
) => {
  return (
    <components.ClearIndicator {...props}>
      <i className="text-gray-400 cursor-pointer fas fa-times"></i>
    </components.ClearIndicator>
  );
};

const MultiValue = ({
  children,
  ...rest
}: React.PropsWithChildren<
  MultiValueProps<any, GroupTypeBase<OptionTypeBase>>
>) => {
  return (
    <components.MultiValue {...rest}>
      <div className="flex flex-row items-center cursor-pointer">
        {rest.data?.icon ? <div className="pr-2">{rest.data?.icon}</div> : null}
        {children}
      </div>
    </components.MultiValue>
  );
};

const SingleValue = ({
  children,
  ...rest
}: React.PropsWithChildren<
  SingleValueProps<any, GroupTypeBase<OptionTypeBase>>
>) => {
  return (
    <components.SingleValue {...rest}>
      <div className="flex flex-row items-center cursor-pointer">
        {rest.data?.icon ? <div className="pr-2">{rest.data?.icon}</div> : null}
        {children}
      </div>
    </components.SingleValue>
  );
};

const Option = ({
  children,
  ...rest
}: React.PropsWithChildren<
  OptionProps<any, boolean, GroupTypeBase<OptionTypeBase>>
>) => {
  return (
    <components.Option {...rest}>
      <div className="flex flex-row items-center cursor-pointer">
        {rest.data?.icon ? (
          <div className="block pr-2">{rest.data?.icon}</div>
        ) : null}
        {children}
      </div>
    </components.Option>
  );
};

export const SelectComplex: React.FC<Props> = ({
  name,
  options,
  selected,
  onChange,
  onValueChange,
  ...props
}) => {
  const value = props.isMulti
    ? options.filter((e) => selected?.includes?.(e?.value))
    : options.find((e) => e?.value === selected);

  const handleValueChange = (
    value: ISelectComplexOption | ISelectComplexOption[],
    action?: ActionMeta<ISelectComplexOption>
  ) => {
    if (onValueChange) {
      const eventValue = _.isArray(value)
        ? value.map((v) => v?.value)
        : value?.value;
      const event: ICustomChangeEvent = { target: { name, value: eventValue } };
      // console.log("SelectComplex.tsx ~ ICustomChangeEvent", event);
      onValueChange(event);
      return;
    }

    if (onChange) {
      onChange(value, action);
      return;
    }
  };

  return (
    <ReSelect
      instanceId={name}
      name={name}
      theme={theme}
      styles={customStyles}
      options={options}
      onChange={handleValueChange}
      {...props}
      components={{
        Control,
        DropdownIndicator,
        ClearIndicator,
        MultiValue,
        SingleValue,
        Option,
        ...props.components,
      }}
      value={value || []}
    />
  );
};
