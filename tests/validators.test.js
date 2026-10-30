const v = require('../src/validators');

describe('isEmail', () => {
  test.each(['qa@test.com', 'laraib.dev@mail.co', '  user+tag@site.org '])('accepts %s', (e) => {
    expect(v.isEmail(e).valid).toBe(true);
  });
  test.each(['', '   ', 'plain', 'a@b', 'a@b.c', 'two@@at.com', 'sp ace@x.com'])('rejects "%s"', (e) => {
    expect(v.isEmail(e).valid).toBe(false);
  });
  test('rejects non-strings', () => {
    expect(v.isEmail(null)).toEqual({ valid: false, error: 'Email is required' });
  });
});

describe('isStrongPassword', () => {
  test('accepts a strong password', () => {
    expect(v.isStrongPassword('Qa@12345')).toEqual({ valid: true });
  });
  test.each([
    ['', 'Password is required'],
    ['Ab1!', 'Password must be at least 8 characters'],
    ['qa@12345', 'Password needs an uppercase letter'],
    ['QA@12345', 'Password needs a lowercase letter'],
    ['Qa@abcde', 'Password needs a number'],
    ['Qa123456', 'Password needs a special character'],
  ])('"%s" -> %s', (pw, msg) => {
    expect(v.isStrongPassword(pw).error).toBe(msg);
  });
  test('boundary: exactly 8 chars passes', () => {
    expect(v.isStrongPassword('Aa1!aaaa').valid).toBe(true);
  });
});

describe('isPkPhone', () => {
  test.each(['03001234567', '+923001234567', '0300-1234567', '0300 123 4567'])('accepts %s', (p) => {
    expect(v.isPkPhone(p).valid).toBe(true);
  });
  test.each(['', '0300123456', '04001234567', '+9230012345678', 'abc'])('rejects "%s"', (p) => {
    expect(v.isPkPhone(p).valid).toBe(false);
  });
});

describe('isCnic', () => {
  test('accepts valid CNIC', () => expect(v.isCnic('41303-1234567-8').valid).toBe(true));
  test.each(['', '4130312345678', '41303-123456-8', 'abcde-1234567-8'])('rejects "%s"', (c) => {
    expect(v.isCnic(c).valid).toBe(false);
  });
});

describe('inRange (boundary value analysis)', () => {
  test.each([[18, true], [17, false], [60, true], [61, false], ['30', true]])('%s -> %s', (n, expected) => {
    expect(v.inRange(n, 18, 60).valid).toBe(expected);
  });
  test.each(['', null, undefined, 'abc'])('rejects non-number %s', (n) => {
    expect(v.inRange(n, 0, 10).error).toBe('Must be a number');
  });
});

describe('isFutureDate', () => {
  const now = new Date('2026-01-01T00:00:00Z');
  test('future date passes', () => expect(v.isFutureDate('2026-06-01', now).valid).toBe(true));
  test('past date fails', () => expect(v.isFutureDate('2025-06-01', now).error).toBe('Date must be in the future'));
  test('invalid date fails', () => expect(v.isFutureDate('not-a-date', now).error).toBe('Invalid date'));
  test('defaults to current time', () => expect(v.isFutureDate('2999-01-01').valid).toBe(true));
});
