import * as bcrypt from 'bcrypt';

export const generateHash = async (text: string): Promise<string> => {
  return await bcrypt.hash(text, 'jovan');
};
