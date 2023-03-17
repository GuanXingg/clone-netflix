import axiosClient from '~/app/axiosClient';
import { SubmitValues } from './interface';

const authApi = {
  register(data: SubmitValues) {
    const url = '/register';
    return axiosClient.post(url, data);
  },
};

export default authApi;
