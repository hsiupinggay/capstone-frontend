<h1> KEEP </h1>

<details>
<summary>Table of Contents</summary>
<br>
 <ol> 
    <li> <a href="#about"> About the Project </a></li>
    <li> <a href="#website"> Website </a></li>
    <li> <a href="#tech-used"> Technologies Used </a></li>
    <li> <a href="#features"> Features </a></li>
    <li> <a href="#rationale"> Rationale for Choice of Technologies </a></li>
    <li> <a href="#repo-links"> Repo Links </a></li>
  </ol>
</details>

<div id="about">
 <h2> About the Project </h2>
KEEP is a healthcare app made for families who are collectively taking care of their sick family members. It takes away the administrative hassle of coordinating medical visits, keeping track of medicine refills and allows for easy sharing of patient's medical details with family members.
</div>
 
<div id="website">
<h2> Website </h2>
www.keepapp.live
</div>
 
<div id="tech-used">
<h2> Technologies Used </h2>
 
 <h3>Frontend</h3>
 
 User Interface:
 <ul>
  <li><a href="https://reactjs.org/" target="_blank"> React.js <a/></li>
 </ul>
 
  Component Routing:
 <ul>
  <li><a href="https://reactrouter.com/" target="_blank"> React Router <a/></li>
 </ul>
 
 CSS Framework:
 <ul>
  <li><a href="https://mui.com/" target="_blank"> Material UI <a/></li> 
 </ul>
 
 Live Chatroom:
 <ul>
   <li><a href="https://socket.io/" target="_blank"> Socket.IO <a/></li>
 </ul>
 
 <h3> Backend </h3>
 
 Server:
 <ul>
   <li><a href="https://expressjs.com/" target="_blank"> Express.js <a/></li>
 </ul>
 
  Database:
 <ul>
   <li><a href="https://www.mongodb.com/docs/atlas/" target="_blank"> MongoDB Atlas <a/></li> 
   <li><a href="https://mongoosejs.com/" target="_blank"> Mongoose ODM <a/></li>
 </ul>
 
   Authentication:
 <ul>
  <li><a href="https://www.npmjs.com/package/argon2" target="_blank"> argon2 <a/></li>
   <li><a href="https://jwt.io/" target="_blank"> JSON Web Token <a/></li>
 </ul>
 
   Telegram Medication Reminder:
 <ul>
 <li><a href="https://core.telegram.org/" target="_blank"> Telegram API <a/></li>
    <li><a href="https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/" target="_blank"> CRON <a/></li>
 </ul>
 
  Live Chatroom:
 <ul>
   <li><a href="https://socket.io/" target="_blank"> Socket.IO <a/></li>
 </ul>
 
</div>

<h2 id="features"> Features </h2>

### Appointments
Schedule appointments, appoint chaperones, make edits

![schedule_edit_appointments_480](https://user-images.githubusercontent.com/85098526/162615184-df2baff5-303a-478f-b23c-4b7cb92d154c.gif)

View and filter appointments in calendar and list views

![filter_appointments](https://user-images.githubusercontent.com/85098526/162615410-a751f330-6096-40df-b8e6-f0d0b5484e9f.gif)

View and schedule appointments related to specific patient via patient menu

![appointments](https://user-images.githubusercontent.com/85098526/162616539-e9215a06-1669-4243-b6c8-5bc36d90bf6a.gif)

### Keep all patient information in one place

Access all patient information from patient menu

![patient_menu](https://user-images.githubusercontent.com/85098526/162616383-438fe421-d3d3-45ff-b99f-e13679d5018a.gif)

View, add and edit patient's medication

![medication](https://user-images.githubusercontent.com/85098526/162616529-2fa9e811-fa65-4c9c-adcc-d982e1f87917.gif)

Schedule medication refill reminders that will be sent via telegram

![telegram](https://user-images.githubusercontent.com/85098526/162618164-718d62dd-d9be-47b8-9d42-dc89640439d2.gif)

View and add clinics and departments that patient frequently visit

![clinics_departments](https://user-images.githubusercontent.com/85098526/162616507-945cfd66-19b6-42ad-9e41-1056305384f7.gif)

View and filter memos that are tagged to patient to get a comprehensive overview of medical status during each doctor's appointment

![memos](https://user-images.githubusercontent.com/85098526/162616500-1dfda194-3403-4aa0-94a3-8d36b19eb15b.gif)

### Manage your contacts

Add other users as contacts, share patients with contacts so that they can access mutual patient's information

![contacts_visibility](https://user-images.githubusercontent.com/85098526/162617079-0c3446ec-5f46-4305-b334-5f69364f09fb.gif)

Chat with users within the app
<details>
<summary> How it was achieved: </summary>
We used socket.io for our chat functionality. Each time a chat is initiated, a temporary connection is opened for the time that both users are on the chat page. Messages are saved in the database so that even if the connection ceases, users can still view the messages that transpired.
</details>

![chat](https://user-images.githubusercontent.com/85098526/162617085-0a5d39cd-8be7-4598-85be-0e10d05863f8.gif)


<div id="rationale">
<h2> Rationale for Choice of Technologies  </h2>

 <h3> MongoDB </h3>

We opted for a NoSQL database for a few reasons:
1. We had a short development time and wanted a flexible schema that would allow us to make changes quickly and easily as requirements change
2. We pass a lot of information from view to view that would have required join data from multiple tables if we used SQL databases. MongoDB allowed us to store data that is often accessed together in the same document. Since we already know which data will often be queried alongside others, it made sense to put them in the same document so that we don't need as many queries and joins.
 
 
 <h3>  Telegram API & CRON </h3>
------------------------- NEED TO FILL IN WHY WE CHOSE THIS -------------------------

 <h3>  Socket.io </h3>
------------------------- NEED TO FILL IN WHY WE CHOSE THIS -------------------------

 <h3>  Argon2 & JWT </h3>
------------------------- NEED TO FILL IN WHY WE CHOSE THIS -------------------------

</div>

<div id="repo-links">
<h2> Repo Links  </h2>

 <ul>
  <li><a href="https://github.com/hsiupinggay/capstone-frontend" target="_blank"> Frontend<a/></li>
   <li><a href="https://github.com/hsiupinggay/capstone-backend" target="_blank"> Backend<a/></li>
 </ul>
 
</div>

## Contributors

Hsiu Ping Gay | [linkedin.com/in/hsiupinggay](https://www.linkedin.com/in/hsiupinggay/)

Shannon Suresh | [linkedin.com/in/shannon-suresh](https://www.linkedin.com/in/shannon-suresh)

Bryan Luke Tan | 
