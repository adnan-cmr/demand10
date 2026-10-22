/**
 * Validates if an email is a business email (not from common personal email providers)
 * @param {string} email - The email address to validate
 * @returns {boolean} - True if it's a business email, false otherwise
 */
export const isBusinessEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }

  const personalEmailDomains = [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'aol.com',
    'icloud.com',
    'mail.com',
    'protonmail.com',
    'yandex.com',
    'qq.com',
    '163.com',
    '126.com',
    'sina.com',
    'sohu.com',
    'live.com',
    'msn.com',
    'comcast.net',
    'verizon.net',
    'att.net',
    'me.com',
    'mac.com'
  ];

  const domain = email.split('@')[1].toLowerCase();
  return !personalEmailDomains.includes(domain);
};

/**
 * Validates email format
 * @param {string} email - The email address to validate
 * @returns {boolean} - True if email format is valid
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};