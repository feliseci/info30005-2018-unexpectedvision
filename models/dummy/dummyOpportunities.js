// Clean dummy data to repopulate the DB with after testing.
const dummyOpportunities = [
    {
       name: "Volunteer with LandCare Australia",
       organiser: "Helen1234",
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
        organiser: "babelFish2",
        categories: ["women", "funrun"],
        date_post: new Date(2018,3,14),
        date_event: new Date(2018,4,15,8),
        location: "Cabin in the Woods",
        description: "run run run",
        image: "https://source.unsplash.com/c5SEmsjqq5o/800x600",
        further_info: "http://youtube.com",
        popularity: 3
    }
];

module.exports = dummyOpportunities;