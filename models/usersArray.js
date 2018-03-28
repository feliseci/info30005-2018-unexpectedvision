/* LECTURE / WORKSHOP CODE - FOR REFERENCE*/
const faker = require('faker');

const users = [
    {
        name: faker.name.firstName() + " " + faker.name.lastName(),
        email: faker.internet.email(),
        title: faker.name.jobTitle()
    },
    {
        name: faker.name.firstName() + " " + faker.name.lastName(),
        email: faker.internet.email(),
        title: faker.name.jobTitle()
    },
    {
        name: faker.name.firstName() + " " + faker.name.lastName(),
        email: faker.internet.email(),
        title: faker.name.jobTitle()
    }
];

module.exports = users;