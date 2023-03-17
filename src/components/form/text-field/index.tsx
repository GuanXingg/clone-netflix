import classnames from 'classnames/bind';
import { withErrorBoundary } from 'react-error-boundary';
import { Control, useController } from 'react-hook-form';
import ErrorFallback from '~/components/error-fallback';
import styles from './index.module.scss';

const cs = classnames.bind(styles);

interface TextFieldProps {
  control: Control<any>;
  name: string;
  label?: string;
  margin?: string;
}

function TextField(props: TextFieldProps) {
  const { control, name, label, margin } = props;
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return (
    <section
      className={cs('field', {
        'field--sm': margin === 'sm',
        'field--md': margin === 'md',
        'field--lg': margin === 'lg',
      })}
    >
      <div className={cs('content')}>
        <input type="text" placeholder=" " {...field} className={cs('input')} />
        <label className={cs('label')}>{label}</label>
      </div>
      <p className={cs('error')}>{error?.message}</p>
    </section>
  );
}

export default withErrorBoundary(TextField, {
  FallbackComponent: ErrorFallback,
});
