/*
 * ========================================================
 * ========================================================
 *
 *          Ensure email input is valid on signup
 *
 * ========================================================
 * ========================================================
 */
export default function validateEmail(input) {
  // eslint-disable-next-line no-useless-escape
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (input.match(mailformat)) return true;
  return false;
}

/*
 * ========================================================
 * ========================================================
 *
 *                  Get user initials
 *           For profile avatar when no photo
 *
 * ========================================================
 * ========================================================
 */
const getNameInitials = (first, last) => {
  const getFirstLetter = (nameString) => nameString.split('', 1);
  const letter1 = getFirstLetter(first);
  const letter2 = getFirstLetter(last);
  return letter1.concat(letter2);
};

/*
 * ========================================================
 * ========================================================
 *
 *             Get user initials
 *        For profile avatar when no photo
 * ========================================================
 * ========================================================
 */
const getDate = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export { validateEmail, getNameInitials, getDate };
