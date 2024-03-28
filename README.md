#Login Register Rnd Admin Panel Project

A JavaScript project for login register and managin in admin panel. Users can register login and logout, Admins can login and use the admin panel

##Table of content

- [Main page](#main-page)
- [Login page](#login-page)
- [Register page](#register-page)
- [Admin panle page](#admin-panel-page)
- [Edit-user-page](#edit-user-page)

  
##Main page

The page contains little window located in the middle displaying brief user's information (avatar, email, username and role). Under the information there is a button that the user can logout.
If the user has Admin role a Admin panel button appears to the right of the page. If there is no logged user it changes the page automatically to [Login page](#login-page).

##Login page

This page consist of 2 containers. In the 1st container there is 4 inputs (username/email, password, submit and checkbox). When the user logs in it encrypts and saves the id of the user
in the session or local storage based on the checkbox (unchecked = sessionStorages, checked = localStorage also adds expiry date that logs out the user after 7 days). Lastly the 2nd
container has anchor changes to the register page

#Register page


  
  
