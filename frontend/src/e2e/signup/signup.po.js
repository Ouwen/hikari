'use strict';

var Signup = function () {

  this.main = element(by.css('[aria-label="Signup Card"]'));
  this.name = this.main.element(by.model('user.name'));
  this.email = this.main.element(by.model('user.email'));
  this.password = this.main.element(by.model('user.password'));
  this.confirm = this.main.element(by.model('user.confirmPassword'));
  this.token = this.main.element(by.model('user.securityToken'));
  this.submit = element(by.css('[aria-label="Signup Submit"]'));

  this.name_error = this.main.element(by.css('[aria-label="Signup Name Error Message"]'));
  this.name_error_required = this.name_error.element(by.css('[ng-message="required"]'));

  this.email_error = this.main.element(by.css('[aria-label="Signup Email Error Message"]'));
  this.email_error_required = this.email_error.element(by.css('[ng-message="required"]'));
  this.email_error_invalid = this.email_error.element(by.css('[ng-message="email"]'));

  this.password_error = this.main.element(by.css('[aria-label="Signup Password Error Message"]'));
  this.password_error_required = this.password_error.element(by.css('[ng-message="required"]'));
  this.password_error_invalid = this.password_error.element(by.css('[ng-message="minlength"]'));

  this.confirm_error = this.main.element(by.css('[aria-label="Signup Confirm Password Error Message"]'));
  this.confirm_error_required = this.confirm_error.element(by.css('[ng-message="required"]'));
  this.confirm_error_invalid = this.confirm_error.element(by.css('[ng-message="pattern"]'));
};

module.exports = Signup;
