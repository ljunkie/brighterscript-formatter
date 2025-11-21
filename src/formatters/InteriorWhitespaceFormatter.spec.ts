
import { expect } from 'chai';
import { Formatter } from '../Formatter';

describe('insertSpaceBetweenFunctionAssignments', () => {
    let formatter: Formatter;

    beforeEach(() => {
        formatter = new Formatter();
    });

    it('formats empty objects in function parameters correctly', () => {
        const input = `
sub PlaybackSession_MakeDecisionAndSetContent(decisionOptions={} as object)
    print "hello"
end sub
`;
        const expected = `
sub PlaybackSession_MakeDecisionAndSetContent(decisionOptions = {} as object)
    print "hello"
end sub
`;
        // By default insertSpaceBetweenEmptyCurlyBraces is false (checking this assumption)
        expect(formatter.format(input).trim()).to.equal(expected.trim());
    });

    it('formats empty objects in function parameters correctly with explicit option false', () => {
        const input = `
sub PlaybackSession_MakeDecisionAndSetContent(decisionOptions={} as object)
    print "hello"
end sub
`;
        const expected = `
sub PlaybackSession_MakeDecisionAndSetContent(decisionOptions = {} as object)
    print "hello"
end sub
`;
        expect(formatter.format(input, { insertSpaceBetweenEmptyCurlyBraces: false }).trim()).to.equal(expected.trim());
    });

    it('formats empty objects in function parameters correctly with explicit option true', () => {
        const input = `
sub PlaybackSession_MakeDecisionAndSetContent(decisionOptions={} as object)
    print "hello"
end sub
`;
        const expected = `
sub PlaybackSession_MakeDecisionAndSetContent(decisionOptions = { } as object)
    print "hello"
end sub
`;
        expect(formatter.format(input, { insertSpaceBetweenEmptyCurlyBraces: true }).trim()).to.equal(expected.trim());
    });

    it('formats empty objects in function parameters correctly with insertSpaceBetweenFunctionAssignments: false', () => {
        const input = `
sub PlaybackSession_MakeDecisionAndSetContent(decisionOptions={} as object)
    print "hello"
end sub
`;
        const expected = `
sub PlaybackSession_MakeDecisionAndSetContent(decisionOptions={} as object)
    print "hello"
end sub
`;
        expect(formatter.format(input, { insertSpaceBetweenFunctionAssignments: false }).trim()).to.equal(expected.trim());
    });

    it('handles nested parentheses in function parameters correctly', () => {
        const input = `
sub foo(a = (1 + 2), b = 3)
    print "hello"
end sub
`;
        const expected = `
sub foo(a=(1 + 2), b=3)
    print "hello"
end sub
`;
        expect(formatter.format(input, { insertSpaceBetweenFunctionAssignments: false }).trim()).to.equal(expected.trim());
    });

    it('handles nested parentheses in function parameters correctly', () => {
        const input = `
sub foo(a = 1, b = 3)
    print "hello"
end sub
`;
        const expected = `
sub foo(a=1, b=3)
    print "hello"
end sub
`;
        expect(formatter.format(input, { insertSpaceBetweenFunctionAssignments: false }).trim()).to.equal(expected.trim());
    });

});
