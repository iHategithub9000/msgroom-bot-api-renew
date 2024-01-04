import he from "he";
class Parser {
    parseArguments(input) {
        const args = input.replaceAll('&quot;',`"`).match(/[^\s"']+|"([^"]*)"|'([^']*)'/g) || [];
        return args.map(arg => {
        if (arg.startsWith('"') && arg.endsWith('"')) {
            return arg.slice(1, -1);
        } else if (arg.startsWith("'") && arg.endsWith("'")) {
            return arg.slice(1, -1);
        } else {
            return arg;
        }
        });
    }
    safeParseJSON(input) {
        try {
            return JSON.parse(input)
        } catch {
            return -1
        }
    }
    safeUnparseJSON(input) {
        try {
            return JSON.stringify(input)
        } catch {
            return -1
        }
    }
    parseEntity(input){
        return he.decode(input);
    }
    encode(inputString, encoding) {
        return Buffer.from(inputString).toString(encoding);
    }
    decode(encodedString, encoding) {
        return Buffer.from(encodedString, encoding).toString('utf-8');
    }
}
export default Parser;