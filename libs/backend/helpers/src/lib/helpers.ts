import * as bcrypt from 'bcrypt';

export const generateHash = async (text: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);

  return await bcrypt.hash(text, salt);
};
