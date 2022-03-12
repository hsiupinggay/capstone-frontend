// Validates email via regex
// Used in login/signup auth inputs
const validateEmail = (input) => {
  // eslint-disable-next-line no-useless-escape
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (input.match(mailformat)) return true;
  return false;
};

// Get initials of user
// Used for Avatar when there's no photo
const getNameInitials = (first, last) => {
  const getFirstLetter = (nameString) => nameString.split('', 1);
  const letter1 = getFirstLetter(first);
  const letter2 = getFirstLetter(last);
  return letter1.concat(letter2);
};
export { validateEmail, getNameInitials };
