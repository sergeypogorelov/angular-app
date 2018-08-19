import { Author } from './author';

export class Movie {
    id: number;
    title: string;
    duration: number;
    create_date: string;
    authors: Author[];

    constructor(obj?: any) {
        if (obj) {
            this.id = obj.id;
            this.title = obj.title;
            this.duration = obj.duration;
            this.create_date = obj.create_date;

            if (obj.authors && obj.authors.length) {
                this.authors = obj.authors.map(i => new Author(i));
            }
        }
    }
}
