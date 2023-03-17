export interface SubmitValues {
  email: string;
  password: string;
}

export interface SubmitForm extends SubmitValues {
  repass?: string;
}

// ====================
export interface AuthResponseState {
  status: number | unknown;
  data: any;
}

export interface AuthErrorState {
  code: string | unknown;
  status: number | unknown;
  name: string;
  message: string;
  data: any;
}

// ====================
export interface NewInfoValues {
  fullName: string;
  gender: string;
  phone: string;
}

// ====================
export interface UserInfoProps {
  email?: string;
  password?: string;
  fullName?: string;
  gender?: string;
  phone?: string;
}
