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

    await page.waitForTimeout(600000);
    
    console.log('All actions completed successfully!');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
