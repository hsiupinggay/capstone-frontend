<h1> KEEP </h1>

<details>
<summary>Table of Contents</summary>
<br>
 <ol> 
    <li> <a href="#about"> About the Project </a></li>
    <li> <a href="#website"> Website </a></li>
    <li> <a href="#features"> Features </a></li>
    <li> <a href="#tech-used"> Technologies Used </a></li>
    <li> <a href="#rationale"> Rationale for Choice of Technologies </a></li>
    <li> <a href="#repo-links"> Repo Links </a></li>
    <li> <a href="#contributors"> Contributors </a></li>
  </ol>
</details>

<div id="about">
 <h2> About the Project </h2>
KEEP is a healthcare app made for families who are collectively taking care of their sick family members. 
 <br/>
It takes away the administrative hassle of coordinating medical visits, <br/>keeps track of medication refills <br/>and allows for easy sharing of patient's medical details with family members.
</div>
 
<div id="website">
<h2> Website </h2>
www.keepapp.live
</div>

<h2 id="features"> Features </h2>

<h3> 1. App Security </h3>

KEEP is a secure app with protected routes that requires user authentication. 
<br/>
Users accessing any KEEP URLs without being logged in are redirected to the login page.

<details>
 <summary><i> <b>How It Was Achieved:</b> </i></summary>
<ol>
 
 <li> <b>Upon Login:</b> <br/> Once the user's email and password are verified to match the database, the user's login details are stored in a JSON Web Token and sent from the backend Express server to the frontend React server. <br/> The token is saved in the browser's local storage. </li>

 <li> <b>On Access of KEEP URLs:</b> <br/> When any of the KEEP app's URLs are accessed, a <i>useEffect</i> React Hook runs in the <i>ProtectedRoute</i> component, that wraps all routes in the app. <br/> This triggers user authentication to occur. </li>
 
  <li> <b>User Authentication:</b> <br/> The JSON Web Token is retrieved from local storage and sent to the Express server where the token is then verified.<br/>  The outcome is then sent to the React server. <br/> If the token was not successfully verfied, the app would redirect to the login page. <br/> If verification is successful, users can navigate to their intended page and the Express server will send the users details to the React server, allowing for the user's details to be correctly displayed even upon refresh or reopening of the browser.  </li>
 
 </ol>
 </details>

