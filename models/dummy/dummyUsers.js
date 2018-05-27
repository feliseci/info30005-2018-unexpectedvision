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
        is_editor: true
    },
    {
        username: "orangecaramel",
        display_name: "Orange Caramel",
        profile_description: "",
        email: "",
        password: "???",
        is_editor: true
    },
    {
        username: "LadyBird",
        display_name: "Saoirse Ronan",
        profile_description: "It's me, Saoirse Ronan",
        email: "",
        password: "???",
        is_editor: true
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
        bookmarks: [[9, "Horse racing"]]
    }
];

module.exports = dummyUsers;