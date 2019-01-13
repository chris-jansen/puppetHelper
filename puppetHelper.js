var self = module.exports = {
  puppeteerInitSettings: {
    headless: false,
    slowMo: 10,
    args: [
      '--disable-infobars',
      '--start-maximized'
    ]
  },
  setViewport: async function (page) {
    await page.setViewport({
      width: 1920,
      height: 970
    });
  },
  /**
   * @name : async function: iframePopup
   * @author : Chris Jansen
   * @description : This function returns the frame object of the frame with URL includes the pageNumber.
   * @since  11-JAN-2019
   * 
   * @param {frameScope}    object | Passes the frameScope to check the frame URL.
   * @param {pageNumber}    var    | The pageNumber will check the URL of the available frames that have that pageNumber.
   * 
   * @return {frame} object.
   */
  iframePopup: async function ({
    frameScope,
    pageNumber
  }) {
    await frameScope.waitFor(500);
    var iframe = await frameScope.frames().find(f => f.url().includes(`:${pageNumber}:`))
    return iframe;
  },
  /**
   * @name : async function: radioButton
   * @author : Chris Jansen
   * @description : With this function it's possible to click a radioButton.
   * @since  11-JAN-2019
   * 
   * @param {frameScope}    object | Passes the frameScope to evaluate on the correct page.
   * @param {selector}      var    | The selector of the radioButton you want to click.
   */
  radioButton: async function ({
    frameScope,
    selector
  }) {
    await frameScope.evaluate(function (selector) {
      var radioButton = $(selector);
      radioButton.click();
    }, selector);
  },
  /**
   * @name : async function: checkBox
   * @author : Chris Jansen
   * @description : With this function its possible to check or uncheck checkboxes.
   * @since  11-JAN-2019
   * 
   * @param {frameScope}        object | Passes the frameScope to evaluate on the correct page.
   * @param {mainSelector}      var    | The mainSelector of the checkboxes you want to check or uncheck.
   * @param {checked_Y_N}       var    | 'Y' or 'N' if 'Y' it will check if the checkBoxes of the given arrCheckBoxValues are checked if not it wil do so. if 'N' its the other way arround.
   * @param {arrCheckBoxValues} Arry   | List of all checkBoxValues you want to have checked or unchecked depending on the checked_Y_N parameter.
   * 
   */
  checkBox: async function ({
    frameScope,
    mainSelector,
    arrCheckBoxValues,
    checked_Y_N
  }) {
    await frameScope.evaluate(async function (mainSelector, arrCheckBoxValues, checked_Y_N) {
      $.each(arrCheckBoxValues, function (index, checkBoxValue) {
        let checkbox = $(`${mainSelector} :input[value="${checkBoxValue}"]`)
        let checkBoxIsChecked = $(`${mainSelector} :input[value="${checkBoxValue}"]`).prop('checked');
        if (checked_Y_N === 'Y' && checkBoxIsChecked === false) {
          checkbox.click();
        }
        if (checked_Y_N === 'N' && checkBoxIsChecked === true) {
          checkbox.click();
        }
      });
    }, mainSelector, arrCheckBoxValues, checked_Y_N);
  }
}