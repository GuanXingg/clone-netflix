import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import RegisterForm from '../../components/register-form';
import { authAsyncRegister } from '../../services/authSlice';
import { AuthErrorState, SubmitValues } from '../../services/interface';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitValues = async (values: SubmitValues) => {
    try {
      const action: any = authAsyncRegister(values);
      const actionDispatch = await dispatch(action);
      await unwrapResult(actionDispatch);
      toast.success('Register successfully!!! 🎉🎉🎉');

      setTimeout(() => {
        navigate('/auth/new-info');
      }, 2500);
    } catch (error: any) {
      const err = error as AuthErrorState;
      const errContent = `${err.data}!!! ❌❌❌` || 'Something went wrong!!! ❌❌❌';
      toast.error(errContent);
      console.error('Something went wrong!!! ❌❌❌', err);
    }
  };

  return (
    <section className="theme-public-hidden">
      <RegisterForm submitForm={handleSubmitValues} />
    </section>
  );
}

export default Register;
