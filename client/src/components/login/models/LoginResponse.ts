type LoginResponse = {
  userId: string;
  name: string;
  email: string;
  roleId: number;
  token: string;
  acceptedUser: boolean;
};

export default LoginResponse;
