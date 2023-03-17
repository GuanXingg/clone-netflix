import classnames from 'classnames/bind';
import { useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { Control, useController } from 'react-hook-form';
import ErrorFallback from '~/components/error-fallback';
import styles from './index.module.scss';

const cs = classnames.bind(styles);

interface PassFieldProps {
  control: Control<any>;
  name: string;
  label?: string;
  margin?: string;
  handleKeyUp?: (e: any) => void;
}

function PassField(props: PassFieldProps) {
  const { control, name, label, margin, handleKeyUp } = props;
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });
  const [showPass, setShowPass] = useState<boolean>(false);

  return (
    <section
      className={cs('field', {
        'field--sm': margin === 'sm',
        'field--md': margin === 'md',
        'field--lg': margin === 'lg',
      })}
    >
      <div className={cs('content')}>
        <input
          type={showPass ? 'text' : 'password'}
          placeholder=" "
          {...field}
          onKeyUp={handleKeyUp}
          className={cs('input')}
        />
        <label className={cs('label')}>{label}</label>
        <button type="button" onClick={() => setShowPass(!showPass)} className={cs('toggle')}>
          {showPass ? 'Hide' : 'Show'}
        </button>
      </div>
      <p className={cs('error')}>{error?.message}</p>
    </section>
  );
}

export default withErrorBoundary(PassField, {
  FallbackComponent: ErrorFallback,
});
