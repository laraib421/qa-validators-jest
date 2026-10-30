/**
 * Reusable form validators. Each returns { valid: boolean, error?: string }.
 */
const ok = () => ({ valid: true });
const fail = (error) => ({ valid: false, error });

function isEmail(value) {
  if (typeof value !== 'string' || !value.trim()) return fail('Email is required');
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return re.test(value.trim()) ? ok() : fail('Invalid email format');
}

function isStrongPassword(value) {
  if (typeof value !== 'string' || value.length === 0) return fail('Password is required');
  if (value.length < 8) return fail('Password must be at least 8 characters');
  if (!/[A-Z]/.test(value)) return fail('Password needs an uppercase letter');
  if (!/[a-z]/.test(value)) return fail('Password needs a lowercase letter');
  if (!/\d/.test(value)) return fail('Password needs a number');
  if (!/[^A-Za-z0-9]/.test(value)) return fail('Password needs a special character');
  return ok();
}

/** Pakistani mobile numbers: 03XXXXXXXXX or +923XXXXXXXXX */
function isPkPhone(value) {
  if (typeof value !== 'string' || !value.trim()) return fail('Phone is required');
  const cleaned = value.replace(/[\s-]/g, '');
  return /^(\+92|0)3\d{9}$/.test(cleaned) ? ok() : fail('Invalid Pakistani mobile number');
}

/** Pakistani CNIC: 12345-1234567-1 */
function isCnic(value) {
  if (typeof value !== 'string' || !value.trim()) return fail('CNIC is required');
  return /^\d{5}-\d{7}-\d$/.test(value.trim()) ? ok() : fail('CNIC must be in 12345-1234567-1 format');
}

function inRange(value, min, max) {
  const n = Number(value);
  if (value === '' || value === null || value === undefined || Number.isNaN(n)) return fail('Must be a number');
  if (n < min || n > max) return fail(`Must be between ${min} and ${max}`);
  return ok();
}

function isFutureDate(value, now = new Date()) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return fail('Invalid date');
  return d > now ? ok() : fail('Date must be in the future');
}

module.exports = { isEmail, isStrongPassword, isPkPhone, isCnic, inRange, isFutureDate };
