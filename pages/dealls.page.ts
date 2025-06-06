import { type Locator, type Page } from '@playwright/test';

export class deallsPage {
    readonly page: Page;
    readonly goToSignInPage: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly signInButton: Locator;
    readonly eventPopUpModal: Locator;
    readonly closePopUpModalButton: Locator;

    // Mentoring Index Page
    readonly searchMentorFields: Locator;
    readonly filterByReadiness: Locator;
    readonly palingRelevanOption: Locator;
    readonly ketersediaanTerdekat: Locator;
    readonly mentorCard: Locator;

    // Mentor View Details Page
    readonly ajukanJadwalButton: Locator;

    // Form Mentoring Request
    readonly carrerPlanningOption: Locator;
    readonly selanjutnyaButton: Locator;
    readonly selectDateRange: Locator;
    readonly setStartTime: Locator;
    readonly setEndTime: Locator;
    readonly chooseLocation: Locator;
    readonly checkboxLocation: Locator;
    readonly questionForMentoTextArea: Locator;
    readonly commitmentCheckBox: Locator;
    readonly submitRequestMentoringButton: Locator;
    readonly seeDetailRequestButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.goToSignInPage = page.locator("//a[text()='Masuk']").nth(0);
        this.emailField = page.locator("//input[@type='email']");
        this.passwordField = page.locator("//input[@type='password']");
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
        this.eventPopUpModal = page.locator("//div[@class='ant-modal-mask']");
        this.closePopUpModalButton = page.locator("//button[@class='ant-modal-close']");

        // Mentoring Index Page
        this.searchMentorFields = page.locator("//input[@id='searchMentor']");
        this.filterByReadiness = page.locator("//div[contains(@class, 'MentorSortParam_mentor_sort_param')]");
        this.palingRelevanOption = page.locator("//div[@title='Paling relevan']");
        this.ketersediaanTerdekat = page.locator("//div[@title='Ketersediaan Terdekat']");
        this.mentorCard = page.locator("//a[contains(@class, 'MentorCard_mentor_card')]");

        // Mentor View Detail Page
        this.ajukanJadwalButton = page.locator("//button[text()='Ajukan Jadwal']");

        // Form Mentoring Request
        this.carrerPlanningOption = page.locator("//div[@id='book-session-modal']//form//button//div[text()='Career Planning']");
        this.selanjutnyaButton = page.locator("//div[@id='book-session-modal']//form//button/span[text()='Selanjutnya']");
        this.selectDateRange = page.locator("//button/div[text()='Select Date Range']");
        this.setStartTime = page.locator("//input[@id='proposedTimes_0_startTime']");
        this.setEndTime = page.locator("//input[@id='proposedTimes_0_endTime']");
        this.chooseLocation = page.locator("//input[@id='proposeLocation']");
        this.checkboxLocation = page.locator("//input[@type='checkbox']");
        this.questionForMentoTextArea = page.locator("//div[@id='book-session-modal']//textarea");
        this.commitmentCheckBox = page.locator("//input[@id='commitCheckbox']");
        this.submitRequestMentoringButton = page.locator("//button[@id='mentoring-schedule-finish-request-session-btn']");
        this.seeDetailRequestButton = page.locator("//button/span[text()='Lihat Detailnya']");
    }
}