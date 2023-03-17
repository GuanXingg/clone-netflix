import axiosClient from '~/app/axiosClient';
import { SubmitValues, UserInfoProps } from './interface';

const authApi = {
  register(data: SubmitValues) {
    const url = '/register';
    return axiosClient.post(url, data);
  },
  updateInfo(data: UserInfoProps, id: string, accessToken: string) {
    const url = `/600/users/${id}`;
    return axiosClient.patch(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default authApi;
