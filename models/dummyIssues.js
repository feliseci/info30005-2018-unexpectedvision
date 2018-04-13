// Note: This is not a working, or well-designed database.
// It's simply designed to spit out the data required for the front-end.

const issues = [
    {
        name: "Facebook data leak",
        type: "editor",
        date: "12/2",
        popularity: 1,
        categories: ["privacy", "internet"]
    },
    {
        name: "Horse racing",
        type: "contributor",
        date: "12/3",
        popularity: 2,
        categories: ["animal welfare"]
    },
    {
        name: "Facebook stuff",
        type: "editor",
        date: "12/2",
        popularity: 3,
        categories: ["privacy", "internet"]
    }
];

module.exports = issues;