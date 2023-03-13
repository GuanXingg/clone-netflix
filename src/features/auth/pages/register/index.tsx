import RegisterForm from '../../components/register-form';
import { SubmitValues } from '../../services/interface';

function Register() {
  const handleSubmitValues = async (values: SubmitValues) => {
    console.log('>>> Check  file: index.tsx:11  values:', values);
  };

  return (
    <section className="theme-public" style={{ overflow: 'hidden' }}>
      <RegisterForm submitForm={handleSubmitValues} />
    </section>
  );
}

export default Register;
