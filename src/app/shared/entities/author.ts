export class Author {
    id: number;
    movieId: number;
    name: string;
    
    constructor(obj?: any) {
        if (obj) {
            this.id = obj.id;
            this.movieId = obj.movieId;
            this.name = obj.name;
        }
    }
}
