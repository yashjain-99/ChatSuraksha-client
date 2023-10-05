const useValidate = (formData, isFromRegister) => {
  let error = null;
  let isValid = true;

  const { firstName, email, password, confirmPassword } = formData;

  if (isFromRegister) {
    if (!firstName || !email || !password || !confirmPassword) {
      error = "All fields are required";
    } else if (password !== confirmPassword) {
      error = "Passwords do not match";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        error = "Invalid email";
      } else {
        const passwordRegex =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{6,}$/;
        if (!passwordRegex.test(password)) {
          error =
            "Password must contain at least 6 characters, 1 uppercase letter, 1 lowercase letter, and 1 number";
        }
      }
    }
  } else {
    if (!email || !password) {
      error = "All fields are required";
    }
  }
  isValid = error === null;
  return { error, isValid };
};

export default useValidate;
