/* *
 *
 *  (c) 2009-2021 Øystein Moseng
 *
 *  Class that can keep track of elements added to DOM and clean them up on
 *  destroy.
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import H from '../../Core/Globals.js';
import HU from './HTMLUtilities.js';

const {doc} = H;
const {removeElement} = HU;

/* *
 *
 *  Class
 *
 * */
/**
 * @private
 */
class DOMElementProvider {
    /* *
     *
     *  Constructor
     *
     * */
    constructor() {
        this.elements = [];
    }

    /**
     * Create an element and keep track of it for later removal.
     * Same args as document.createElement
     * @private
     */
    createElement() {
        const el = doc.createElement.apply(doc, arguments);
        this.elements.push(el);
        return el;
    }

    /**
     * Destroy all created elements, removing them from the DOM.
     * @private
     */
    destroyCreatedElements() {
        this.elements.forEach(function (element) {
            removeElement(element);
        });
        this.elements = [];
    }
}

/* *
 *
 *  Default Export
 *
 * */
export default DOMElementProvider;
