export interface SubmitValues {
  email: string;
  password: string;
}

export interface SubmitForm extends SubmitValues {
  repass?: string;
}
