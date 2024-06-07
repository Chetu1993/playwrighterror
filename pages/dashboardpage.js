class dashboardpage{



constructor(page){

    this.page=page
    this.products=page.locator(".card-body")
    this.productsText=page.locator(".card-body b")
    this.cart=page.locator("[routerlink*='cart']")
    this.page.waitForTimeout(5000)

}





async searchProductaddCart(productName)
{

//     const titles=await this.page.productsText.allTextContents()
//     await this.page.waitForTimeout(3000)

// console.log(titles)

const count=await this.products.count()
for(let i=0;i<count;i++){


    if(await this.products.nth(i).locator("b").textContent()==productName){

        await this.products.nth(i).locator("text=Add to Cart").click()
        break
    }
}
}

async navigatetocart(){

await this.cart.click()


}








}

module.exports={dashboardpage}