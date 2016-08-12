'use strict';

var Login = require('./login.po');

describe('Login directive', function () {
  var login = new Login();
  var baseUrl = browser.baseUrl;

  browser.driver.manage().window().setSize(1920, 1080);
  browser.get('/#/login');

  it('should show correct data while logged out', function () {
    expect(login.main.isDisplayed()).toBe(true);
    expect(login.email.isDisplayed()).toBe(true);
    expect(login.password.isDisplayed()).toBe(true);
    expect(login.submit.isDisplayed()).toBe(true);
    expect(login.recover.isDisplayed()).toBe(true);

    expect(login.email_error.isDisplayed()).toBe(false);
    expect(login.email_error_require.isPresent()).toBe(false);
    expect(login.email_error_valid.isPresent()).toBe(false);
    expect(login.password_error.isDisplayed()).toBe(false);
    expect(login.password_error_require.isPresent()).toBe(false);
    login.submit.click();

    expect(login.email_error_require.isDisplayed()).toBe(true);
    expect(login.password_error_require.isDisplayed()).toBe(true);
  });

  it('should fail with improper login', function () {
    login.loginTest('fail@fail.com', 'fail');
    expect(login.main.isDisplayed()).toBe(true);
    expect(login.password_error_invalid.isDisplayed()).toBe(true);
  });

  it('should log in properly', function () {
    login.login();
    expect(login.main.isPresent()).toBe(false);
    expect(browser.getCurrentUrl()).toBe(baseUrl + '/#/');
  });
});
