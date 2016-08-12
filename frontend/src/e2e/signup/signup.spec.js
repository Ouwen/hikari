var Signup = require('./signup.po.js');

describe('Signup Tests', function () {
  var signup = new Signup();

  browser.driver.manage().window().setSize(1920, 1080);
  browser.get('/#/signup');

  it('should load', function () {
    expect(signup.main.isDisplayed()).toBe(true);
    expect(signup.name.isDisplayed()).toBe(true);
    expect(signup.email.isDisplayed()).toBe(true);
    expect(signup.password.isDisplayed()).toBe(true);
    expect(signup.confirm.isDisplayed()).toBe(true);
    expect(signup.submit.isDisplayed()).toBe(true);

    expect(signup.name_error.isDisplayed()).toBe(false);
    expect(signup.email_error.isDisplayed()).toBe(false);
    expect(signup.password_error.isDisplayed()).toBe(false);
    expect(signup.confirm_error.isDisplayed()).toBe(false);
  });

  it('should properly display errors for lacking required input', function () {
    signup.submit.click();
    expect(signup.name_error_required.isDisplayed()).toBe(true);
    expect(signup.email_error_required.isDisplayed()).toBe(true);
    expect(signup.password_error_required.isDisplayed()).toBe(true);
  });
});
