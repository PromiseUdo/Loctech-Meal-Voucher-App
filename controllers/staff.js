const Staff = require('../models/staff');

module.exports.renderRegister = (req, res)=>{
    res.render('staff/register');
};

module.exports.register = async (req,res)=>{
    try{
        const {email, username, password, role} = req.body;
        //to check if its a loctech domain before creating new staff
        let domainPart = email.slice(email.indexOf('@')+1,);
        let usernamePart = email.slice(0,email.indexOf('@'));
        console.log(domainPart);
        if(domainPart !== "loctech.ng"){
            req.flash('error', 'Sorry you can only register with a LOCTECH domain email');
            res.redirect('/register');
        }else{
            //check for Admin
            if(((role == "admin") && (usernamePart == "joy.okwu")) || ((role == "admin") && (usernamePart == "hope.israel")) || ((role == "admin") && (usernamePart == "jenzeal3"))){

                const staff = new Staff({email, username, role});
                const registeredStaff = await Staff.register(staff, password);
                req.login(registeredStaff, err=>{
                    if(err) return next(err);
                    req.flash('success', 'Welcome to Loctech Meal Ticket App');
                    return res.redirect('/mealtickets');
                });
               
            }else if(((role == "admin") && (usernamePart !== "joy.okwu"))){
                
                req.flash('error', 'Sorry you cannot register as an admin. Try other staff');
                return res.redirect('/register');
              
            }else{
                const staff = new Staff({email, username, role});
                const registeredStaff = await Staff.register(staff, password);
                req.login(registeredStaff, err=>{
                    if(err) return next(err);
                    req.flash('success', 'Welcome to Loctech Meal Ticket App');
                    return res.redirect('/mealtickets');
                });

                
            }

    }

            console.log(role, usernamePart);



            
                  
    }catch(e){
        req.flash('error', e.message);
        res.redirect('/register')
    }
};

module.exports.renderLogin = (req, res)=>{
    res.render('staff/login');
};

module.exports.login = (req,res)=>{
    req.flash('success', `Welcome back ${req.user.username}!`);
    const redirectUrl = req.session.redirectTo || '/mealtickets';
    delete req.session.redirectTo;
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res)=>{
    req.logout();
    req.flash('success', 'Goodbye!');
    res.redirect('/login')
};