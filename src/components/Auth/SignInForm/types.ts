export interface SignInProps {
  handleSubmitChange: (params: SignInTypes) => void;
  loading: boolean;
}

export interface SignInTypes {
  email: string;
  password: string;
}
