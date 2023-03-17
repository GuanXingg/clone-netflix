import { yupResolver } from '@hookform/resolvers/yup';
import classnames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import SelectField from '~/components/form/select-field';
import TextField from '~/components/form/text-field';
import { NewInfoValues } from '../../services/interface';
import styles from './index.module.scss';

const cs = classnames.bind(styles);

interface NewInfoFormProps {
  submitForm: (values: NewInfoValues) => void;
}

const selectGenderList = ['', 'Male', 'Female', 'Other'];

const schemaValidation = yup.object({
  fullName: yup.string().required('* Name can not empty!').min(2, '* Invalid name!'),
  gender: yup
    .mixed()
    .oneOf(['Male', 'Female', 'Other'] as const, '* Invalid gender!')
    .defined(),
  phone: yup
    .string()
    .required('* Phone can not empty!')
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, '* Invalid phone number'),
});

function NewInfoForm({ submitForm }: NewInfoFormProps) {
  const { handleSubmit, control } = useForm<NewInfoValues>({
    defaultValues: {
      fullName: '',
      gender: '',
      phone: '',
    },
    resolver: yupResolver(schemaValidation),
  });

  const handleSubmitForm = (values: NewInfoValues) => {
    const phoneSubmit = values.phone;
    const formatPhone = `+84 ${phoneSubmit.slice(1, 3)} ${phoneSubmit.slice(3, 7)} ${phoneSubmit.slice(7)}`;
    const newValues = { ...values, phone: formatPhone };

    if (submitForm) submitForm(newValues);
  };

  return (
    <section className={cs('new-info-form')}>
      <h2 className={cs('title')}>Add personal info</h2>
      <form onSubmit={handleSubmit(handleSubmitForm)} className={cs('form')}>
        <TextField control={control} name="fullName" label="Full name" margin="md" />
        <SelectField control={control} name="gender" label="Gender" selectList={selectGenderList} margin="md" />
        <TextField control={control} name="phone" label="Phone number" margin="md" />
        <button type="submit" className={cs('submit')}>
          Submit
        </button>
      </form>
    </section>
  );
}

export default NewInfoForm;
