export class Website {
    id: number | undefined;
    title: string;
    url: string;
    content!: string;
    average_rating: number = 0;
    number_of_ratings: number = 0;
    tags = [];
    latest_comments = [];
    created: Date;
    updated: Date;
    constructor(initializer?: any) {
        if(!initializer) throw new Error("Initialiser object is required");
        if(!initializer.title) throw new Error("\"title\" is required"); else this.title = initializer.title;
        if(!initializer.url) throw new Error("\"url\" is required"); else this.url = initializer.url;
        if(initializer.content == null) throw new Error("\"content\" is required"); this.content = initializer.content;
        if(initializer.average_rating) this.average_rating = initializer.average_rating;
        if(initializer.number_of_ratings) this.number_of_ratings = initializer.number_of_ratings;
        if(initializer.tags) this.tags = initializer.tags;
        if(initializer.latest_comments) this.latest_comments = initializer.latest_comments;
        if(!initializer.created) throw new Error("\"created\" parameter is required"); else this.created = initializer.created;
        if(!initializer.updated) throw new Error("\"updated\" parameter is required"); else this.updated = initializer.updated;
        return;
    }
    toString(): string {
        return this.title + " " + this.url + " " + this.content + " " + this.average_rating + " " + this.number_of_ratings + " " + this.created.toString() + " " + this.updated.toString();
    }
}