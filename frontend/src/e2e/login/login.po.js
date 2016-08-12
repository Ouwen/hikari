'use strict';

var Login = function () {

  this.main = element(by.css('[aria-label="Login Card"]'));
  this.email = this.main.element(by.model('user.email'));
  this.password = this.main.element(by.model('user.password'));
  this.submit = this.main.element(by.css('[aria-label="Login Submit"]'));
  this.recover = this.main.element(by.css('[aria-label="Forgot Password"]'));

  this.email_error = this.main.element(by.css('[aria-label="Login Email Error"]'));
  this.email_error_require = this.email_error.element(by.css('[aria-label="Login Email Required"]'));
  this.email_error_valid = this.email_error.element(by.css('[aria-label="Login Email Invalid"]'));
  this.password_error = this.main.element(by.css('[aria-label="Login Password Error"]'));
  this.password_error_require = this.password_error.element(by.css('[aria-label="Login Password Required"]'));
  this.password_error_invalid = this.password_error.element(by.css('[aria-label="Login Password Invalid"]'));

  this.loginTest = function (email, password) {
    this.email.clear();
    this.password.clear();
    this.email.sendKeys(email);
    this.password.sendKeys(password);
    this.submit.click();
  };

  this.login = function () {
    this.loginTest('test@test.com', 'testtest');
  };

};

module.exports = Login;
