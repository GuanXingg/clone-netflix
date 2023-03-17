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
