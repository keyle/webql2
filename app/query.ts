declare var require;

var cheerio = require("cheerio"),
    request = require("request");

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

            if (!this._from || !this._select) throw('from & select are required.');
            var url = this._from,
                query = this;
            request(url, function (err, resp, body) {
                if (err) throw(err);
                query.parse(body);
            });
        }

        public parse(body) {
            console.log('-> ' + this._select);
            var $ = cheerio.load(body),
                linksObjects = $(this._select),
                links = Array.prototype.slice.call(linksObjects);
            links.forEach((link) => {

                if (this._whereCondition) {
                    if (this._whereCondition === "contains") {
                        if(this._wherePredicate1.indexOf('.') > -1) {
                            //TODO
                        }
                    } else if (this._whereCondition === "!contains") {

                    } else if (this._whereCondition === "match") {

                    }
                }

                console.log($(link).parent().html());
            });
        }
    }
}
