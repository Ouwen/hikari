'use strict'

var Navbar = require('./navbar.po.js');
var Signup = require('../signup/signup.po.js');
var Login = require('../login/login.po.js');
var Sidebar = require('../sidebar/sidebar.po.js');

describe('Navbar directive', function () {
  var navbar = new Navbar();
  var signup = new Signup();
  var login = new Login();
  var sidebar = new Sidebar();

  browser.driver.manage().window().setSize(1920, 1080);
  browser.get('/');

  it('should display and function properly on the home page when logged out', function () {
    expect(navbar.navbar.isDisplayed()).toBe(true);
    expect(navbar.home.isDisplayed()).toBe(true);
    expect(navbar.signup.isDisplayed()).toBe(true);
    expect(navbar.login.isDisplayed()).toBe(true);
    expect(navbar.logout.isDisplayed()).toBe(false);
    expect(navbar.sidebar_toggle.isDisplayed()).toBe(true);

    navbar.signup.click();
    expect(signup.main.isDisplayed()).toBe(true);
    navbar.login.click();
    expect(signup.main.isPresent()).toBe(false);
    expect(login.main.isDisplayed()).toBe(true);
    navbar.home.click();
    expect(signup.main.isPresent()).toBe(false);
    expect(login.main.isPresent()).toBe(false);
  });
});
