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
  
  // Filter By Name
  await expect(deallsPages.searchMentorFields).toBeVisible();
  await deallsPages.searchMentorFields.fill("Irvan");
  await expect(page.getByText("Irvan").nth(0)).toBeVisible();

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

test('User should able to search mentor by name', async ({ page }) => {
  const deallsPages = new deallsPage(page);

  // Sign In Process
  await signIn(page);

  // Filter By Name
  await expect(deallsPages.searchMentorFields).toBeVisible();
  await deallsPages.searchMentorFields.fill("Cika");
  await expect(page.getByText("Cika").nth(0)).toBeVisible();
});

test('User should able using Filter By Readiness', async ({ page }) => {
  const deallsPages = new deallsPage(page);

  // Sign In Process
  await signIn(page);

  // Filter By Readiness - Paling Relevan
  await expect(deallsPages.filterByReadiness).toBeVisible();
  await deallsPages.filterByReadiness.click();
  await deallsPages.palingRelevanOption.click();
  await expect(deallsPages.palingRelevanOption).toHaveAttribute('aria-selected', 'true');

  // Filter By Readiness - Ketersediaan Terdekat
  await expect(deallsPages.filterByReadiness.nth(0)).toBeVisible();
  await deallsPages.filterByReadiness.nth(0).click();
  await deallsPages.ketersediaanTerdekat.click();
  await expect(deallsPages.ketersediaanTerdekat).toHaveAttribute('aria-selected', 'true');
});