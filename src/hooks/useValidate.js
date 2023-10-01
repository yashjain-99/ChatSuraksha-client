const useValidate = (
  { firstName, lastName, email, password, confirmPassword },
  isFromRegister
) => {
  let error = null;
  let isValid = true;
  if (isFromRegister) {
    if (!firstName || !email || !password || !confirmPassword) {
      error = "All fields are required";
      return { error, isValid: false };
    }

    if (password !== confirmPassword) {
      error = "Passwords do not match";
      return { error, isValid: false };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      error = "Invalid email";
      return { error, isValid: false };
    }

    // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    // if (!passwordRegex.test(password)) {
    //   error =
    //     "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number";

    //   return { error, isValid: false };
    // }
  } else {
    if (!email || !password) {
      error = "All fields are required";
      return { error, isValid: false };
    }
  }
  return { error, isValid };
};

export default useValidate;
