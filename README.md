#Login Register Rnd Admin Panel Project

A JavaScript project for login register and managin in admin panel. Users can register login and logout, Admins can login and use the admin panel

##Table of content

1. Pages
  - [Main page](#main-page)
  - [Login page](#login-page)
  - [Register page](#register-page)
  - [Admin panle page](#admin-panel-page)
  - [Edit-user-page](#edit-user-page)
2. Project requirements
3. Project setup


#Pages

##Main page

The page contains little window located in the middle displaying brief user's information (avatar, email, username and role). Under the information there is a button that the user can logout.
If the user has Admin role a [Admin panel page](#admin-panel-page) button appears to the right of the page. If there is no logged user it changes the page automatically to [Login page](#login-page).

##Login page

This page consist of 2 containers. In the 1st container there is 4 inputs (username/email, password, submit and checkbox). When the user logs in it encrypts and saves the id of the user
in the session or local storage based on the checkbox (unchecked = sessionStorages, checked = localStorage also adds expiry date that logs out the user after 7 days). Lastly the 2nd
container has anchor changes to the register page

##Register page
That page has 10 inputs (username, first name, last name, password, confirma password, email, confirma email, gender select, avatar select and submit/register button). If all validations
are correct and all inputs have entered values a post request is made and user added/registered in the database. If validation is not correct or value not entered the input's border becomes red
and a error message is displayed under the input.

  - Validations:
      - Username: have 4 or more charaters, no special charaters (excluding "." and "_"), unique username.
      - First and last names: have 4 or more characters, no special charaters.
      - Password: have 8 or more characters, at least one special character and one upper case letter.
      - Confirm password: must match password.
      - Email: must have first "@" and second "." (text@site.com).
      - Confirm email: must match email.
      - Gender select: select an option.
      - Avatar select: select an avatar (optional). If not selected a default avatar is given.
      - Sumbit/register button: All inputs must have entered value and correct validations.

##Admin panel page

The page can be accessed only by Admin users. The header of the page is displayed the admin's avatar and username. On top middle of the page has search input that navigates to certain page. Bellow it there is
button navigation that have Previous, number of pages and Next buttons. Left next to it is Reset button that resets to the first page and remove all sorts. After this bellow is table with 3 columns and 11 columns. 1 for titles and sorting and 10 per page by default for each user (can be configured to have more or less). 
  - Button navigation has 4 states
      - First state: If there are below 6 pages of users. Displays all pages. 
         > Previous 1 2 3 4 5 6 Next
      - Second state: If the selected page is 3 or below. Displays first 4 pages and the last 2 pages.
         > Previous 1 2 3 4 ... 49 50 Next
      - Third state: If the selected page is 4 or above and -4 before the last page (50 - 4 = 46). Displays the first 2 pages, previous page, selected page, next page and the last two pages.
         > Previous 1 2 ... 44 45 46 ... 49 50 Next
      - Fourth state: Is the same as the second state but backwards
        > Previous 1 2 ... 46 47 48 49 Next

  - Table
    - Username: Displays users's avatar, username, first and last names, and email.
        - Action: Clicked on the title sorts by username asc and dsc.
    - User role: Displays the user's role.
        - Action: Clicked on the title sorts by role asc and dsc.
    - Actions buttons
        - See info: Only admin users have this button. The info can not be modified.
            - Action: Clicked on redirects to [Edit-user-page](#edit-user-page) with selected users id by url.
        - Modify user: Only normal users have this button. The info can be modified.
            - Action: Clicked on redirects to [Edit-user-page](#edit-user-page) with selected users id by url.
        - Delete user: All users have this button. For admin users is disabled.
            - Action: Sends a delete request to the database and deletes the user.
  
