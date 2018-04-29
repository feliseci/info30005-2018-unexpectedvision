// Note: This is not a working, or well-designed database.
// It's simply designed to spit out the data required for the front-end.

const contributions = [
    {
        name: "Horse racing",
        creator: "Brockhampton",
        comments: [
        {
            username: "Brockhampton",
            date: "12/2",
            popularity: 2,
            description: "I like this article.",
            article_url: "",
        },
        {
            username: "ramenlover",
            date: "12/3",
            popularity: 2,
            description: "This is why this article is good....",
            article_url: "",
        },
        {
            username: "jason32123",
            date: "12/2",
            popularity: 1,
            description: "Extremely long dummy text for testing. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            article_url: "",
        },
        {
            username: "blackberry",
            date: "12/5",
            popularity: 5,
            description: "I like this article.",
            article_url: "",
        }]
    },

    {
        name: "Testing",
        creator: "???",
        comments: [
            {
                username: "???",
                date: "12/2",
                popularity: 2,
                description: "I like this article.",
                article_url: "",
            }]
    }
];

module.exports = contributions;