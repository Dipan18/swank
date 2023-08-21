import { FC, InputHTMLAttributes } from 'react';
import { Group, Input, InputLabel } from './form-input.styles';

type FormInputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...inputAttributes }) => {
  return (
    <Group>
      <Input {...inputAttributes} />
      <InputLabel
        $shrink={Boolean(
          inputAttributes.value &&
            typeof inputAttributes.value === 'string' &&
            inputAttributes.value.length
        )}
      >
        {label}
      </InputLabel>
    </Group>
  );
};

export default FormInput;
