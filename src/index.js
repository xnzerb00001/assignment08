const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Navigate to the registration page
    await page.goto('https://onlineservices.cdtfa.ca.gov/ClearSession');
    
    // 1. "Sign Up Now" (click Button)
    await page.getByRole('button', { name: 'Sign Up Now' }).click();
    // 2. "Register a New Business Activity" (click Link)
    await page.getByText('Register a New Business Activity', { exact: true }).click();
    // 3. "I am the owner of the business" (check Check Box - Radio)
    await page.getByRole('radio', { name: 'I am the owner of the business' }).check();
    // 4. "Next" (click Button)
    await page.getByRole('button', { name: 'Next' }).click();
    // 5. "No" (click Button)
    await page.getByRole('button', { name: 'No' }).click();
    // 6. "Next" (click Button)
    await page.getByRole('button', { name: 'Next' }).click();

    // 7. Fill in "Your Information"
    await page.click('#r-01');
    await page.locator('#r-01').selectOption('NUSID');
    await page.locator('#r-31').fill("testing1");
    await page.locator('#r-41').fill("CHAN");
    await page.locator('#r-51').fill("TAI MAN");
    await page.getByRole('button', { name: 'No' }).click();
    // 8. "Next" (click Button)
    await page.getByRole('button', { name: 'Next' }).click();

    // 9. Fill in "Enter your address"
    await page.locator('#r-k1').fill("1 1ST ST");
    await page.locator('#r-n1').fill("San Francsico");
    await page.locator('#r-p1').fill("94105-2401");
    await page.getByRole('button', { name: 'Verify Address' }).click();
    try {
        // Properly wait for 'Verified' with timeout handling
        const requireManualVerification = page.getByText('Verified', { exact: true });
        await requireManualVerification.waitFor({ state: 'visible', timeout: 10000 });
        console.log('Your inputted address is not found and requires manual verification');
        await requireManualVerification.click();
        console.log('"Verified" button clicked');
    } catch (error) {
        if (error.name === 'TimeoutError') {
            console.log('Your inputted address is found and has been verified');
        } else {
            console.log('Address Verification status:', error.message);
        }
    }
    // 10. "Next" (click Button)
    await page.getByRole('button', { name: 'Next' }).click();

    // 11. Fill in "Login Information"
    await page.locator('#r-62').fill("CHANtaiman");
    await page.locator('#r-72').fill("CHANtaiman");
    await page.locator('#r-a2').fill("@CD123456it");
    await page.locator('#r-b2').fill("@CD123456it");
    await page.click('#r-e2');
    await page.locator('#r-e2').selectOption('SQ18');
    await page.locator('#r-f2').fill("happydog");
    await page.locator('#r-g2').fill("happydog");
    // 12. "Next" (click Button)
    await page.getByRole('button', { name: 'Next' }).click();

    // 13. Fill in "Contact Information"
    await page.locator('#r-t2').fill("CHANtaiman@gmail.com");
    await page.locator('#r-u2').fill("CHANtaiman@gmail.com");
    await page.click('#r-w2');
    await page.locator('#r-w2').selectOption('CELL');
    await page.locator('#r-x2').fill("415-321-9876");
    // 14. "Next" (click Button)
    await page.getByRole('button', { name: 'Next' }).click();

    // 15. Fill in "Authenticatioin Information"
    await page.locator('#r-b3').check();
    await page.locator('#r-h3').fill("CHANtaiman@gmail.com");
    await page.locator('#r-i3').fill("CHANtaiman@gmail.com");
    // commented out to prevent creating real account,
    //   just for testing for now
    //await page.getByRole('button', { name: 'Save Draft' }).click();

    // should get confirmation code if everything is correct
    //email: chantaiman@gmail.com and confirmation code: mxm5zc.
  
    await page.waitForTimeout(60000);

    console.log('All actions completed successfully!');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();