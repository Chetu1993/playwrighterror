const {test,expect,request}=require('@playwright/test')

const loginpayload={userEmail: "schetankumar123@gmail.com", userPassword: "Chetan123$"}

let token
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


test('apitesting',async({page})=>{

page.addInitScript(value=>{

    window.localStorage.setItem('token',value)
},token)


await page.goto("https://rahulshettyacademy.com/client")


const products=page.locator(".card-body")
const productName="ZARA COAT 3"
const email="schetankumar123@gmail.com"
    
    await page.waitForLoadState('networkidle')
    
    console.log(await page.locator(".card-body b").allTextContents())

    console.log(products.count())

    const count=await products.count()

    for(let i=0;i<count;i++){

        if(await products.nth(i).locator("b").textContent()===productName){

            await products.nth(i).locator("[class='btn w-10 rounded']").click()
            break
        }

}
await page.waitForTimeout(3000)
await page.locator("[routerlink=/dashboard/cart']").click()

// await page.locator(".infoWrap").first().waitFor()

await page.waitForTimeout(2000)

const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
await expect(bool).toBeTruthy()

await page.locator("button[type='button']").nth(1).click()

await page.locator("[placeholder*='Country']").pressSequentially("ind")

const countries=page.locator("[class*='ta-results']")
await countries.waitFor()

const optionscount=await countries.locator("button").count()

for(let i=0;i<optionscount;i++){

const text=await countries.locator("button").nth(i).textContent()

if (text===" India"){

    await countries.locator("button").nth(i).click()
    break
}
}

expect(page.locator(".details__user [type='text']").first()).toHaveText(email)

await page.locator("[class='btnn action__submit ng-star-inserted']").click()

await expect(page.locator(".hero-primary")).toBeVisible()

const orderNo=await page.locator(".em-spacer-1 .ng-star-inserted").textContent()


await expect(page.locator(".em-spacer-1 .ng-star-inserted")).toBeVisible()

console.log(orderNo)

await page.locator("button[routerlink='/dashboard/myorders']").click()

await page.locator("table").waitFor()

const orderpage=page.locator("tbody tr")

for(let i=0; i<await orderpage.count();i++){

    const correctorder=await orderpage.nth(i).locator("th").textContent()

    if (orderNo.includes(correctorder)){

        await orderpage.nth(i).locator("[class='btn btn-primary']").click()
        break
    }
}

const correctorder=await page.locator("[class='col-text -main']").textContent()

await expect(orderNo.includes(correctorder)).toBeTruthy()

    

})