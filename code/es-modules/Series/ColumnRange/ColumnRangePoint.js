/* *
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
import U from '../../Core/Utilities.js';

const {
    seriesTypes: {
        column: {prototype: {pointClass: {prototype: columnProto}}},
        arearange: {prototype: {pointClass: AreaRangePoint}}
    }
} = SeriesRegistry;
const {extend, isNumber} = U;

/* *
 *
 *  Class
 *
 * */
class ColumnRangePoint extends AreaRangePoint {
    constructor() {
        /* *
         *
         *  Properties
         *
         * */
        super(...arguments);
        this.options = void 0;
        this.series = void 0;
    }

    /* *
     *
     *  Functions
     *
     * */
    isValid() {
        return isNumber(this.low);
    }
}

extend(ColumnRangePoint.prototype, {
    setState: columnProto.setState
});
/* *
 *
 *  Default Export
 *
 * */
export default ColumnRangePoint;
