declare var require;

module webql2 {
    export class Query {
        from:string;
        select:string;
        wherePredicate1:string;
        whereCondition:string;
        wherePredicate2:string;
        shuffle = false;
        first = false;
        last = false;
        limit = 0;
        skip = 0;
        nth = 0;
        to:string = "csv";

        public static create() {
            return new Query();
        }

        public setFrom(from:string):Query {
            return this;
        }
    }
}
