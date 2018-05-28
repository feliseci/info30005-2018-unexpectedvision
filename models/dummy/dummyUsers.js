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
        followingUsers: ["Maui"],
        opportunities: [{
            name: "Newton's Paddock bird survey",
            link: 3
        }],
        posts: [{
            article: "Horse racing",
            content: "I like this article. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            link: 2
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
        ]
    },
    {
        username: "LadyBird",
        display_name: "Saoirse Ronan",
        profile_description: "It's me, Saoirse Ronan",
        email: "",
        password: "???",
        is_editor: true,
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
        is_editor: true
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
        }]
    }

    //
    /* another_user -  opportunities: [{
        name: "Volunteer at Australian Red Cross Warehouse - Sunshine West",
        link: 5
    }]
    */
];

module.exports = dummyUsers;