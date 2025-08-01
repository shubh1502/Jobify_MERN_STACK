import bcrypt from "bcryptjs";

const comparePass = async (password, hashPassword) => {
  const isMatch = await bcrypt.compare(password, hashPassword);
  return isMatch;
};

export default comparePass;
