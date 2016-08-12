'use strict';

var Sidebar = function () {
  this.sidebar = element(by.css('[aria-label=Sidebar]'));
  this.help = this.sidebar.element(by.css('[aria-label="Sidebar Help"]'));
  this.account_settings = this.sidebar.element(by.css('[aria-label="Sidebar Account Settings"]'));
  this.signup = this.sidebar.element(by.css('[aria-label="Sidebar Signup"]'));
  this.login = this.sidebar.element(by.css('[aria-label="Sidebar Login"]'));
  this.logout = this.sidebar.element(by.css('[aria-label="Sidebar Logout"]'));
};

module.exports = Sidebar;
