// Clean dummy data to repopulate the DB with after testing.
// NOTE: Dummy data is not necessarily reflective of the database.
// NOTE: None of these dummy users will have the details here changed.
// As editor application isn't functional, feel free to use any of these editors for testing.

const dummyUsers = [
    {
        username: "Brockhampton",
        display_name: "Brockhampton",
        profile_description: "Brockhampton going platinum",
        email: "",
        password: "???",
        is_editor: true,
        // Note: Below fields provided for reference against state of database at submission only
        articles: [{articleName: "Facebook data leak", description: "Facebook records users' metadata and sells it to other companies. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            id: 0}, {articleName: "Global warming", description: "Global warming! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            id: 0}],
        followingUsers: ["Maui"],
        opportunities: [{
            name: "Newton's Paddock bird survey",
            link: 3
        }]
    },
    {
        username: "orangecaramel",
        display_name: "Orange Caramel",
        profile_description: "",
        email: "",
        password: "???",
        is_editor: true,
        opportunities: [
            {
                name: "Lore ipsum, again?",
                link: 1
            },
            {
                name: "Lore ipsum",
                link: 4
            }
        ],
        posts: [{
            article: "Facebook data leak",
            content: "I like this article",
            link: 0
        },{
            article: "Facebook data leak",
            content: "This article is also interesting.",
            link: 0
        }],
        articles: [{articleName: "Horse racing", description: "Them horses.", id: 0}]
    },
    {
        username: "LadyBird",
        display_name: "Saoirse Ronan",
        profile_description: "It's me, Saoirse Ronan",
        email: "",
        password: "???",
        is_editor: true,
        article: [{articleName: "Intervention in the Middle East", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            id: 0}, {articleName: "Trump in power", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            id: 0}],
        opportunities: [{
            name: "Volunteer with LandCare Australia",
            link: 0
        }]
    },
    {
        username: "MontyPython",
        display_name: "MontyPython",
        profile_description: "'Tis but a scratch.",
        email: "",
        password: "???",
        is_editor: true,
        article: [{articleName: "School uniform and transgender students", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            id: 0}]
    },
    {
        username: "Maui",
        display_name: "Maui",
        profile_description: "You're welcome.",
        email: "",
        password: "???",
        is_editor: false,
        followedUsers: ["Brockhampton"],
        opportunities: [{
            name: "International Women's Day Fun Run",
            link: 2
        }],
        posts: [{
            article: "Facebook data leak",
            content: "Lorem ipsum....",
            link: 2
        }]

    }

    /* jcroft1 - "articles": [
        {
            "articleName": "The lawsuit of O'Connor v. Uber Technologies Inc.",
            "description": "The lawsuit of O\u2019Connor v. Uber Technologies Inc. has been filed by four drivers who have used the Uber App, and are suing Uber on behalf of a Class of drivers of similar circumstances in California. The key allegation against Uber is that drivers of Uber should legally be classified as employees, rather than independent contractors. The former classification dictates that Uber has violated the California Labor Code by not reimbursing its drivers for certain expenses, and not passing onto drivers the portion of the fare representative of their tip. This change in classification would also mean that Uber is legally obligated to provide employee benefits, and this would have significant economic impact on the future growth of the company. As it stands, Uber has disputed claims of an employee-employer relationship between itself and its drivers. Given that Uber does not own the means of transport, the company contends it is not an employer, but a \u201ctechnological intermediary\u201d as it only sells software in the form of the Uber App. However, this \u201cheld little significance for the court\u201d, and the court \u201cforcefully discounted Uber\u2019s attempt to limit itself as being a purely technology company, finding its characterization \u201cfatally flawed\u201d.",
            "id": 6
        }*/
    /* another_user -  opportunities: [{
        name: "Volunteer at Australian Red Cross Warehouse - Sunshine West",
        link: 5
    }]
    */
    /* hello1 - posts: [{
            article: "School uniform and transgender students",
            content: "This article is also worth a read!",
            link: 4
        }, {
            article: "Intervention in the Middle East",
            content: "Interventionism is difficult to grapple with",
            link: 3
        }]
        */
    /* general_user - posts: [{
            article: "Global warming",
            content: "I found this link to NASA's Global Climate Change Portal. It offers both a high-level and in-depth report look at the current global situation. I think the dashboard of statistics regarding the impacts of Climate Change particularly confronting! Definitely check it out :)",
            link: 1
        }]
        */

];

module.exports = dummyUsers;