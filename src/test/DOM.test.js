/**
 * @jest-environment jsdom
 */

// tests for src/DOM.js

import { 
    getElementById, 
    querySelector,
    querySelectorAll,
    querySelectorWithin
} from "../DOM.js";

import Either from '../Either/Either.js';
import Lst from '../Arr/Lst.js';

describe('getElementById Tests', () => {
    beforeEach(() => {
        document.body.innerHTML = `<div id="test">Old Text</div>`;
    });

    test('returns Right when node is found', () => {
        
        let el = getElementById('test');

        expect(el).toBeInstanceOf(Either);
        expect(
            el.fork(
                x => "not found",
                x => x.innerHTML
            )
        ).toBe("Old Text");

    })

    test('returns Left when node is missing', () => {
        
        let el = getElementById('nope');

        expect(el).toBeInstanceOf(Either);
        expect(
            el.fork(
                x => "not found",
                x => x.innerHTML
            )
        ).toBe("not found");

    })

});

describe('querySelector Tests', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="test">Old Text</div>
            <div class="quote">Quoteable</div>
        `;
    });

    test('returns Right when element is found', () => {
        
        let el = querySelector('.quote');

        expect(el).toBeInstanceOf(Either);
        expect(
            el.fork(
                x => "not found",
                x => x.innerHTML
            )
        ).toBe("Quoteable");

    });

    test('returns Left when element is missing', () => {
        
        let el = getElementById('.nope');

        expect(el).toBeInstanceOf(Either);
        expect(
            el.fork(
                x => "not found",
                x => x.innerHTML
            )
        ).toBe("not found");

    });

});

describe('querySelectorWithin Tests', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="wrap">
                <div id="test">Old Text</div>
                <div class="quote">Quoteable</div>
            </div>
        `;
    });

    test('returns Right when element is found', () => {
        
        let wrap = document.getElementById('wrap');
        let el = querySelectorWithin('.quote', wrap);

        expect(el).toBeInstanceOf(Either);
        expect(
            el.fork(
                x => "not found",
                x => x.innerHTML
            )
        ).toBe("Quoteable");

    });

    test('returns Left when element is missing', () => {
        
        let el = getElementById('.nope');

        expect(el).toBeInstanceOf(Either);
        expect(
            el.fork(
                x => "not found",
                x => x.innerHTML
            )
        ).toBe("not found");

    });

});

describe('querySelectorAll Tests', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="test">Old Text</div>
            <ul class="list">
                <li class="list-item">item 1</li>
                <li class="list-item">item 2</li>
                <li class="list-item">item 3</li>
            </ul>
        `;
    });

    test('returns Left when element is missing', () => {
        
        let el = querySelectorAll('.nope');

        expect(el).toBeInstanceOf(Either);
        expect(
            el.fork(
                x => "not found",
                x => x.innerHTML
            )
        ).toBe("not found");

    });

    test('returns Lst when elements are found', () => {
        
        let el = querySelectorAll('.list > .list-item');

        expect(el).toBeInstanceOf(Lst);
        expect(
            el.fork(
                x => "not found",
                x => x.length
            )
        ).toBe(3);

        expect(
            el.map(x => {
                return x.innerHTML
            })
            .join()
            .get() // needing to call "get" through me off at first
        ).toBe('item 1item 2item 3')

    });

});