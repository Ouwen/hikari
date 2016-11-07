'use strict';

var Sidebar = require('./sidebar.po.js');
var Login = require('../login/login.po.js');
var Navbar = require('../navbar/navbar.po.js');

describe('Sidebar directive', function () {
  var sidebar = new Sidebar();
  var login = new Login();
  var navbar = new Navbar();
  var baseUrl = browser.baseUrl;
  var EC = protractor.ExpectedConditions;

  browser.driver.manage().window().setSize(1920, 1080);
  browser.get('/');

  it('should display proper elements when logged out', function () {
    navbar.sidebar_toggle.click();
    expect(sidebar.sidebar.isDisplayed()).toBe(true);
    expect(sidebar.help.isDisplayed()).toBe(true);
    expect(sidebar.signup.isDisplayed()).toBe(true);
    expect(sidebar.login.isDisplayed()).toBe(true);
    expect(sidebar.logout.isDisplayed()).toBe(false);
    navbar.backdrop.click();
  });

  it('should navigate properly while logged out', function () {
    navbar.sidebar_toggle.click();
    sidebar.signup.click();

    expect(browser.getCurrentUrl()).toBe(baseUrl + '/#/signup');
    navbar.sidebar_toggle.click();
    sidebar.login.click();
    expect(browser.getCurrentUrl()).toBe(baseUrl + '/#/login');

    navbar.sidebar_toggle.click();
    sidebar.help.click();
    expect(browser.getCurrentUrl()).toBe(baseUrl + '/#/help');
  });

  fit('should properly update when logged in', function () {
    browser.get('/#/login');
    login.login();

    navbar.sidebar_toggle.click();
    expect(sidebar.sidebar.isDisplayed()).toBe(true);
    expect(sidebar.help.isDisplayed()).toBe(true);
    expect(sidebar.logout.isDisplayed()).toBe(true);

    expect(sidebar.signup.isDisplayed()).toBe(false);
    expect(sidebar.login.isDisplayed()).toBe(false);
    sidebar.account_settings.click();

    expect(browser.getCurrentUrl()).toBe(baseUrl + '/#/settings/account');
  });

  it('should navigate properly while logged in', function () {
    navbar.sidebar_toggle.click();
    sidebar.logout.click();
    expect(browser.getCurrentUrl()).toBe(baseUrl + '/#/login');
  });

});
