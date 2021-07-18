import ReSelect, {
  defaultTheme,
  GroupTypeBase,
  OptionTypeBase,
  Props as SelectProps,
  Styles,
} from 'react-select';
import { ThemeConfig } from 'react-select/src/theme';

interface Props extends SelectProps<OptionTypeBase, boolean> {
  name: string;
  option: string | string[];
}

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
  control: (provided, state) => {
    return {
      ...provided,

      borderColor: state.isFocused ? state.theme.colors.primary : 'transparent',
      boxShadow: 'none',
      backgroundColor: '#f3f4f6', // gray-50

      opacity: state.isDisabled ? 0.5 : 1,

      '&:hover': {},
    };
  },

  valueContainer: (provided) => {
    return {
      ...provided,
      padding: '0 16px',
    };
  },

  multiValue: (provided) => {
    return {
      ...provided,
      // opacity: 1, // state.isDisabled ? 0.5 : 1,
      transition: 'opacity 300ms',
      padding: 0,
      borderRadius: 4,
      margin: 2,
    };
  },

  multiValueLabel: (provided) => {
    return {
      ...provided,
      fontSize: '0.875rem',
      padding: 4,
      paddingLeft: 12,
    };
  },

  multiValueRemove: (provided) => {
    return {
      ...provided,
      paddingRight: 6,
      paddingLeft: 6,
      color: '#656565',
      ':hover': {
        backgroundColor: '#dcdcdc',
      },
    };
  },

  indicatorsContainer: () => {
    return {};
  },

  indicatorSeparator: () => {
    return {
      display: 'none',
    };
  },

  placeholder: (provided) => {
    return {
      ...provided,
      color: '#9CA3AF', // text-gray-400
    };
  },
};

const DropdownIndicator = () => {
  return (
    <div className="pr-4 text-gray-400">
      <i className="fas fa-caret-down" />
      {/* <components.DropdownIndicator {...props}></components.DropdownIndicator> */}
    </div>
  );
};

export const SelectMulti: React.FC<Props> = ({ name, options, ...props }) => {
  return (
    <>
      <ReSelect
        options={options}
        isMulti
        id={name}
        {...props}
        value={
          options &&
          options.filter((option) => props.option?.includes(option.value))
        }
        theme={theme}
        styles={customStyles}
        components={{ DropdownIndicator }}
      />
    </>
  );
};

SelectMulti.displayName = 'Select';
