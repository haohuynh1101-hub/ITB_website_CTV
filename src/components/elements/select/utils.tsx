import { Avatar } from '../avatar';
import { ISelectOption } from './index';
import { ISelectComplexOption } from './SelectComplex';

export const convertSimpleToComplexOptions = (
  options: ISelectOption[],
  shouldShowIcon?: boolean
): ISelectComplexOption[] => {
  return options.map((option) => ({
    icon: shouldShowIcon ? (
      typeof option?.icon === 'string' ? (
        <Avatar
          src={option.icon.toString()}
          fullName={option.name}
          size="small"
        />
      ) : (
        option?.icon
      )
    ) : undefined,
    label: option.name,
    value: option.value,
  }));
};
