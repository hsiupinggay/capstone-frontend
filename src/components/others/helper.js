const validateEmail = (input) => {
  // eslint-disable-next-line no-useless-escape
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (input.match(mailformat)) return true;
  return false;
};

export default validateEmail;
