import {test,expect} from '@playwright/test'


const{pageobjectmanager}=require('../pages/pageobjectmanager')

const placeorder=JSON.parse(JSON.stringify(require("../pages/placeorder.json")))

for(const data of placeorder){

test(`login ${data.productName}`,async({page})=>{


const pomanager=new pageobjectmanager(page)
    
const login=pomanager.getLogin()

await login.goto()
await login.validlogin(data.username,data.password)


const dashboard=pomanager.getdashboard()
await dashboard.searchProductaddCart(data.productName)
await dashboard.navigatetocart()


await page.waitForTimeout(5000)






})

}