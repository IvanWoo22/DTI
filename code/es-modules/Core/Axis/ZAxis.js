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
import Axis from './Axis.js';
import U from '../Utilities.js';

const {addEvent, merge, pick, splat} = U;
/* *
 *
 *  Constants
 *
 * */
const composedMembers = [];

/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function chartAddZAxis(options) {
    return new ZAxis(this, options);
}

/**
 * Get the Z axis in addition to the default X and Y.
 * @private
 */
function onChartAfterGetAxes() {
    const zAxisOptions = this.options.zAxis = splat(this.options.zAxis || {});
    if (!this.is3d()) {
        return;
    }
    this.zAxis = [];
    zAxisOptions.forEach((axisOptions, i) => {
        this.addZAxis(axisOptions).setScale();
    });
}

/* *
 *
 *  Class
 *
 * */
/**
 * 3D axis for z coordinates.
 */
class ZAxis extends Axis {
    constructor() {
        /* *
         *
         *  Static Properties
         *
         * */
        super(...arguments);
        this.isZAxis = true;
    }

    static compose(ChartClass) {
        if (U.pushUnique(composedMembers, ChartClass)) {
            addEvent(ChartClass, 'afterGetAxes', onChartAfterGetAxes);
            const chartProto = ChartClass.prototype;
            chartProto.addZAxis = chartAddZAxis;
            chartProto.collectionsWithInit.zAxis = [chartProto.addZAxis];
            chartProto.collectionsWithUpdate.push('zAxis');
        }
    }

    /* *
     *
     *  Constructor
     *
     * */
    init(chart, userOptions) {
        // #14793, this used to be set on the prototype
        this.isZAxis = true;
        super.init(chart, userOptions, 'zAxis');
    }

    /* *
     *
     *  Functions
     *
     * */
    getSeriesExtremes() {
        const chart = this.chart;
        this.hasVisibleSeries = false;
        // Reset properties in case we're redrawing (#3353)
        this.dataMin = this.dataMax = this.ignoreMinPadding = (this.ignoreMaxPadding = void 0);
        if (this.stacking) {
            this.stacking.buildStacks();
        }
        // loop through this axis' series
        this.series.forEach((series) => {
            if (series.visible ||
                !chart.options.chart.ignoreHiddenSeries) {
                let threshold = series.options.threshold;
                this.hasVisibleSeries = true;
                // Validate threshold in logarithmic axes
                if (this.positiveValuesOnly && threshold <= 0) {
                    threshold = void 0;
                }
                const zData = series.zData;
                if (zData.length) {
                    this.dataMin = Math.min(pick(this.dataMin, zData[0]), Math.min.apply(null, zData));
                    this.dataMax = Math.max(pick(this.dataMax, zData[0]), Math.max.apply(null, zData));
                }
            }
        });
    }

    /**
     * @private
     */
    setAxisSize() {
        const chart = this.chart;
        super.setAxisSize();
        this.width = this.len = (chart.options.chart.options3d &&
            chart.options.chart.options3d.depth) || 0;
        this.right = chart.chartWidth - this.width - this.left;
    }

    /**
     * @private
     */
    setOptions(userOptions) {
        userOptions = merge({
            offset: 0,
            lineWidth: 0
        }, userOptions);
        super.setOptions(userOptions);
    }
}

/* *
 *
 *  Default Export
 *
 * */
export default ZAxis;
