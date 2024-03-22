# Challenge 6 - Chitter FullStack

# Installation Instructions
- clone reposity
- add .evn.dev file to root folder
```
PORT=4000
DB_URI=mongodb://localhost:27017/challenge-6-chitter
JWT_SECRET=myWonderfulDigitalFuturesBackendJWTSecretKey###!!!k9p
```

- Add .env.test file to foot folder
```
DB_URI=mongodb://localhost:27017/challenge-6-test
PORT=4000
JWT_SECRET=myWonderfulDigitalFuturesBackendJWTSecretKey###!!!k9p
```

- Ensure mongoDB is running with a development and a testing database.
- Insert their URI in the .dev and .dev files, respectively.
- Cd into backend folder. Enter npm start.
- Cd into frontend/chitter-frontend. Enter npm run dev.

# Application Overview
Introducing Chitter by DFCorp, the latest innovation in social media platforms. Chitter is designed to offer a refreshing, user-centric approach to social interaction, allowing users to connect, share, and express themselves in a dynamic, digital environment. Our commitment to a seamless user experience and cutting-edge technology sets Chitter apart in the crowded social media landscape.

## Software purpose
Chitters core purpose is to enable users to crease and share "Peeps", short amounts of text, on a publicly available site. We aim to give everyone a voice and feel heard in an increasingly clouded world. Users can then reply to these Peeps to share their opinion on the topic, building an inclusive and knowledge sharing community.

## Technical application Explaination
The frontend React app uses a Single Page Application method of building web apps. React router creates the impression of changing web-pages, but this is handled within the Javascript, allowing for a faster, better UI experience.

The frontend calls API endpoints built on our Express.js server. This is used for logging in, creating an account, posting peeps, posting peep comments, getting all peeps, and so on. The express server offers key routes designed to give the frontend data for the site, which it obtains from the connection to our MongoDb NoSQL database.

Security is ensured through use of Json web tokens that encrypt key data and can only be decrypted on our server. HTTP-only cookies are used to send these to the frontend as these cannot be access by the frontend, but are automatically sent back in subsquent requests. This allows the server to check the request is legitimate for each request.

## Project Objectives
Accessibility and Ease of Use: Chitter is designed to be accessible without account creation, making it easy for anyone to view content.
Engagement and Community Building: Through user registration and replying to Peeps, Chitter fosters a sense of community, allowing for more personalised interaction.
Responsive and Intuitive Design: The platform is crafted to be fully responsive, ensuring a seamless experience across various devices.

### Approach
- **Storage and Data Management**: MongoDB will be used to store user data, Peeps, and Peep comments, providing a robust and scalable database solution.

- **Tech Stack:**
Frontend: React.js for its efficiency in building dynamic SPAs (Single Page Applications), ensuring a responsive and interactive user interface.
Backend: Node.js with Express for building the RESTful API, complemented by MongoDB for data storage.
User Authentication: JWT (JSON Web Tokens) for secure user authentication which is implemented through HTTP-only cookies for maximum security.

- **Responsive Design:** Leveraging CSS frameworks like Bootstrap for a responsive and modern UI , adaptable to various devices.

- **User-Centric Design:** A streamlined user experience, with a focus on ease of navigation and intuitive design. Key features include a prominent Peep feed, easy account management, and a straightforward posting interface.

- **Security:** JWT tokens are used for authorisation and security. They are stored within HTTP-only cookies to prevent cross-site scripting attacks.

- **Scalability and Future Expansion:** React's component structure and our folder management ensures re-usable components for future expansion. The application's architecture is built with scalability in mind, allowing for the easy integration of additional features and user growth.

### Results
**Achieved Results**
- Public access to Peep home page.
- User registration and login system.
- The ability for users to post and reply to peeps.
- Fully responsive design, ensuring functionality across devices.

**Potential Improvements**
- Enhanced UI/UX Design: Further refinement of the interface to enhance visual appeal and user engagement.
- Notification System: Develop a system for user notifications and tagging from other users.
- Add user following system that allows users to track peeps made by certain users.
- OAuth 2.0 for easy sign-up and login. This will allow users to build user accounts through existing gmail accounts for quicker signup, increasing user signup.

