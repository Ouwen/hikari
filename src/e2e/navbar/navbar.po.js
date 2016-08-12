'use strict';

var Navbar = function () {
  this.navbar = element(by.css('[aria-label=Navbar]'));
  this.home = this.navbar.element(by.css('[aria-label="Navbar Home"]'));
  this.signup = this.navbar.element(by.css('[aria-label="Navbar Signup"]'));
  this.login = this.navbar.element(by.css('[aria-label="Navbar Login"]'));
  this.logout = this.navbar.element(by.css('[aria-label="Navbar Logout"]'));
  // Because of the way this Sidebar FAB is selected, this sidebar toggle will still be selected
  // even when a different navbar is used.
  this.sidebar_toggle = element(by.css('[aria-label="Navbar Sidebar"]'));
  this.backdrop = element(by.css('md-backdrop'));
};

module.exports = Navbar;