![user_auth_jwt](https://user-images.githubusercontent.com/85098526/162703679-6eeca0c4-5137-4575-9328-7895e20c9c46.gif)

KEEP provides a seamless signup and login process by accounting for and validating errors on the frontend. <br/> These include incorrect passwords, incorrect email formats, passwords not matching and empty input fields.

![signup_validation](https://user-images.githubusercontent.com/85098526/162709869-e0af50cc-08c8-4b59-b25f-a3562231f98e.gif)

<h3> 2. Appointments </h3>

View upcoming appointments for the month in calendar view.
<br/>
Schedule appointments, appoint chaperones, reschedule appointments and write memos after the hospital visit.

![schedule_edit_appointments_480](https://user-images.githubusercontent.com/85098526/162615184-df2baff5-303a-478f-b23c-4b7cb92d154c.gif)

Easily toggle between calendar and list views. 
<br/>
Filter appointments in list view.

![filter_appointments](https://user-images.githubusercontent.com/85098526/162615410-a751f330-6096-40df-b8e6-f0d0b5484e9f.gif)


<h3> 3. Patient Hub </h3>

Access all the patient's information from the patient hub.

![patient_menu](https://user-images.githubusercontent.com/85098526/162616383-438fe421-d3d3-45ff-b99f-e13679d5018a.gif)

View, add and edit patient's medication.

![medication](https://user-images.githubusercontent.com/85098526/162616529-2fa9e811-fa65-4c9c-adcc-d982e1f87917.gif)

Schedule medication refill reminders sent via Telegram.

<details>
<summary><i><b> How It Was Achieved: </b></i></summary>
 <ol>
  <li><b> Initiate Chat: </b><br/> Users are instructed to initiate a Telegram chat with KEEP apps Telegram bot and provide the patient ID. </li>
  <li><b> Storing Users Telegram ID: </b><br/> The telegram API receives the user's initiation message which includes the user's telegram ID. 
   <br/>
   KEEP saves this ID in the patient's document in the database. 
   <br/>
   Each patient's document in the database will have a list of telegram IDs of users that have subscribed to this patient's medicine reminders.
  </li>
  
<li><b> Sending Reminders: </b><br/> When a new prescription is added, users can opt to set a refill reminder. 
 <br/>
 KEEP calculates when the reminder is to be sent, based on the users choice of timing and number of days prior to the medication finishing. 
 <br/>
 KEEP will draft a Telegram message with the patients name, medication name and days left till the medication runs out.  
 <br/> 
 The CRON API queues and sends the medicine refill reminder message based on the date and time determined.
  </li>
 </ol>
</details>

![telegram](https://user-images.githubusercontent.com/85098526/162618164-718d62dd-d9be-47b8-9d42-dc89640439d2.gif)

View and add clinics and departments that patient frequently visit and chaperones who typically accompany them.

![clinics_departments](https://user-images.githubusercontent.com/85098526/162616507-945cfd66-19b6-42ad-9e41-1056305384f7.gif)

View and filter memos that are tagged to patients to get a comprehensive overview of their medical status during each hospital visit.

![memos](https://user-images.githubusercontent.com/85098526/162616500-1dfda194-3403-4aa0-94a3-8d36b19eb15b.gif)

<h3> 4. Contacts </h3>

Add other users as contacts. 
<br/>
Share patient details with contacts, allowing for access of mutual patient's appointments, medications and memos.

![contacts_visibility](https://user-images.githubusercontent.com/85098526/162617079-0c3446ec-5f46-4305-b334-5f69364f09fb.gif)

Chat with users within the app.

<details>
<summary><i><b> How It Was Achieved: </b></i></summary>
 <ol>
  <li><b> Establish Socket Connection: </b><br/> When a user enters a chatroom, a socket connection is established in the Express server. 
   <br/> The users socket ID, user ID and the user ID of the person they are texting is stored as a document in an <i>OnlineChatModel</i> collection in the database.
  <br/> The user is then placed in a socket room (channel) named after their user ID.</li>
  <li><b> Sending Real-Time Messages: </b><br/> When a user sends a message, the Express server will check the <i>OnlineChatModel</i> collection in the database to determine if the textee is also in the same chatroom.
  <br/> If they are, the user joins the textees socket room and the message is emitted to both rooms and hence the user and the textee. <br/> If not, the message is only sent to the user.</li>
  <li><b> Leaving Chatroom: </b><br/> When a user leaves the chatroom, their document is removed from the <i>OnlineChatModel</i> collection in the database, so as to allow for accurate checking of online users. </li>
 </ol>
</details>

![chat](https://user-images.githubusercontent.com/85098526/162617085-0a5d39cd-8be7-4598-85be-0e10d05863f8.gif)

<h3> 5. Mobile Responsive </h3>

Provide users with the ease of access to KEEP, both at home and on-the-go.

![resoponsiveness](https://user-images.githubusercontent.com/85098526/162710131-2ba1b63d-065d-450b-9bb1-3fc6a7396610.gif)

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
   <li><a href="https://mongoosejs.com/" target="_blank"> Mongoose <a/></li>
 </ul>
 
   Authentication:
 <ul>
  <li><a href="https://www.npmjs.com/package/argon2" target="_blank"> Argon2 <a/></li>
   <li><a href="https://jwt.io/" target="_blank"> JSON Web Token <a/></li>
 </ul>
 
   Telegram Medication Reminder:
 <ul>
 <li><a href="https://core.telegram.org/" target="_blank"> Telegram API <a/></li>
    <li><a href="https://github.com/kelektiv/node-cron#readme" target="_blank"> CRON <a/></li>
 </ul>
 
  Live Chatroom:
 <ul>
   <li><a href="https://socket.io/" target="_blank"> Socket.IO <a/></li>
 </ul>
 
</div>

<div id="rationale">
<h2> Rationale for Choice of Technologies  </h2>

<h3> MongoDB </h3>
 <b>Reason for Choosing a NoSQL Database: </b>
<ul>
 <li> Due to a short development time, we required a flexible schema that would allow us to make changes quickly and easily as requirements changed. </li>
 <li> The size and complexity of the app meant that a lot of information was being accessed by the various components. <br/> This would have required multiple join tables if a SQL database was used. <br/> MongoDB allowed us to embed information, allowing for ease of storage and access of data.<br/> Since we had sets of data which needed to be queried alongside one another, a NoSQL database was better suited as it removed the need for multiple queries and joins. </li>
</ul>
 
<h3> Telegram API & CRON </h3>
<ul>
  <li> We decided on chat messages as our mode of reminders due to their concise nature and ability to attract immediate attention as opposed to emails or in app notifications. </li>
   <li>CRON was utilized to allow reminders to be sent at a specific date and time. </li>
   <li>One downside of using CRON was that we were unable to reschedule messages once the CRON job had been queued.</li>
</ul>

<h3> Socket.IO </h3>
<ul>
 <li> Our desire to implement a live chatroom necessitated a Javascript library with such capabilities. </li>
 <li> Socket.IO's ability to enable real-time, bi-directional communication between the clients and our servers suited this need. </li>
</ul>

 <h3> Argon2 & JWT </h3>
 <b>Argon2 Password Hashing: </b>
 <ul>
 <li> We used Argon2 to hash our passwords before saving into our database over other hashing algorithms such as bcrypt. </li>
  <li> This was due to it having better security as displayed in it winning the <a href="https://github.com/P-H-C/phc-winner-argon2" target="_blank">Password Hashing Competition</a> in 2015. </li>
  </ul>
  <b>JWT Authentication: </b>
 <ul>
 <li> We chose JSON Web Tokens as our method of authentication due to its increased security through its digital signature capabilities. </li>
  </ul>
</div>

<div id="repo-links">
<h2> Repo Links  </h2>

 <ul>
  <li><a href="https://github.com/hsiupinggay/capstone-frontend" target="_blank"> Frontend<a/></li>
   <li><a href="https://github.com/hsiupinggay/capstone-backend" target="_blank"> Backend<a/></li>
 </ul>
 
</div>

<h2 id="contributors"> Contributors </h2>

Bryan Luke Tan | <a href="https://www.linkedin.com/in/bryan-luke-138a901b6" target="_blank"> LinkedIn<a/>

Hsiu Ping Gay | <a href="https://www.linkedin.com/in/hsiupinggay" target="_blank"> LinkedIn<a/>

Shannon Suresh | <a href="https://www.linkedin.com/in/shannon-suresh" target="_blank"> LinkedIn<a/>
