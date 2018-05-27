// Clean dummy data to repopulate the DB with after testing.
// NOTE: Dummy data is not necessarily reflective of the database.

const dummyOpportunities = [
    {
       name: "Volunteer with LandCare Australia",
       organiser: "LadyBird",
       categories: ["environment", "volunteer"],
       date_post: new Date(2018,3,10),
       date_event: new Date(2018,4,20,12),
       location: "Holmesglen",
       description: "Hello, world. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
       image: "https://source.unsplash.com/jRF4UDDuzJc/800x600",
       further_info: "http://google.com",
       popularity: 9
    },
    {
        name: "International Women's Day Fun Run",
        organiser: "Maui",
        categories: ["women", "funrun"],
        date_post: new Date(2018,3,14),
        date_event: new Date(2018,4,15,8),
        location: "Cabin in the Woods",
        description: "Run run run! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        image: "https://source.unsplash.com/c5SEmsjqq5o/800x600",
        further_info: "http://youtube.com",
        popularity: 3
    },
    {
        name: "Lore ipsum, again?",
        organiser: "orangecaramel",
        categories: ["america", "dummytext"],
        date_post: new Date(2018,3,14,9),
        date_event: new Date(2018,4,15,9),
        location: "Dummy location",
        description: "Dies irae! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse...",
        image: "https://source.unsplash.com/Evo4wmtRaPI/800x600",
        further_info: "http://youtube.com",
        popularity: 1
    },
    {
        name: "Lore ipsum",
        organiser: "orangecaramel",
        categories: ["dummytext"],
        date_post: new Date(2018,4,18),
        date_event: new Date(2018,5,15,15),
        location: "Port Catallena",
        description: "Come join in! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "https://source.unsplash.com/-9C3TMXwQjQ/800x600",
        further_info: "http://youtube.com",
        popularity: 2
    },
    {
        name: "Newton's Paddock bird survey",
        organiser: "Brockhampton",
        categories: ["environment", "maribyrnong"],
        date_post: new Date(2018,5,10),
        date_event: new Date(2018,5,20,13),
        location: "Maribyrnong River",
        description: "Lore ipsum, etc. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        image: "https://source.unsplash.com/OjKrEwGQ040/800x600",
        further_info: "http://youtube.com",
        popularity: 8
    }
];

module.exports = dummyOpportunities;