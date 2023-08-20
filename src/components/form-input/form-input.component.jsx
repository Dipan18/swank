import { Group, Input, InputLabel } from './form-input.styles';

const FormInput = ({ label, ...inputAttributes }) => {
  return (
    <Group>
      <Input {...inputAttributes} />
      <InputLabel $shrink={inputAttributes.value}>{label}</InputLabel>
    </Group>
  );
};

export default FormInput;
