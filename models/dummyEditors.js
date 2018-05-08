// Note: This is not a working, or well-designed database.
// It's simply designed to spit out the data required for the front-end.

const editors = [
    {
        name: "Intervention in the Middle East",
        creator: "LadyBird",
        date: "12/3",
        categories: ['middle east', 'intervention'],
        popularity: 3,
        description: "He was a jolly swag man, camped by a billabong",
        hl_source: ["http://www.actorpoint.com/free_monologues/mvm322.html", "https://proto.io/en/customers/"],
        r_source: ["http://www.google.com"],
        o_source: ["http://www.facebook.com"],
    },
    {
        name: "Trump in power",
        creator: "LadyBird",
        date: "14/3",
        categories: ['trump', 'america'],
        popularity: 4,
        description: "trump sucks lolololol trump sucks lololololtrump sucks",
        hl_source: ["http://www.google.com"],
        r_source: ["http://www.amazon.com"],
        o_source: ["http://www.youtube.com"],
    },
    {
        name: "Hello World",
        creator: "MontyPython",
        date: "15/3",
        categories: ['python', 'america'],
        popularity: 2,
        description: "You see that? That's where I was born. You know, one day, when I was a little boy, my mother she took me on her knee and she said: 'Gaston, my son. The world is a beautiful place. You must go into it, and love everyone, not hate people. You must try and make everyone happy, and bring peace and contentment everywhere you go.' And so...I became a waiter... Well... it's...it's not much of a philosophy, I know... but... well... f#@k you... I can live my own life in my own way if I want to. F#@k off! Don't come following me!",
        hl_source: ["http://www.helloworld.com"],
        r_source: [],
        o_source: [],
    }
];

module.exports = editors;