class loginpage{



    constructor(page){
        
        this.page=page
    
        this.userName=page.locator("#userEmail")
        this.Password=page.locator("#userPassword")
        this.signInButton=page.locator("[value='Login']")
    
    
    
    }
    
    async goto(){
    
        await this.page.goto("https://rahulshettyacademy.com/client")
    
    
    
    }
    
    async validlogin(username,password){
    
        await this.userName.fill(username)
        await this.Password.fill(password)
    
        await this.signInButton.click()
    
    
    }
    
    
    
    }
    

module.exports={loginpage}
    