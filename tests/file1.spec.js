const {test,expect,request} =require('@playwright/test')



const loginpayload={userEmail: "schetankumar123@gmail.com", userPassword: "Chetan123$"}

let token;
test.beforeAll(async()=>{

    const apiContext=await request.newContext()

    const apiresponse=await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
   { data:loginpayload}, )

   expect(await apiresponse.ok()).toBeTruthy()

   const jsonresponse=await apiresponse.json()

   token=jsonresponse.token
   console.log(token)
   console.log(jsonresponse.email)

})















test("framedesign",async({page})=>{


    page.addInitScript(value=>{

        window.localStorage.setItem("token",value)

    },token)


await page.goto("https://rahulshettyacademy.com/client")

// await page.locator("#userEmail").fill("schetankumar123@gmail.com")
// await page.locator("#userPassword").fill("Chetan123$")
// await page.locator("#login").click()

await page.waitForLoadState('networkidle')

const productname="ADIDAS ORIGINAL"

const products=page.locator(".card-body")

for(let i=0;i<await products.count();i++){

    const name=products.nth(i).locator("b")

    if(await name.textContent()===productname){
        await products.nth(i).locator("[class='btn w-10 rounded']").click()
        break

    }

}

await page.locator("[routerlink='/dashboard/cart']").click()

await page.locator("[class='btn btn-custom']").nth(2).click()

await page.locator("[class='btn btn-primary']").last().click()

await page.locator("[placeholder='Select Country']").pressSequentially("ind")

const countries=page.locator("[class*='ta-results']")

await countries.waitFor()

const country=countries.locator("button")
for(let i=0;i<await country.count();i++){

const text=await countries.locator("button").nth(i).textContent()

if(text===' India'){
    await countries.locator("button").nth(i).click()
    break

}
}

await page.locator("[class='btnn action__submit ng-star-inserted']").click()

const orderno=await page.locator("label[class='ng-star-inserted']").textContent()
console.log(orderno)

await page.locator("[routerlink='/dashboard/myorders']").nth(0).click()

await page.waitForTimeout(3000)

const table=page.locator("tbody tr")


for(let i=0;i<await table.count();i++){

    const order=await table.locator('th').nth(i).textContent()
    if(await orderno.includes(order)){

        await table.locator("button[class='btn btn-primary']").nth(i).click()

        break
    }


}

const finalorder=await page.locator("[class='col-text -main']").textContent()

await expect(orderno.includes(finalorder)).toBeTruthy()


await page.pause()

})