export class Website {
    id: number | undefined;
    title!: string;
    url!: string;
    content!: string;
    average_rating: number = 0;
    number_of_ratings: number = 0;
    tags = [];
    latest_comments = [];
    created_at!: Date;
    updated_at!: Date;
    constructor(initializer?: any) {
        if(!initializer) return;
        if(!initializer.title) return; else this.title = initializer.title;
        if(!initializer.url) return; else this.url = initializer.url;
        if(!initializer.content) return; this.content = initializer.content;
        if(initializer.average_rating) this.average_rating = initializer.average_rating;
        if(initializer.number_of_ratings) this.number_of_ratings = initializer.number_of_ratings;
        if(initializer.tags) this.tags = initializer.tags;
        if(initializer.latest_comments) this.latest_comments = initializer.latest_comments;
        if(!initializer.created_at) return; else this.created_at = initializer.created_at;
        if(!initializer.updated_at) return; else this.updated_at = initializer.updated_at;
        return;
    }
}