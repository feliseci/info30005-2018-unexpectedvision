// Clean dummy data to repopulate the DB with after testing.
const dummyOpportunities = [
    {
       name: "Volunteer with LandCare Australia",
       organiser: "LadyBird",
       categories: ["environment", "volunteer"],
       date_post: new Date(2018,3,10),
       date_event: new Date(2018,4,20,12),
       location: "Holmesglen",
       description: "hello world",
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
        description: "run run run",
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
        description: "Dies irae!",
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
        description: "Come join in!",
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
        description: "Lore ipsum, etc.",
        image: "https://source.unsplash.com/OjKrEwGQ040/800x600",
        further_info: "http://youtube.com",
        popularity: 8
    }
];

module.exports = dummyOpportunities;