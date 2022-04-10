# KEEP

KEEP is a healthcare app made for families who are collectively taking care of their sick family members. It takes away the administrative hassle of coordinating medical visits, medicine refills and keeping updated with the patient's medical situation.

## Features

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

![chat](https://user-images.githubusercontent.com/85098526/162617085-0a5d39cd-8be7-4598-85be-0e10d05863f8.gif)

## Website
www.keepapp.live

## Technologies used 

**MongoDB**
We opted for a NoSQL database for a few reasons:
1. We had a short development time and wanted a flexible schema that would allow us to make changes quickly and easily as requirements change
2. We pass a lot of information from view to view that would have required join data from multiple tables if we used SQL databases. MongoDB allowed us to store data that is often accessed together in the same document. Since we already know which data will often be queried alongside others, it made sense to put them in the same document so that we don't need as many queries and joins.

**Telegram API & CRON**
1. Users are given specific instructions to initiate a chat with the our telegram bot and to provide the patient ID which corresponds with the ID key of the patient's document in our database. The telegram API receives the user's initiation message which includes the user's telegram ID. 
2. We save this ID in the patient's document. Each patient's document will have a list of telegram IDs of users that have subscribed to this patient's medicine reminders.
3. When a new prescription is added, users can opt to set a refill reminder. The app will draft a telegram message with the patient name, medication name and days left till the medication runs out. We use CRON to help us queue medicine refill reminder message to be sent out at a specific date and time determined by the user.

**Socket.io**
We used socket.io for our chat functionality. Each time a chat is initiated, a temporary connection is opened for the time that both users are on the chat page. Messages are saved in the database so that even if the connection ceases, users can still view the messages that transpired.

**Argon2 & JWT**
1. Each time a user logs in, after the login payload is verified, the backend API sends a JWT token with a signature and payload including username and profile picture which is stored in local storage. As this payload is encrypted, it will not reveal user details. 
2. We then send the token back as part of the header on every route. This allows us to verify the user every time they navigate to a new page, it also allows the username and profile picture to be available to the frontend even when the user refreshes the page. 
3. We use Argon2 to hash our passwords before saving into our database. We chose it over hashing algorithms such as bcrypt as it won the [PHC](https://www.password-hashing.net/) in 2015.

## Contributors

Hsiu Ping Gay | [linkedIn](https://www.linkedin.com/in/hsiupinggay/)
Shannon Suresh | 
Bryan Luke Tan | 
