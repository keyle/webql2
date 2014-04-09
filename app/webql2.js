var utils;
(function (utils) {
    var Color = (function () {
        function Color() {
        }
        Color.RESET = "\x1b[0m";
        Color.RED = "\x1b[31m";
        Color.REDB = "\x1b[1;31m";
        Color.GREEN = "\x1b[32m";
        Color.GREENB = "\x1b[1;32m";
        Color.YELLOW = "\x1b[33m";
        Color.YELLOWB = "\x1b[1;33m";
        Color.CYAN = "\x1b[36m";
        Color.CYANB = "\x1b[1;36m";
        Color.PINK = "\x1b[35m";
        Color.PINKB = "\x1b[1;35m";
        Color.WHITEB = "\x1b[1;37m";
        return Color;
    })();
    utils.Color = Color;
})(utils || (utils = {}));
var cheerio = require("cheerio"), request = require("request");

var webql2;
(function (webql2) {
    var Query = (function () {
        function Query() {
            this._shuffle = false;
            this._first = false;
            this._last = false;
            this._limit = 0;
            this._skip = 0;
            this._nth = 0;
            this._to = "csv";
        }
        Query.create = function () {
            return new Query();
        };

        Query.prototype.from = function (from) {
            this._from = from;
            return this;
        };

        Query.prototype.select = function (select) {
            this._select = select;
            return this;
        };

        Query.prototype.where = function (predicate1, condition, predicate2) {
            this._wherePredicate1 = predicate1;
            this._whereCondition = condition;
            this._wherePredicate2 = predicate2;
            return this;
        };

        Query.prototype.shuffle = function () {
            this._shuffle = true;
            return this;
        };

        Query.prototype.first = function () {
            this._first = true;
            return this;
        };

        Query.prototype.last = function () {
            this._last = true;
            return this;
        };

        Query.prototype.limit = function (num) {
            this._limit = num;
            return this;
        };

        Query.prototype.skip = function (num) {
            this._skip = num;
            return this;
        };

        Query.prototype.nth = function (num) {
            this._nth = num;
            return this;
        };

        Query.prototype.to = function (target) {
            this._to = target;
            return this;
        };

        Query.prototype.init = function () {
            if (!this._from || !this._select)
                throw ('from & select are required.');
            var url = this._from, query = this;
            request(url, function (err, resp, body) {
                if (err)
                    throw (err);
                query.parse(body);
            });
        };

        Query.prototype.parse = function (body) {
            var _this = this;
            console.log('-> ' + this._select);
            var $ = cheerio.load(body), linksObjects = $(this._select), links = Array.prototype.slice.call(linksObjects);
            links.forEach(function (link) {
                if (_this._whereCondition) {
                }

                console.log($(link).parent().html());
            });
        };
        return Query;
    })();
    webql2.Query = Query;
})(webql2 || (webql2 = {}));
var Color = utils.Color;
var Query = webql2.Query;

var webql2;
(function (webql2) {
    var Webql = (function () {
        function Webql() {
            var args = Webql.getArgs();
            var tokens = Parser.tokenize(args);
            if (!Parser.validate(tokens))
                throw (Errors[2 /* MISSING_MINIMUM_ARGUMENTS_SELECT_AND_FROM */]);
            log(JSON.stringify(tokens, null, 2));

            var query = webql2.Query.create().from("http://noben.org").select('a, a.href').where('a', 'contains', 'keyle').init();
        }
        Webql.getArgs = function () {
            var args = [];
            var querybegins = false;
            process.argv.forEach(function (item) {
                if (item == '--query' || item == '-q')
                    querybegins = true;
                if (querybegins)
                    args.push(item);
            });
            log('\n  ' + Color.CYANB + args + Color.RESET);
            return args;
        };
        return Webql;
    })();
    webql2.Webql = Webql;

    var Parser = (function () {
        function Parser() {
        }
        Parser.tokenize = function (arr) {
            var tokens = [], keywords = Parser.keywords;
            arr.forEach(function (word, idx) {
                if (word in keywords) {
                    var lookfwd = Number(keywords[word]), params = [];
                    if (lookfwd > 0) {
                        for (var i = 1; i <= lookfwd; i++) {
                            if (idx + i > arr.length)
                                throw (Errors[1 /* INVALID_ARGUMENT */]);
                            if (arr[idx + i] in keywords)
                                throw (Errors[0 /* INVALID_ARGUMENT_COUNT */]);
                            params.push(arr[idx + i]);
                        }
                    }
                    tokens.push(new Token(word, params));
                }
            });
            return tokens;
        };

        Parser.validate = function (tokens) {
            var fromFound = false, selectFound = false;
            tokens.forEach(function (token) {
                if (token.name == "from")
                    fromFound = true;
                else if (token.name == "select")
                    selectFound = true;
            });
            return fromFound && selectFound;
        };
        Parser.keywords = { from: 1, select: 1, where: 3, limit: 1, skip: 1, reverse: 0, shuffle: 0, first: 0, last: 0, nth: 1, to: 1 };
        return Parser;
    })();
    webql2.Parser = Parser;

    var Token = (function () {
        function Token(name, params) {
            this.name = name;
            this.params = params;
        }
        return Token;
    })();
    webql2.Token = Token;

    (function (Errors) {
        Errors[Errors["INVALID_ARGUMENT_COUNT"] = 0] = "INVALID_ARGUMENT_COUNT";
        Errors[Errors["INVALID_ARGUMENT"] = 1] = "INVALID_ARGUMENT";
        Errors[Errors["MISSING_MINIMUM_ARGUMENTS_SELECT_AND_FROM"] = 2] = "MISSING_MINIMUM_ARGUMENTS_SELECT_AND_FROM";
    })(webql2.Errors || (webql2.Errors = {}));
    var Errors = webql2.Errors;
})(webql2 || (webql2 = {}));

function log(element) {
    console.log(element);
}

var app = new webql2.Webql();
//# sourceMappingURL=webql2.js.map
