export class EmailUtils {
    static isEmail(input: string): boolean {
      const emailRegex: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      return emailRegex.test(input);
    }
  }