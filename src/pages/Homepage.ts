import Page from './Page';

class Homepage extends Page {

  get searchInput()   { return $('input.gLFyf'); }
  get searchButton()  { return $('input.gNO89b'); }
  get resultsList()   { return $('#resultStats'); }

  open() {
      super.open('https://google.com');
      browser.pause(1000);
  }

  enterText(item) {
    this.searchInput.clearValue();
    this.searchInput.setValue(item);
    browser.pause(1000);
  }

  clickOnSearchButton() {
    this.searchButton.click();
  }

  hasResults(): boolean {
    this.resultsList.waitForDisplayed(1000);
    return this.resultsList.isDisplayed();
  }
}

export default new Homepage();