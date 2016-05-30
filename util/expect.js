/* eslint-env node*/
import expect, {assert} from 'expect';
import {Iterable} from 'immutable';

expect.extend({
    toBeImmutable(json) {
        assert(Iterable.isIterable(this.actual), 'expected %s to be Immutable', this.actual);
        expect(this.actual.toJS()).toEqual(json);
    },

    toHaveLength(length) {
        expect(this.actual).toIncludeKey('length');
        assert(this.actual.length === length, 'expected %s to have length %s', this.actual, length);
        return this;
    }
});

global.expect = expect;
