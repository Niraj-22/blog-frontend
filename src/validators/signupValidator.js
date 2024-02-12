const signupValidator = ({ name, email, password, confirmPassword }) => {
  const errors = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  if (!name) {
    errors.name = "Name is required";
  }

  if (!email) {
    errors.email = "Email is required";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password length must be greater than 6 ";
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Password does not match";
  }

  return errors;
};

export default signupValidator;
