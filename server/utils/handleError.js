const handleErrors = (error) => {
  let errors = { email: "", password: "" };

  if (error.code === 11000) {
    errors.email = "Duplicate Email. Already in use";
    return errors;
  }

  if (error.message.includes("UserData validation failed")) {
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  if (error.message.includes("Incorrect Password")) {
    errors.password = "Incorrect Password";
  }
  if (error.message.includes("Incorrect Email")) {
    errors.email = "Incorrect Email";
  }

  return errors;
};

module.exports = handleErrors;
