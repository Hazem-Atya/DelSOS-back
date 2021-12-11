export const URLS = {
  confirmMail: (token: string) => {
    return `http://localhost:3000/auth/confirm?token=${token}`;
  },
  forgotPasswordMail: (token: string) => {
    return `http://localhost:3000/front-end/forgotPassword?token=${token}`;
  },
};
