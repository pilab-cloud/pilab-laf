import { expect, test } from "@playwright/test";
import { DEMO_IDS, openDemo } from "./helpers";

const VARIANT_DEMOS = ["catalogue", "app-shell", "primitives", "combo-menus", "datagrid", "account-security", "admin-users", "vcenter", "tracker"];

for (const id of DEMO_IDS) {
  test(`${id} (en, ltr)`, async ({ page }) => {
    await openDemo(page, id);
    await expect(page).toHaveScreenshot(`${id}.png`, { fullPage: true });
  });
}

for (const id of VARIANT_DEMOS) {
  test(`${id} (hu)`, async ({ page }) => {
    await openDemo(page, id, { lang: "hu" });
    await expect(page).toHaveScreenshot(`${id}-hu.png`, { fullPage: true });
  });
  test(`${id} (rtl)`, async ({ page }) => {
    await openDemo(page, id, { dir: "rtl" });
    await expect(page).toHaveScreenshot(`${id}-rtl.png`, { fullPage: true });
  });
}
