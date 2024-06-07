const {loginpage}=require('./loginpage')
const {dashboardpage}=require('./dashboardpage')


class pageobjectmanager{


    constructor(page){ 
        this.page=page

        const login=new loginpage(this.page)
        const dashboard=new dashboardpage(this.page)

    }


    getLogin(){

        return this.loginpage
    }

    getdashboard(){

        return this.dashboardpage
    }
}

module.exports={pageobjectmanager}