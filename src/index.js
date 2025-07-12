const { chromium } = require('playwright');

(async () => {
  // Launch browser in non-headless mode for debugging
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 1024 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  });
  
  const page = await context.newPage();
  
  try {
    console.log('Navigating to registration page...');
    await page.goto('https://onlineservices.cdtfa.ca.gov/_/#2', { waitUntil: 'domcontentloaded' });
    
    // Wait for page to stabilize
    await page.waitForTimeout(3000);
    
    console.log('Clicking registration link...');
    // Locate registration link by text content
    const registerLink = page.locator('a:has-text("Register")').first();
    await registerLink.click();
    
    // Wait for registration form to load
    await page.waitForLoadState('networkidle', { timeout: 15000 });
    
    console.log('Filling registration form...');
    // Fill form fields - update selectors based on actual form
    await page.locator('input[name="username"]').fill('testing00001');
    await page.locator('input[name="password"]').fill('pw23456789');
    await page.locator('input[name="confirmPassword"]').fill('pw23456789');
    
    // Fill additional required fields with dummy data
    await page.locator('input[name="firstName"]').fill('Test');
    await page.locator('input[name="lastName"]').fill('User');
    await page.locator('input[name="email"]').fill('testing00001@example.com');
    await page.locator('input[name="phone"]').fill('555-123-4567');
    
    console.log('Submitting form...');
    // Submit form - might need to adjust selector
    await page.locator('button:has-text("Submit")').click();
    
    // Wait for success confirmation
    await page.waitForSelector('.confirmation-message', { timeout: 20000 });
    console.log('Registration successful!');
    
    // Take screenshot as proof
    await page.screenshot({ path: 'registration-success.png' });
    
  } catch (error) {
    console.error('Error during registration:', error);
    await page.screenshot({ path: 'registration-error.png' });
  } finally {
    await browser.close();
  }
})();
