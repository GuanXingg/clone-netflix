import { yupResolver } from '@hookform/resolvers/yup';
import classnames from 'classnames/bind';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import PassField from '~/components/form/pass-field';
import TextField from '~/components/form/text-field';
import { SubmitForm, SubmitValues } from '../../services/interface';
import styles from './index.module.scss';

const cs = classnames.bind(styles);

interface RegisterFormProps {
  submitForm: (values: SubmitValues) => void;
}
interface ValidatePass {
  length: boolean;
  lower: boolean;
  upper: boolean;
  numeric: boolean;
  special: boolean;
}

const requireList = [
  'At least 8 character length',
  'At least 1 lowercase character',
  'At least 1 uppercase character',
  'At least 1 numeric character',
  'At least 1 special character',
];

const schemaValidation = yup.object({
  email: yup.string().required('* Email can not empty').email('* Invalid email'),
  password: yup
    .string()
    .required('* Password can not empty')
    .min(8, '* Password must at least 8 character')
    .matches(/(?=.*[a-z])/, '* Password must have at least 1 lowercase character')
    .matches(/(?=.*[A-Z])/, '* Password must have at least 1 uppercase character')
    .matches(/(?=.*[0-9])/, '* Password must have at least 1 numeric character')
    .matches(/(?=.*[!@#$%^&*])/, '* Password must have at least 1 special character'),
  repass: yup
    .string()
    .required('* Password can not empty')
    .oneOf([yup.ref('password')], '* Password does not match'),
});

function RegisterForm({ submitForm }: RegisterFormProps) {
  const { handleSubmit, control } = useForm<SubmitForm>({
    defaultValues: {
      email: '',
      password: '',
      repass: '',
    },
    resolver: yupResolver(schemaValidation),
  });
  const [validatePass, setValidatePass] = useState<ValidatePass>({
    length: false,
    lower: false,
    upper: false,
    numeric: false,
    special: false,
  });

  const handleSubmitForm = (values: SubmitForm) => {
    const newValues = { ...values };
    delete newValues.repass;
    if (submitForm) submitForm(newValues);
  };

  const handleKeyUpPass = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue: string = e.target.value;
    const checkLength: boolean = /(?=.{8,})/.test(currentValue);
    const checkLower: boolean = /(?=.*[a-z])/.test(currentValue);
    const checkUpper: boolean = /(?=.*[A-Z])/.test(currentValue);
    const checkNumeric: boolean = /(?=.*[0-9])/.test(currentValue);
    const checkSpecial: boolean = /(?=.*[!@#$%^&*])/.test(currentValue);

    setValidatePass({
      length: checkLength,
      lower: checkLower,
      upper: checkUpper,
      numeric: checkNumeric,
      special: checkSpecial,
    });
  };

  return (
    <section className={cs('register-form')}>
      <h2 className={cs('title')}>Register</h2>
      <form onSubmit={handleSubmit(handleSubmitForm)} className={cs('form')}>
        <TextField control={control} name="email" label="Email" margin="md" />
        <PassField control={control} name="password" label="Password" handleKeyUp={handleKeyUpPass} margin="md" />
        <PassField control={control} name="repass" label="Re-type password" margin="md" />
        <section className={cs('require')}>
          <p className={cs('require__title')}>Password must includes:</p>
          <ul className={cs('require__list')}>
            {Object.values(validatePass).map((item, index) => {
              return (
                <li key={requireList[index]}>
                  <span
                    className={cs('require__item', {
                      'require__item--checked': item,
                    })}
                  >
                    {requireList[index]}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
        <button type="submit" className={cs('submit')}>
          Submit
        </button>
      </form>
      <p className={cs('txt')}>
        Already have account?{' '}
        <a href="/auth/login" className={cs('txt__link')}>
          Sign in now.
        </a>
      </p>
    </section>
  );
}

export default RegisterForm;
