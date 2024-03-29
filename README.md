# Startup
CS260

Notes can be found [here](https://github.com/bwegr/startup/blob/main/notes.md)

# Global Traveler Tool

## Specification Deliverable

### Elevator pitch

Have you ever traveled to a new country and spent countless hours preparing for the trip? Have you ever gotten to that country and realized that, even with those hours  of research, you were unprepared for something? Figuring out the type of currency you need, visas, vaccines, electrical adapters, etc. can be so time-consuming and arduous! The Global Traveler Tool allows you to get the critical info you need about the countries you are traveling to all in one place in the blink of an eye. Users can search countries one by one or create custom itineraries with any number of countries and get essential information in a concise and direct form to ensure their international travel, no matter how complex, will go smoothly.

### Design
Here is how the login page would look:

![Login Page](images/login.png)

Here is how the itinerary page would look:

![Itinerary Page](images/itinerarypage2.png)

### Key features

- Secure login over HTTPS
- Ability to search any country and receive a page of travel-relevant information
- Itinerary Page which allows you to create an itinerary with multiple countries
- Travel info page (following creation of itinerary) that has a report for the entire intinerary
- Real-time information pulled on travelling safety from US State Department
- Ability to save and store multiple itineraries for each user
- Itineraries are updated in real time even after creation
- Suggestion box for user to submit ideas for improvement
- Ability to create itineraries shared with other users
- Itinerary page allows user to input their country's passport to get visa requirements (cost, application link)

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Uses correct HTML structure for the application. Four HTML pages. One for login, one for looking up countries (one-off), one for creating itineraries, and the last for viewing reports from previously created itineraries.
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- **JavaScript** - Provides login, country input, itinerary inputs, backend endpoint calls.
- **Service** - Backend service with endpoints for:
  - login
  - retrieving country safety info from US State Department
  - getting other information from websites
- **DB/Login** - Store users, itineraries, and country info in database. Register and login users. Credentials securely stored in database. Can't enter, search countries, or create itineraries unless authenticated.
- **WebSocket** - Allows itineraries to be shared with other users and viewed live with real-time changes from other users
- **React** - Application ported to use the React web framework.

## HTML deliverable

For this deliverable I built out the structure of my application using HTML.

- **HTML pages** (20%) - Each component of my application has a page (Login, About, Country, Itinerary).
- **HTML Tags** (10%) - I use HTML tags properly including BODY, NAV, MAIN, HEADER, FOOTER, MENU, P, B, DIV, SPAN, UL, LI, H2, etc.
- **Links** (10%) - Links exist between pages as necessary.
- **Application textual content** (10%) - Got it. Text content on each page.
- **Placeholder for 3rd party service calls** (10%) - These include Security Risk - for UN Security Level accessed by API, Recent News, Freedom Index, Population, Currency, Major SIM/Cell/Internet providers, Pollution Levels, UN Standing.
- **Application images** (10%) - Country page includes image for country flag as well as the itinerary page.
- **Login placeholder, including user name display** (10%) - This is the main page (index.html).
- **Database** (10%) - Data placeholders include user information, itineraries, basic country info (age, capital, etc.), and flag images. 
- **WebSocket data placeholder** (10%) - Real-time data will be exchanged and displayed about users added to itineraries.

## CSS deliverable

For this deliverable I properly styled the application into its final appearance.

- **Header, footer, and main content body** (30%) - I have the same header and footer for each of the four pages (except the main login page which doesn’t have a header) and unique body content for each as well.
- **Navigation elements** (20%) - Each page, besides the login page, has a menu in the top right with links to the other pages. Text decoration is removed to make them look nice. A logo is also added on the top left that links to the main page.
- **Responsive to window resizing** (10%) - Each page is responsive to window re-sizing.
- **Application elements** (20%) - Application elements include a login page, a page where you can look up country information, a page where create itineraries, and an About page. I also used stylistic elements like whitespace, shadows, and different variations of the color gray to accent buttons and boxes.
- **Application text content** (10%) - The application has text content on each page.
- **Application images** (10%) - The application has images on each page.

## JavaScript deliverable

For this deliverable I added some functionality with JavaScript.

- **JavaScript support for future login** (20%) - The main login page now has the ability for someone to type in a username that is then put in local storage and placed in the top right corner of every page to simulate a login
- **JavaScript support for future database data** (20%) - The username is currently retrieved from local storage but will later be retrieved from a database (in addition to the password). If you click on the username in the top right, I've added a profile page that pops up, which will also be filled with info from the database.
- **JavaScript support for future WebSocket** (20%) - I've used JavaScript to create a function that simulates updating the AED to USD currency exchange rate in real time but is actually just displaying random numbers every 1000ms that are close to the real exchange rate. This will be replaced by a WebSocket with real-time data later. This is found inside the Currency accordion on the Country page.
- **JavaScript support for your application's interaction logic** (40%) - I've also used JavaScript to add the following interactions:
	- Accordions on the Country page with +- animation (Bootstrap 5 JS) - I'll add more of these.
	- Itinerary pop-up: Clicking 'Add to Itinerary' on the Country page triggers a pop-up that (eventually) will allow you to search the itinerary you'd like to add it to.
	- Profile pop-up: Clicking the profile name on any page brings up a profile page.
  - Itinerary Travelers: Buttons on the Itinerary page now allow the current user to add or remove themselves from that itinerary. Clicking 'Join Itinerary' will allow them to add themselves multiple times (which I will fix), but if they try to remove themselves from the itinerary and they aren't on it, then they will get an error message that says 'You have not joined this itinerary'.


## Service deliverable

I kinda hit a wall on this one. I did all the reading, watched the video, followed all the instructions, and dissected the Simon code, but every attempt I made did not work. I'm not sure what I'm doing wrong but I will connect with a TA to figure it out. I think I may just not being fully understanding the front-end to back-end service concept. I built a another modal for when the user clicks on 'Create New Itinerary' on the Itinerary page which would then show up on that page when the three form boxes were submitted but it does not work.

- **Create an HTTP service using Node.js and Express** (40%) - I believe I have this in place. I can use the node command to run my index.js and view it in my browser at the local port 4000.
- **Frontend served up using Express static middleware** (10%) - I believe this is the code I have in the index.js file.
- **Frontend 3rd Party API Call** (10%) - I do have this in place with the quote API and it is working (on the About page).
- **Your backend provides service endpoints** (20%) - I hit a wall here. I thought I had created all the code necessary to do this in the index.js, main.js, and itinerary.html files but nothing seems to be working
- **Your frontend calls your service endpoints** (20%) - I hit a wall here. I thought I had created all the code necessary to do this in the index.js, main.js, and itinerary.html files but nothing seems to be working

