declare var require;

module webql2 {
    export class Query {
        private _from:string;
        private _select:string;
        private _wherePredicate1:string;
        private _whereCondition:string;
        private _wherePredicate2:string;
        private _shuffle = false;
        private _first = false;
        private _last = false;
        private _limit = 0;
        private _skip = 0;
        private _nth = 0;
        private _to:string = "csv";

        public static create() {
            return new Query();
        }

        public from(from:string):Query {
            this._from = from;
            return this;
        }

        public select(select:string):Query {
            this._select = select;
            return this;
        }

        public where(predicate1:string, condition:string, predicate2:string):Query {
            this._wherePredicate1 = predicate1;
            this._whereCondition = condition;
            this._wherePredicate2 = predicate2;
            return this;
        }

        public shuffle():Query {
            this._shuffle = true;
            return this;
        }

        public first():Query {
            this._first = true;
            return this;
        }

        public last():Query {
            this._last = true;
            return this;
        }

        public limit(num:number):Query {
            this._limit = num;
            return this;
        }

        public skip(num:number):Query {
            this._skip = num;
            return this;
        }

        public nth(num:number):Query {
            this._nth = num;
            return this;
        }

        public to(target:string):Query {
            this._to = target;
            return this;
        }

        public init() {
            // do stuff!
        }
    }
}
