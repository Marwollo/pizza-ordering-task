# Pizza ordering service (task)
Task for the job interview. This mini-platform is a representation of a pizza ordering platform, with content managing system done in Laravel, ReactJS.

# Task description
Let’s say you want to start a new pizza delivery business. Please create a web application for
ordering pizza for your clients, which contains a shopping cart. Take the pizza order and the
delivery address and contact details for the client. Login is not required but could be available
for checking the history of orders.

### Requirements
• Your clients should be able to order pizzas from the menu
• The menu contains at least 8 pizzas
• You can decide what else you want in the menu
• Processing order/etc. with payment is NOT required. Concentrate on the interface to your
pizza customer up to the point the customer confirms his order.
• The pizza order process should cover ordering single or several pizzas with definition of the
quantity and calucation of a total price in Euros and US$ also adding delivery costs to the bill.

### Technology
• Frontend – ReactJS

• Backend – Laravel

• Database – MySQL

• You get extra points for adding testing (for both frontend and backend);

• Design - you are free to use any framework or library whatever you want but keep in mind we primarly judge functionality and workflow. Less is more.

### Delivery format

• Please provide the repository links separately for frontend and backend with Demo
application URL (e.g. in Heroku).

• The solution has to be testable by a non-technical person

## Additional information
Due to technical issues with my OS, I couldn't deploy the code to the Heroku server - but I have my self-hosted server, so I'll share the IP of it here, and you'll be able to fully test the app there. I'll be able to use Heroku when I solve the issue.

Here are the links to access the app:

• Homepage: http://178.149.82.69/

• Administration panel (you'll need to login from here): http://178.149.82.69/admin

SSL is fully supported on a domain that has an installed certificate.

## Deployment
To deploy the app by yourself, download the repository and just configure the .env.example file by mentioning the MySQL database credentials in the .env file. Then, replace all occurrences of my IP address with your server's domain (this will be changed to an env variable in the future). Migrate migrations using artisan, and you're already good to go! There are no extra steps or plugins to be installed.

Note: To use the admin panel, you'll have to manually create a new user in the users database by creating a new row with the encrypted password generated from your server (at the time I'm writing this I remember that I could add some seeders for that).

## Unique features and my primary goal
My primary goal was to be different from the others by creating mechanisms that you won't probably see with other applicants:
  • A goal of every company that provides a service is the user experience. Logging in to persist order list and etc. is just too much for users - and instead of adding that functionality, I'm saving cart items in the local storage, such that if you by accident close the tab, or decide to visit the website later - your cart items list will wait for you.
  
  • Also, if you have a few tabs open, if you add an item on a tab A, the changes will be automatically synchronized along all tabs.
  
  • Performance. Instead of just "rushing" new features, most of the time I've spent by trying to reach the maximum performance possible with the current feature set (global state management, targeted-rerendering, client-side queries when possible to save server resources, etc.)
  
  • Great design. Also responsive (although there are some components that needs to be fixed)
  
  
Of course, because of the time constraints, I had to sacrifice some functionalities which would be really easy to implement - for example, pizza popularity statistics, list of orders from customers and their messages.
 
## To-do list
Unfortunately, I could only develop the web app for 2-3 days after I got the task - my HDD stopped working and I had to get a new one, which took some time. But, I'm proud with my work - and of course, there are a lot of places that could be fixed or changed, but as I've said, my primary goal is to show you how much can I do in a short time period.

  • Create orders database, where orders should be stored after finishing the order procedure in the front-end.
  
  • CMS + homepage: Orders, statistics/analytics, contacts. I actually had this ready, but couldn't add it on time. Probably a few days more would allow me to integrate this.
  
  • CMS: Editing existing pizzas. Yes, it's pretty easy because it's basically the same mechanism and form as creating a new pizza.
  
  • CMS API: Just need to add a few lines of code at the beginning of each route to check if the administrator user is logged in before processing the script.
  
  • Code organizing - there are some places where the code should be more readable and understandable.
  
  
  


