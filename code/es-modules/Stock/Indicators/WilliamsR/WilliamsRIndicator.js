/* *
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import AU from '../ArrayUtilities.js';
import SeriesRegistry from '../../../Core/Series/SeriesRegistry.js';
import U from '../../../Core/Utilities.js';

const {sma: SMAIndicator} = SeriesRegistry.seriesTypes;
const {extend, isArray, merge} = U;

/* *
 *
 *  Class
 *
 * */
/**
 * The Williams %R series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.williamsr
 *
 * @augments Highcharts.Series
 */
class WilliamsRIndicator extends SMAIndicator {
    constructor() {
        /* *
         *
         *  Static Properties
         *
         * */
        super(...arguments);
        /* *
         *
         *  Properties
         *
         * */
        this.data = void 0;
        this.options = void 0;
        this.points = void 0;
    }

    /* *
     *
     *  Functions
     *
     * */
    getValues(series, params) {
        const period = params.period, xVal = series.xData, yVal = series.yData, yValLen = yVal ? yVal.length : 0,
            WR = [], // 0- date, 1- Williams %R
            xData = [], yData = [], close = 3, low = 2, high = 1;
        let slicedY, extremes, R, HH, // Highest high value in period
            LL, // Lowest low value in period
            CC, // Current close value
            i;
        // Williams %R requires close value
        if (xVal.length < period ||
            !isArray(yVal[0]) ||
            yVal[0].length !== 4) {
            return;
        }
        // For a N-period, we start from N-1 point, to calculate Nth point
        // That is why we later need to comprehend slice() elements list
        // with (+1)
        for (i = period - 1; i < yValLen; i++) {
            slicedY = yVal.slice(i - period + 1, i + 1);
            extremes = AU.getArrayExtremes(slicedY, low, high);
            LL = extremes[0];
            HH = extremes[1];
            CC = yVal[i][close];
            R = ((HH - CC) / (HH - LL)) * -100;
            if (xVal[i]) {
                WR.push([xVal[i], R]);
                xData.push(xVal[i]);
                yData.push(R);
            }
        }
        return {
            values: WR,
            xData: xData,
            yData: yData
        };
    }
}

/**
 * Williams %R. This series requires the `linkedTo` option to be
 * set and should be loaded after the `stock/indicators/indicators.js`.
 *
 * @sample {highstock} stock/indicators/williams-r
 *         Williams %R
 *
 * @extends      plotOptions.sma
 * @since        7.0.0
 * @product      highstock
 * @excluding    allAreas, colorAxis, joinBy, keys, navigatorOptions,
 *               pointInterval, pointIntervalUnit, pointPlacement,
 *               pointRange, pointStart, showInNavigator, stacking
 * @requires     stock/indicators/indicators
 * @requires     stock/indicators/williams-r
 * @optionparent plotOptions.williamsr
 */
WilliamsRIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
    /**
     * Paramters used in calculation of Williams %R series points.
     * @excluding index
     */
    params: {
        index: void 0,
        /**
         * Period for Williams %R oscillator
         */
        period: 14
    }
});
extend(WilliamsRIndicator.prototype, {
    nameBase: 'Williams %R'
});
SeriesRegistry.registerSeriesType('williamsr', WilliamsRIndicator);
/* *
 *
 *  Default Export
 *
 * */
export default WilliamsRIndicator;
/* *
 *
 *  API Options
 *
 * */
/**
 * A `Williams %R Oscillator` series. If the [type](#series.williamsr.type)
 * option is not specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.williamsr
 * @since     7.0.0
 * @product   highstock
 * @excluding allAreas, colorAxis, dataParser, dataURL, joinBy, keys,
 *            navigatorOptions, pointInterval, pointIntervalUnit,
 *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/williams-r
 * @apioption series.williamsr
 */
''; // adds doclets above to the transpiled file
