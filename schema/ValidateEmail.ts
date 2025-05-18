export const validateEmail = (email: string) => {
    const basicFormatValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!basicFormatValid) return false;
    const hasValidDomain = email.indexOf('.') !== email.lastIndexOf('@') + 1; 
    const hasTLD = email.lastIndexOf('.') < email.length - 2; 
    const noConsecutiveDots = !email.includes('..');
    return basicFormatValid && hasValidDomain && hasTLD && noConsecutiveDots;
  };