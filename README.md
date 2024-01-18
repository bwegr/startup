# Startup
CS260

Notes can be found [here](https://github.com/bwegr/startup/blob/main/notes.md)

# Global Traveler Tool

## Specification Deliverable

### Elevator pitch

Have you ever traveled to a new country and spent countless hours preparing for the trip? Have you ever gotten to that country and realized that, even with those hours  of research, you were unprepared for something? Figuring out the type of currency you need, visas, vaccines, electrical adapters, etc. can be so time-consuming and arduous! The Global Traveler Tool allows you to get the critical info you need about the countries you are traveling to all in one place in the blink of eye. Users can search countries one by one or create custom itineraries with any number of countries and get essential information in a concise and direct form to ensure their international travel, no matter how complex, will go smoothly.

### Design
Here is how the login page would look:

![Login Page](images/login.png)

Here is how the itinerary page would look:

![Itinerary Page](images/itinerarypage.png)

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
