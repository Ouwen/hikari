'use strict;'

var Settings = function () {
  this.details_card = element(by.css('[aria-label="Details Card"]'));
  this.account_details_form = this.details_card.element(by.css('[aria-label="Account Details Form"]'));
  this.name_input = this.account_details_form.element(by.css('[aria-label="Name Input"]'));
  this.name_errors = this.account_details_form.element(by.css('[aria-label="Name Errors"]'));
  this.name_required_error = this.name_errors.element(by.css('[aria-label="Name Required Error"]'));
  this.email_input = this.account_details_form.element(by.css('[aria-label="Email Input"]'));
  this.email_errors = this.account_details_form.element(by.css('[aria-label="Email Errors"]'));
  this.email_required_error = this.email_errors.element(by.css('[aria-label="Email Required Error"]'));
  this.email_format_error = this.email_errors.element(by.css('[aria-label="Email Format Error"]'));
  this.update_details = this.account_details_form.element(by.css('[aria-label="Update Details Button"]'));
  this.password_card = element(by.css('[aria-label="Password Card"]'));
  this.password_change_form = this.password_card.element(by.css('[aria-label="Password Change Form"]'));
  this.new_password = this.password_change_form.element(by.css('[aria-label="Password Input"]'));
  this.new_password_errors = this.password_change_form.element(by.css('[aria-label="Password Errors"]'));
  this.new_password_size_error = this.new_password_errors.element(by.css('[aria-label="Password Length Error"]'));
  this.new_password_required_error = this.new_password_errors.element(by.css('[aria-label="Password Required Error"]'));
  this.password_confirmation = this.password_change_form.element(by.css('[aria-label="Password Confirmation"]'));
  this.password_confirmation_errors = this.password_change_form.element(by.css('[aria-label="Password Confirmation Errors"]'));
  this.password_confirmation_mismatch_error = this.password_confirmation_errors.element(by.css('[aria-label="Password Confirmation Mismatch Error"]'));
  this.submit_password_change = this.password_change_form.element(by.css('[aria-label="Password Change Button"]'));
};

module.exports = Settings;
