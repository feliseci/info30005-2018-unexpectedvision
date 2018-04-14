// Note: This is not a working, or well-designed database.
// It's simply designed to spit out the data required for the front-end.

const issues = [
    {
        name: "Facebook data leak",
        type: "editor",
        date: "12/2",
        popularity: 1,
        categories: ["privacy", "internet"],
        image: "https://source.unsplash.com/random/800x600",
        url: "",  // URL constructed from (site)/(type)/url (url = id) //TODO: URL for test editor page
        description: "Facebook records users' metadata and sells it to other companies."
    },
    {
        name: "Horse racing",
        type: "contributor",
        date: "12/3",
        popularity: 2,
        categories: ["animal welfare"],
        image: "https://source.unsplash.com/p5EiqkBYIEE/800x600",
        url: "0",
        description: "Is horse racing animal abuse?"
    },
    {
        name: "Global warming",
        type: "editor",
        date: "12/2",
        popularity: 3,
        categories: ["environment"],
        image: "https://source.unsplash.com/eXdKs9d37Sc/800x600",
        url: "",
        description: "Global warming dummy text"
    }
];

module.exports = issues;