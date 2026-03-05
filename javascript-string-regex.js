// Validate email
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

console.log(isValidEmail("test@gmail.com")); // true
console.log(isValidEmail("test@gmail"));     // false
console.log(isValidEmail("test@.com"));      // false

// Validate password
function isValidPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}

console.log(isValidPassword("Password1!")); // true
console.log(isValidPassword("password"));   // false
console.log(isValidPassword("PASSWORD1!")); // false
console.log(isValidPassword("Pass1!"));     // false

