'use strict';

var Settings = require('./settings.po.js');
var Login = require('../login/login.po.js');
var Sidebar = require('../sidebar/sidebar.po.js');
var Navbar = require('../navbar/navbar.po.js');

describe('Settings cards', function () {
  var login = new Login();
  var sidebar = new Sidebar();
  var navbar = new Navbar();
  var settings = new Settings();
  var EC = protractor.ExpectedConditions;

  browser.get('/#/login');
  login.login();

  it('should login and navigate to / show account settings page', function () {
    navbar.sidebar_toggle.click();
    sidebar.account_settings.click();

    expect(settings.details_card.isDisplayed()).toBe(true);
    expect(settings.password_card.isDisplayed()).toBe(true);
  });

  it('should display errors for empty inputs in user details', function () {
    settings.name_input.clear();
    settings.email_input.clear();
    settings.update_details.click();

    expect(settings.name_required_error.isDisplayed()).toBe(true);
    expect(settings.email_required_error.isDisplayed()).toBe(true);
  });

  it('should display an error for empty old & new password', function () {
    settings.submit_password_change.click();

    expect(settings.new_password_required_error.isDisplayed()).toBe(true);
  });

  it('should display an error for a password that is too short', function () {
    settings.new_password.sendKeys("v");
    settings.password_confirmation.sendKeys("v");

    expect(settings.new_password_size_error.isDisplayed()).toBe(true);
  });

  it('should display an error for a password confirmation mismatch', function () {
    settings.new_password.sendKeys("crimson");
    settings.password_confirmation.sendKeys("cerulean");

    expect(settings.password_confirmation_mismatch_error.isDisplayed()).toBe(true);
  });
});
