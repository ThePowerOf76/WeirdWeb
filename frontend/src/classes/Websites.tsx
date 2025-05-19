import { Website } from "./Website";
export let sample_data = [
    new Website({
        id: 1,
        title: "sizeof(cat)",
        url: "http://sizeof.cat",
        content: "",
        averageRating: 0,
        numberOfRatings: 0,
        tags: [
        "blog",
        "tech"
        ],
        latest_comments: [],
        created: Date.parse("2025-04-29T09:30:19.464Z"),
        updated: Date.parse("2025-04-29T09:30:19.464Z")
    }), 
    new Website({
        id: 2,
        title: "ArchWiki",
        url : "https://wiki.archlinux.org/",
        content : "Home Packages Forums Wiki GitLab Security AUR Download Jump to conten…",
        averageRating: 0,
        numberOfRatings: 0,
        tags: [
        "tech"
        ],
        latest_comments: [],
        created: Date.parse("2025-05-05T15:16:25.411+00:00"),
        updated: Date.parse("2025-05-05T15:16:25.411+00:00")
    }), 
    new Website({
        id: 3,
        title: "Myrdin's blog",
        url : "https://myrdin.cx",
        content : "Myrdin's blog bla bla bla",
        averageRating: 0,
        numberOfRatings: 0,
        tags: [
        "blog"
        ],
        latest_comments: [],
        created: Date.parse("2025-05-05T15:16:25.411+00:00"),
        updated: Date.parse("2025-05-05T15:16:25.411+00:00")
    }), 
];