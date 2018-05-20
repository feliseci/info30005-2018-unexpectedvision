// Clean dummy data to repopulate the DB with after testing.
const dummyIssues = [
    {
        name: "Facebook data leak",
        author: "Brockhampton",
        date_post: new Date(2018,5,3,13),
        date_update: new Date(2018,5,3,13),
        popularity: 6,
        categories: ["privacy", "internet"], // TODO more appropriate images, articles
        hl_source: ["https://www.theage.com.au/sport/afl/afl-to-keep-close-watch-on-dip-in-scoring-20180503-p4zd9g.html",
            "https://www.theage.com.au/national/victoria/hurstbridge-trains-back-on-track-from-friday-20180503-p4zd6h.html"],
        r_source: ["https://www.theage.com.au/national/victoria/health-department-asks-robert-doyle-to-attend-interview-or-have-health-assessment-20180503-p4zd7g.html"],
        o_source: ["https://www.theage.com.au/national/victoria/health-department-asks-robert-doyle-to-attend-interview-or-have-health-assessment-20180503-p4zd7g.html"],
        image: "https://source.unsplash.com/_UeY8aTI6d0/800x600",
        description: "Facebook records users' metadata and sells it to other companies. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        contributions: [
            {
                author: "orangecaramel",
                comment: "I like this article",
                article_url: "https://www.theage.com.au/sport/afl/afl-to-keep-close-watch-on-dip-in-scoring-20180503-p4zd9g.html"
            }
        ]
    },
    {
        name: "Horse racing",
        author: "orangecaramel",
        date_post: new Date(2018,5,2,13),
        date_update: new Date(2018,5,2,13),
        popularity: 15,
        categories: ["animal welfare"],
        hl_source: ["https://www.theage.com.au/sport/afl/afl-to-keep-close-watch-on-dip-in-scoring-20180503-p4zd9g.html",
            "https://www.theage.com.au/national/victoria/hurstbridge-trains-back-on-track-from-friday-20180503-p4zd6h.html"],
        r_source: ["https://www.theage.com.au/national/victoria/health-department-asks-robert-doyle-to-attend-interview-or-have-health-assessment-20180503-p4zd7g.html"],
        o_source: ["https://www.theage.com.au/national/victoria/health-department-asks-robert-doyle-to-attend-interview-or-have-health-assessment-20180503-p4zd7g.html"],
        image: "https://source.unsplash.com/U-yHjENTmMg/800x600",
        description: "Them horses.",
        contributions: [
            {
                author: "Brockhampton",
/*                date: "12/2",
                popularity: 2,*/
                comment: "I like this article. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
                article_url: "",
            },
            {
                author: "ramenlover",
/*                date: "12/3",
                popularity: 2,*/
                comment: "This is why this article is good....",
                article_url: "",
            },
            {
                author: "jason32123",
/*                date: "12/2",
                popularity: 1,*/
                comment: "Extremely long dummy text for testing. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                article_url: "",
            },
            {
                author: "blackberry",
/*                date: "12/5",
                popularity: 5,*/
                comment: "I like this article.",
                article_url: "",
            }]
    },
    {
        name: "Global warming",
        author: "Brockhampton",
        date_post: Date.now(),
        date_update: Date.now(),
        popularity: 0,
        categories: ["environment"],
        hl_source: ["https://www.theage.com.au/sport/afl/afl-to-keep-close-watch-on-dip-in-scoring-20180503-p4zd9g.html",
            "https://www.theage.com.au/national/victoria/hurstbridge-trains-back-on-track-from-friday-20180503-p4zd6h.html"],
        r_source: ["https://www.theage.com.au/national/victoria/health-department-asks-robert-doyle-to-attend-interview-or-have-health-assessment-20180503-p4zd7g.html"],
        o_source: ["https://www.theage.com.au/national/victoria/health-department-asks-robert-doyle-to-attend-interview-or-have-health-assessment-20180503-p4zd7g.html"],
        image: "https://source.unsplash.com/wVMBn5sPQt0/800x600",
        description: "Global warming! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
        contributions: []
    },
    {
        name: "Intervention in the Middle East",
        author: "LadyBird",
        date: "12/3",
        categories: ['middle east', 'intervention'],
        popularity: 3,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        hl_source: ["http://www.actorpoint.com/free_monologues/mvm322.html", "https://proto.io/en/customers/"],
        r_source: ["http://www.google.com"],
        o_source: ["http://www.facebook.com"],
        date_post: Date.now(),
        date_update: Date.now(),
        contributions: [],
        image: "https://source.unsplash.com/SHKOxGviXvM/800x600"
    },
    {
        name: "Trump in power",
        author: "LadyBird",
        date: "14/3",
        categories: ['trump', 'america'],
        popularity: 4,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        hl_source: ["http://www.google.com"],
        r_source: ["http://www.amazon.com"],
        o_source: ["http://www.youtube.com"],
        date_post: Date.now(),
        date_update: Date.now(),
        contributions: [],
        image: "https://source.unsplash.com/H6mCeW7B9KY/800x600"
    },
    {
        name: "School uniform and transgender students",
        author: "MontyPython",
        date: "15/3",
        categories: ['lgbtq', 'australia'],
        popularity: 2,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        hl_source: ["http://www.helloworld.com"],
        r_source: [],
        o_source: [],
        date_post: Date.now(),
        date_update: Date.now(),
        contributions: [],
        image: "https://source.unsplash.com/LNwn_A9RGHo/800x600"
    }


];

module.exports = dummyIssues;