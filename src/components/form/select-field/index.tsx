import classnames from 'classnames/bind';
import { withErrorBoundary } from 'react-error-boundary';
import { Control, useController } from 'react-hook-form';
import ErrorFallback from '~/components/error-fallback';
import styles from './index.module.scss';

const cs = classnames.bind(styles);

interface SelectFieldProps {
  control: Control<any>;
  name: string;
  label?: string;
  margin?: string;
  selectList: string[];
}

function SelectField(props: SelectFieldProps) {
  const { control, name, label, margin, selectList } = props;
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
        <select
          {...field}
          placeholder="hello"
          className={cs('select', {
            'select--checked': field.value !== '',
          })}
        >
          {selectList.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <label className={cs('label')}>{label}</label>
      </div>
      <p className={cs('error')}>{error?.message}</p>
    </section>
  );
}

export default withErrorBoundary(SelectField, {
  FallbackComponent: ErrorFallback,
});
