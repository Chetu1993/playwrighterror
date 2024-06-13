const {test,expect}=require('@playwright/test')


test("frame",async({page})=>{

await page.goto("https://rahulshettyacademy.com/client")

await page.locator("#userEmail").fill("schetankumar123@gmail.com")
await page.locator("#userPassword").fill("Chetan123$")
await page.locator("#login").click()

await page.waitForTimeout(3000)

const productlist=await page.locator(".card-body")

const productNames=await page.locator(".card-body b").allTextContents
console.log(productNames)

const productname="IPHONE 13 PRO"

for(let i=0;i<await productlist.count();i++){


const text=await page.locator(".card-body b").nth(i).textContent()
if(text===productname){

await productlist.nth(i).locator("[class='btn w-10 rounded']").click()
break
}
}
await page.locator("[routerlink='/dashboard/cart']").click()

await page.locator("[class='btn btn-primary']").nth(2).click()

await page.locator("[placeholder='Select Country']").pressSequentially("ind")



const countriesframe=page.locator("[class*='ta-results']")

await countriesframe.waitFor()

const country=countriesframe.locator("button")

for(let i=0;i<await country.count();i++){

    const text=await country.nth(i).textContent()

    if(text===' India'){
        await country.nth(i).click()
        break
    }
}
await page.locator("[class='btnn action__submit ng-star-inserted']").click()

const orderno=await page.locator("label[class='ng-star-inserted']").textContent()
console.log(orderno)

await page.locator("button[routerlink='/dashboard/myorders']").click()



await page.locator("table").waitFor()
const orders=page.locator("tbody tr")

await page.waitForTimeout(5000)
for(let i=0;i<await orders.count();i++){

    const repeat=await orders.locator("th").nth(i).textContent()
    if(orderno.includes(repeat)){

await orders.nth(i).locator("[class='btn btn-primary']").click()
break


    }
}
const finalorder=await page.locator("[class='col-text -main']").textContent()
await expect(orderno.includes(finalorder)).toBeTruthy()

})