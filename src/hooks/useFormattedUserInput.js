const useFormattedUserInput = (
  { email, password, confirmPassword, firstName, lastName, profilePicture },
  isFromRegister
) => {
  const lowercaseEmail = email.trim().toLowerCase();
  const fullName = `${firstName}${lastName ? " " + lastName : ""}`;
  if (isFromRegister)
    return {
      fullName,
      email: lowercaseEmail,
      password,
      confirmPassword,
      profilePicture,
    };
  return {
    email: lowercaseEmail,
    password,
  };
};

export default useFormattedUserInput;
