/* *
 *
 *  This module implements sunburst charts in Highcharts.
 *
 *  (c) 2016-2021 Highsoft AS
 *
 *  Authors: Jon Arild Nygard
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
    series: {prototype: {pointClass: Point}},
    seriesTypes: {treemap: {prototype: {pointClass: TreemapPoint}}}
} = SeriesRegistry;
const {correctFloat, extend} = U;

/* *
 *
 *  Class
 *
 * */
class SunburstPoint extends TreemapPoint {
    constructor() {
        /* *
         *
         *  Properties
         *
         * */
        super(...arguments);
        this.node = void 0;
        this.options = void 0;
        this.series = void 0;
        this.shapeExisting = void 0;
        this.shapeType = void 0;
        /* eslint-enable valid-jsdoc */
    }

    /* *
     *
     *  Functions
     *
     * */

    /* eslint-disable valid-jsdoc */
    getDataLabelPath(label) {
        let renderer = this.series.chart.renderer, shapeArgs = this.shapeExisting, start = shapeArgs.start,
            end = shapeArgs.end, angle = start + (end - start) / 2, // arc middle value
            upperHalf = angle < 0 &&
                angle > -Math.PI ||
                angle > Math.PI, r = (shapeArgs.r + (label.options.distance || 0)), moreThanHalf;
        // Check if point is a full circle
        if (start === -Math.PI / 2 &&
            correctFloat(end) === correctFloat(Math.PI * 1.5)) {
            start = -Math.PI + Math.PI / 360;
            end = -Math.PI / 360;
            upperHalf = true;
        }
        // Check if dataLabels should be render in the upper half of the circle
        if (end - start > Math.PI) {
            upperHalf = false;
            moreThanHalf = true;
            // Close to the full circle, add some padding so that the SVG
            // renderer treats it as separate points (#18884).
            if ((end - start) > 2 * Math.PI - 0.01) {
                start += 0.01;
                end -= 0.01;
            }
        }
        if (this.dataLabelPath) {
            this.dataLabelPath = this.dataLabelPath.destroy();
        }
        // All times
        this.dataLabelPath = renderer
            .arc({
                open: true,
                longArc: moreThanHalf ? 1 : 0
            })
            .attr({
                start: (upperHalf ? start : end),
                end: (upperHalf ? end : start),
                clockwise: +upperHalf,
                x: shapeArgs.x,
                y: shapeArgs.y,
                r: (r + shapeArgs.innerR) / 2
            })
            .add(renderer.defs);
        return this.dataLabelPath;
    }

    isValid() {
        return true;
    }
}

extend(SunburstPoint.prototype, {
    getClassName: Point.prototype.getClassName,
    haloPath: Point.prototype.haloPath,
    setState: Point.prototype.setState
});
/* *
 *
 *  Defaul Export
 *
 * */
export default SunburstPoint;
