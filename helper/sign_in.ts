import { Page, expect } from '@playwright/test';
import { deallsPage } from "../pages/dealls.page";

export async function signIn(page: Page) {
    const baseURL = process.env.BASE_URL!;
    const email = process.env.EMAIL_USER!;
    const password = process.env.PASSWORD_USER!;
    const deallsPages = new deallsPage(page);

    // Go to Dealls Landing Page
    await page.goto(baseURL);
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Tingkatkan Karirmu Bersama Career Mentor Terpercaya Gratis/);

    // Open the Sign In page
    await expect(deallsPages.goToSignInPage).toBeVisible();
    await deallsPages.goToSignInPage.nth(0).click();

    // Sign In proccess
    await expect(deallsPages.emailField).toBeVisible();
    await deallsPages.emailField.fill(email);
    await deallsPages.passwordField.fill(password);
    await deallsPages.signInButton.nth(0).click();

    // Validate should success Sign In
    await expect(page.getByText("Sign in success")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Dapatkan informasi dan kembangkan karir Anda melalui sesi 1-on-1 dengan mentor ahli. 100% gratis." })).toBeVisible();
}