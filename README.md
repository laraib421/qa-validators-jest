# ✅ QA Validators — Jest Unit Testing

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![CI](https://github.com/laraib421/qa-validators-jest/actions/workflows/tests.yml/badge.svg)

A small form-validation library (email, strong password, Pakistani phone & CNIC, number range, future date) with **46 unit tests and 100% code coverage** written in Jest.

## 🧠 Test design techniques used
- **Equivalence partitioning** — valid vs. invalid input classes
- **Boundary value analysis** — e.g. age 17/18 and 60/61, password length 8
- **Data-driven tests** with `test.each`
- **Deterministic time** — injectable `now` for date tests
- **Coverage gates** enforced in CI (Node 18 / 20 / 22 matrix)

## 🚀 Run
```bash
npm install
npm test
npm run test:coverage
```

## 📦 Usage
```js
const { isEmail, isStrongPassword } = require('./src/validators');
isEmail('qa@test.com');          // { valid: true }
isStrongPassword('weak');        // { valid: false, error: 'Password must be at least 8 characters' }
```