By addressing these improvements, Chitter can further solidify its position as a leading social media platform, providing users with an engaging, secure, and intuitive experience.


## Why use a single-page application?
### Introduction
A single-page application is a website that dynamically re-renders content to the current web page. In contrast, in multi-page applications, the web browser loads entirely new pages by fetching from a new url. For example, a developer would have multiple HTML files for the site, and the web browser re-directs the user to each, depending on the link/URL inputted.

Some examples of large single-page sites include Airbnb, Netflix and Google Maps. These are good examples because, to the user, it feels multi-page. For example, as the user clicks on different links, they go to different pages such as a signup or login page. The application is made to feel like it has many pages, but it uses Javascript behind the scenes to re-render the content making it feel like different pages.

### Advantages and Disadvantages of traditional multi-page application
#### Advantages
Speed
SPA take potentially longer to load on the initial load. However, as all the Javascript is downloaded on this initial visit, the site is much faster and offers a better user experience. The data can be transferred quicker within the browser than the browser making new requests for data from other URLs. This is ideal for intensive sites or sites that prioritise user experience.

Improved responsiveness
SPA's load pages within the Javascript, so pages don't need to be fetched for each new part of the site. Not only does this increase speed but also improves the responsiveness. Users won't be left on a white loading screen further adding to the user experience.

Scalability and reusability
Parts of a site often need to be used in different areas. For example, the navbar on a site will need to appear on every page. While you could copy and paste the HTML from one page to the next, this becomes extremely complicated, hard to follow and hard to maintain. What happens when you want to change a piece of that code? Javascript frameworks such as React allow you to create re-useable components that are particularly effective in single-page applications. It improves code readability, allows for them to be re-used, and structures the code in a way it can be built upon.

#### Disadvantages

Production speed
For small websites, multi-page solutions may provide a faster build time. The initial setup for multi-page solutions can take slightly longer making MPA better for small, easy-to-maintain sites.

SEO Optimisation
MPA are traditionally better for search engine optimisation. The distinct URLs of the pages make it easier for search engines to crawl and index each page separately, potentially putting it towards the top of the search. However, this is becoming less prominent, with engines like Google becoming far better at crawling SPAs.


### Advantages and Disadvantages of a server-side rendered application
Server-side rendering is where the browser requests a server that is built to return a rendered page. This provides some of the functionality of SPA such as re-useable components.

#### Advantages of Server side rendering
Initial load performance
The initial page load can be slower for SPA than server-side rendering because the browser is downloading all the content on the initial load.

Large, intensive takss
For tasks involving large dataset manipulation/actions, server-side rendering has more power than the browser allowing the tasks to be completely on the more powerful server. However, this problem can be resolved for SPA by using a server with API endpoints that can be called by the SPA. This allows the server to do more processing and then send the data to the SPA.

#### Disadvantages
User experience
Server-side rendering offers a much worse user experience with calls to the server needed for re-loading every new page. These delays detract from user experience.

Reduces Server Load
SPA's don't require a new call to the server for every load. The browser has the data required for loading each page and can use APIs for specific smaller transfers of data.





## Planning
### User stories
![img.png](img.png)
![img_1.png](img_1.png)

### Frontend and Backend tasks
![img_3.png](img_3.png)
![img_2.png](img_2.png)
![img_4.png](img_4.png)
![img_5.png](img_5.png)
![img_6.png](img_6.png)
![img_7.png](img_7.png)

### Connecting Diagram
![img_19.png](img_19.png)

### Component Hierarchy with state and api calls
![img_10.png](img_10.png)



# Proof of Prioritisation
![img_8.png](img_8.png)
![img_15.png](img_15.png)
![img_20.png](img_20.png)


# Proof of git tags
1
![img_12.png](img_12.png)
2
![img_16.png](img_16.png)

# Proof of AI
## Optimising/refactoring code
1
![img_11.png](img_11.png)
2
![img_21.png](img_21.png)
3
![img_22.png](img_22.png)


## Testing: Building more edge case tests
![img_13.png](img_13.png)
![img_14.png](img_14.png)
![img_17.png](img_17.png)
![img_18.png](img_18.png)