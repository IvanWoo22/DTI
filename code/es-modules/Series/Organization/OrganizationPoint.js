/* *
 *
 *  Organization chart module
 *
 *  (c) 2018-2021 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
import U from '../../Core/Utilities.js';

const {seriesTypes: {sankey: {prototype: {pointClass: SankeyPointClass}}}} = SeriesRegistry;
const {defined, find, pick} = U;

/**
 * Get columns offset including all sibiling and cousins etc.
 *
 * @private
 * @param node Point
 */
function getOffset(node) {
    let offset = node.linksFrom.length;
    node.linksFrom.forEach((link) => {
        if (link.id === link.toNode.linksTo[0].id) {
            // Node has children, that hangs directly from it:
            offset += getOffset(link.toNode);
        } else {
            // If the node hangs from multiple parents, and this is not
            // the last one, ignore it:
            offset--;
        }
    });
    return offset;
}

/* *
 *
 *  Class
 *
 * */
class OrganizationPoint extends SankeyPointClass {
    constructor() {
        /* *
         *
         *  Properties
         *
         * */
        super(...arguments);
        this.fromNode = void 0;
        this.linksFrom = void 0;
        this.linksTo = void 0;
        this.options = void 0;
        this.series = void 0;
        this.toNode = void 0;
    }

    /* *
     *
     *  Functions
     *
     * */
    init() {
        SankeyPointClass.prototype.init.apply(this, arguments);
        if (!this.isNode) {
            this.dataLabelOnNull = true;
            this.formatPrefix = 'link';
        }
        return this;
    }

    /**
     * All nodes in an org chart are equal width.
     * @private
     */
    getSum() {
        return 1;
    }

    /**
     * Set node.column for hanging layout
     * @private
     */
    setNodeColumn() {
        super.setNodeColumn();
        const node = this, fromNode = node.getFromNode().fromNode;
        // Hanging layout
        if (
            // Not defined by user
            !defined(node.options.column) &&
            // Has links to
            node.linksTo.length !== 0 &&
            // And parent uses hanging layout
            fromNode &&
            fromNode.options.layout === 'hanging') {
            // Default all children of the hanging node
            // to have hanging layout
            node.options.layout = pick(node.options.layout, 'hanging');
            node.hangsFrom = fromNode;
            let i = -1;
            find(fromNode.linksFrom, function (link, index) {
                const found = link.toNode === node;
                if (found) {
                    i = index;
                }
                return found;
            });
            // For all siblings' children (recursively)
            // increase the column offset to prevent overlapping
            for (let j = 0; j < fromNode.linksFrom.length; j++) {
                let link = fromNode.linksFrom[j];
                if (link.toNode.id === node.id) {
                    // Break
                    j = fromNode.linksFrom.length;
                } else {
                    i += getOffset(link.toNode);
                }
            }
            node.column = (node.column || 0) + i;
        }
    }
}

/* *
 *
 *  Default Export
 *
 * */
export default OrganizationPoint;
