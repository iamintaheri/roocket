'use strict'

const User = use('App/Models/User')
const Hash = use ('Hash')

class UserController {
    async login({auth,request , response })
    {
    
       const {email, password} = request.body
     
        try
        {
            await auth.attempt(email,password)
            
            return response.redirect('/panel')
        }
        catch(error)
        {
            return response.redirect('back')
        }
       

    }

    async signUp({request,response,view})
    {
        const {email,password,name} = request.body
        const user = new User()
        user.email = email
        user.username = name
        user.password = password
        
        await user.save()
        return view.render('login')
        
    }

    async logout({auth,response})
    {
       
            await auth.logout()

            return response.redirect('/login')

    }

    
}

module.exports = UserController
