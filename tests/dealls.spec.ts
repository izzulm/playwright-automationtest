import { test, expect } from '@playwright/test';
import { deallsPage } from '../pages/dealls.page';
import { signIn } from '../helper/sign_in';
import { format } from 'date-fns';
import { faker } from '@faker-js/faker';


test('User should able to book a schedule', async ({ page }) => {
  const deallsPages = new deallsPage(page);

  // Sign In Process
  await signIn(page);

  // Filter By Readiness - Ketersediaan Terdekat
  await expect(deallsPages.filterByReadiness.nth(0)).toBeVisible();
  await deallsPages.filterByReadiness.nth(0).click();
  await deallsPages.ketersediaanTerdekat.click();
  await expect(deallsPages.ketersediaanTerdekat).toHaveAttribute('aria-selected', 'true');

  // Choose the first mentor
  await expect(deallsPages.mentorCard.nth(0)).toBeVisible();
  await deallsPages.mentorCard.nth(0).click();

  // Fill Form Request
  await deallsPages.ajukanJadwalButton.click();

  // Fill Topic Mentoring
  await deallsPages.carrerPlanningOption.click(); 
  await deallsPages.selanjutnyaButton.click();

  // Fill Date and Time
  await deallsPages.selectDateRange.click();
  // Calculate dates
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 3);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 4); // day after tomorrow
  // Format as aria-labels
  const ariaLabel1 = format(tomorrow, "'Choose' EEEE MMMM dd 'of' yyyy");
  const ariaLabel2 = format(dayAfter, "'Choose' EEEE MMMM dd 'of' yyyy");

  console.log(ariaLabel1)
  console.log(ariaLabel2)
  // Set date range
  await page.locator(`//div[contains(@class, 'rmdp-day') and @aria-label='${ariaLabel1}']`).click();
  await page.waitForTimeout(1000);
  await page.locator(`//div[contains(@class, 'rmdp-day') and @aria-label='${ariaLabel2}']`).click();
  await page.getByText("Propose Date Range").click();

  // Fill Time
  await deallsPages.setStartTime.fill("0800");
  await deallsPages.setEndTime.fill("0900");

  // Choose Location (if any)
  const locationRequired = await deallsPages.chooseLocation.isDisabled();
  if ( locationRequired === false ){
    await deallsPages.chooseLocation.click();
    await deallsPages.checkboxLocation.check();
  }

  // Fill Question for mentor
  await deallsPages.questionForMentoTextArea.fill("Hi, I am QA Automation Test" + faker.lorem.sentences(5, '\n'));
  await deallsPages.selanjutnyaButton.click();

  // Check the commitmentCheckBox
  await deallsPages.commitmentCheckBox.check();
  await deallsPages.submitRequestMentoringButton.click();
  
  // Validate the request should success submitted
  await expect(page.getByText("Sesi mentoring kamu telah dikirimkan!")).toBeVisible();
  await expect(deallsPages.seeDetailRequestButton).toBeVisible();
  await deallsPages.seeDetailRequestButton.click();
  await expect(page.getByText("Sesi Saya")).toBeVisible();
});