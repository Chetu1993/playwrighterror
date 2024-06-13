const {test,expect}=require('@playwright/test')


test('framework',async({page})=>{

await page.goto("https://rahulshettyacademy.com/client")

const Email=page.locator("#userEmail")

const email="schetankumar123@gmail.com"

await Email.fill(email)
await page.locator("#userPassword").fill("Chetan123$")

await page.locator("#login").click()

await page.waitForTimeout(5000)

const products=page.locator(".card-body")

const Names=await products.locator("b").allTextContents()

console.log(Names)

const webname="ZARA COAT 3"

for(let i=0;i<await products.count();i++){

if(await products.nth(i).locator("b").textContent()===webname){

    await products.nth(i).locator("button[class='btn w-10 rounded']").click()
    break
}

}


await page.locator("[routerlink='/dashboard/cart']").click()

await page.waitForTimeout(3000)

// const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
// await expect(bool).toBeTruthy()

await page.locator("[class='btn btn-primary']").last().click()

await page.locator("[placeholder='Select Country']").pressSequentially("ind")

const countries= page.locator("[class*='ta-results']")
await countries.waitFor()


const optionscount=await countries.locator("button").count()

for(let i=0;i<optionscount;i++){

    const text=await countries.locator("button").nth(i).textContent()

    if(text===' India'){

    await countries.locator("button").nth(i).click()
    break}
}


await expect(page.locator("label[type='text']")).toHaveText(email)

await page.locator("a[class*='btnn action__submit ng-star-inserted']").click()

const orderNo=await page.locator("[class='ng-star-inserted']").nth(2).textContent()

await expect(page.locator("[class='ng-star-inserted']").nth(2)).toBeVisible()

console.log(orderNo)


await page.locator("[routerlink='/dashboard/myorders']").nth(0).click()


await page.waitForTimeout(5000)

const orderids=page.locator("tbody tr")

for(let i=0;i<await orderids.count();i++){

    const orders=await orderids.nth(i).locator("th").textContent()

    if(orderNo.includes(orders)){
await orderids.nth(i).locator("[class='btn btn-primary']").click()
break

    }
}

const correctorder=await page.locator("[class='col-text -main']").textContent()

await expect(orderNo.includes(correctorder)).toBeTruthy()

})