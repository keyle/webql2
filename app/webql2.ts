///<reference path="utils.ts"/>
declare var process;
import Color = utils.Color;

module webql2 {
    export class Webql {

        constructor() {
//            log("webql wq v0.0.1 - (c) keyle");
            var args:string[] = Webql.getArgs();
            var tokens:Token[] = Parser.analyze(args);
            if (!Parser.validate(tokens)) throw(Errors[Errors.MISSING_MINIMUM_ARGUMENTS_SELECT_AND_FROM]);
            log(JSON.stringify(tokens, null, 2));
        }

        static getArgs() {
            var args:string[] = [];
            var querybegins:boolean = false;
            process.argv.forEach((item)=> {
                if (item == '--query' || item == '-q')
                    querybegins = true;
                if (querybegins)
                    args.push(item);
            });
            log('\n  ' + Color.CYANB + args + Color.RESET);
            return args;
        }
    }

    export class Parser {

        public static keywords = { from: 1, select: 1, where: 3, limit: 1, skip: 1, reverse: 0, shuffle: 0, first: 0, last: 0, nth: 1, to: 1 };

        public static analyze(arr:string[]):Token[] {
            var tokens:Token[] = [],
                keywords = Parser.keywords;
            arr.forEach((word, idx)=> {
                if (word in keywords) {
                    var lookfwd = Number(keywords[word]),
                        params:string[] = [];
                    if (lookfwd > 0) {
                        for (var i = 1; i <= lookfwd; i++) {
                            if (idx + i > arr.length) throw(Errors[Errors.INVALID_ARGUMENT]);
                            if (arr[idx + i] in keywords) throw(Errors[Errors.INVALID_ARGUMENT_COUNT]);
                            params.push(arr[idx + i]);
                        }
                    }
                    tokens.push(new Token(word, params));
                }
            });
            return tokens;
        }

        public static validate(tokens:Token[]):boolean {
            var fromFound = false,
                selectFound = false;
            tokens.forEach((token:Token)=> {
                if (token.name == "from") fromFound = true;
                else if (token.name == "select") selectFound = true;
            });
            return fromFound && selectFound;
        }
    }

    export class Token {
        constructor(public name:string, public params:string[]) {
        }
    }

    export enum Errors {
        INVALID_ARGUMENT_COUNT,
        INVALID_ARGUMENT,
        MISSING_MINIMUM_ARGUMENTS_SELECT_AND_FROM
    }

}

function log(element:any):void {
    console.log(element);
}

var app = new webql2.Webql();
