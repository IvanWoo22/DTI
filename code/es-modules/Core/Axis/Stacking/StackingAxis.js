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
import A from '../../Animation/AnimationUtilities.js';
import SeriesRegistry from '../../Series/SeriesRegistry.js';
import StackItem from './StackItem.js';
import U from '../../Utilities.js';

const {getDeferredAnimation} = A;
const {series: {prototype: seriesProto}} = SeriesRegistry;
const {addEvent, correctFloat, defined, destroyObjectProperties, fireEvent, isArray, isNumber, objectEach, pick} = U;

/* *
 *
 *  Functions
 *
 * */
/**
 * Generate stacks for each series and calculate stacks total values
 *
 * @private
 * @function Highcharts.Chart#getStacks
 */
function chartGetStacks() {
    const chart = this, inverted = chart.inverted;
    // reset stacks for each yAxis
    chart.yAxis.forEach((axis) => {
        if (axis.stacking && axis.stacking.stacks && axis.hasVisibleSeries) {
            axis.stacking.oldStacks = axis.stacking.stacks;
        }
    });
    chart.series.forEach((series) => {
        const xAxisOptions = series.xAxis && series.xAxis.options || {};
        if (series.options.stacking &&
            (series.visible === true ||
                chart.options.chart.ignoreHiddenSeries === false)) {
            series.stackKey = [
                series.type,
                pick(series.options.stack, ''),
                inverted ? xAxisOptions.top : xAxisOptions.left,
                inverted ? xAxisOptions.height : xAxisOptions.width
            ].join(',');
        }
    });
}

/**
 * @private
 */
function onAxisDestroy() {
    const stacking = this.stacking;
    if (!stacking) {
        return;
    }
    const stacks = stacking.stacks;
    // Destroy each stack total
    objectEach(stacks, function (stack, stackKey) {
        destroyObjectProperties(stack);
        stacks[stackKey] = null;
    });
    if (stacking &&
        stacking.stackTotalGroup) {
        stacking.stackTotalGroup.destroy();
    }
}

/**
 * @private
 */
function onAxisInit() {
    if (this.coll === 'yAxis' && !this.stacking) {
        this.stacking = new AxisAdditions(this);
    }
}

/**
 * Get stack indicator, according to it's x-value, to determine points with the
 * same x-value
 *
 * @private
 * @function Highcharts.Series#getStackIndicator
 */
function seriesGetStackIndicator(stackIndicator, x, index, key) {
    // Update stack indicator, when:
    // first point in a stack || x changed || stack type (negative vs positive)
    // changed:
    if (!defined(stackIndicator) ||
        stackIndicator.x !== x ||
        (key && stackIndicator.stackKey !== key)) {
        stackIndicator = {
            x: x,
            index: 0,
            key: key,
            stackKey: key
        };
    } else {
        (stackIndicator).index++;
    }
    stackIndicator.key =
        [index, x, stackIndicator.index].join(',');
    return stackIndicator;
}

/**
 * Iterate over all stacks and compute the absolute values to percent
 *
 * @private
 * @function Highcharts.Series#modifyStacks
 */
function seriesModifyStacks() {
    const series = this, yAxis = series.yAxis, stackKey = series.stackKey, stacks = yAxis.stacking.stacks,
        processedXData = series.processedXData, stacking = series.options.stacking,
        stacker = series[stacking + 'Stacker'];
    let stackIndicator;
    if (stacker) { // Modifier function exists (Series.percentStacker etc.)
        [stackKey, '-' + stackKey].forEach((key) => {
            let i = processedXData.length, x, stack, pointExtremes;
            while (i--) {
                x = processedXData[i];
                stackIndicator = series.getStackIndicator(stackIndicator, x, series.index, key);
                stack = stacks[key] && stacks[key][x];
                pointExtremes =
                    stack && stack.points[stackIndicator.key];
                if (pointExtremes) {
                    stacker.call(series, pointExtremes, stack, i);
                }
            }
        });
    }
}

/**
 * Modifier function for percent stacks. Blows up the stack to 100%.
 *
 * @private
 * @function Highcharts.Series#percentStacker
 */
function seriesPercentStacker(pointExtremes, stack, i) {
    const totalFactor = stack.total ? 100 / stack.total : 0;
    // Y bottom value
    pointExtremes[0] = correctFloat(pointExtremes[0] * totalFactor);
    // Y value
    pointExtremes[1] = correctFloat(pointExtremes[1] * totalFactor);
    this.stackedYData[i] = pointExtremes[1];
}

/**
 * Set grouped points in a stack-like object. When `centerInCategory` is true,
 * and `stacking` is not enabled, we need a pseudo (horizontal) stack in order
 * to handle grouping of points within the same category.
 *
 * @private
 * @function Highcharts.Series#setStackedPoints
 * @return {void}
 */
function seriesSetGroupedPoints() {
    const stacking = this.yAxis.stacking;
    if (this.options.centerInCategory &&
        (this.is('column') || this.is('columnrange')) &&
        // With stacking enabled, we already have stacks that we can compute
        // from
        !this.options.stacking &&
        // With only one series, we don't need to consider centerInCategory
        this.chart.series.length > 1) {
        seriesProto.setStackedPoints.call(this, 'group');
        // After updating, if we now have proper stacks, we must delete the group
        // pseudo stacks (#14986)
    } else if (stacking) {
        objectEach(stacking.stacks, (type, key) => {
            if (key.slice(-5) === 'group') {
                objectEach(type, (stack) => stack.destroy());
                delete stacking.stacks[key];
            }
        });
    }
}

/**
 * Adds series' points value to corresponding stack
 *
 * @private
 * @function Highcharts.Series#setStackedPoints
 */
function seriesSetStackedPoints(stackingParam) {
    const chart = this.chart, stacking = stackingParam || this.options.stacking;
    if (!stacking || (this.visible !== true &&
        chart.options.chart.ignoreHiddenSeries !== false)) {
        return;
    }
    const series = this, xData = series.processedXData, yData = series.processedYData, stackedYData = [],
        yDataLength = yData.length, seriesOptions = series.options, threshold = seriesOptions.threshold,
        stackThreshold = pick(seriesOptions.startFromThreshold && threshold, 0), stackOption = seriesOptions.stack,
        stackKey = stackingParam ? `${series.type},${stacking}` : series.stackKey, negKey = '-' + stackKey,
        negStacks = series.negStacks, yAxis = stacking === 'group' ?
            chart.yAxis[0] :
            series.yAxis, stacks = yAxis.stacking.stacks, oldStacks = yAxis.stacking.oldStacks;
    let stackIndicator, isNegative, stack, other, key, pointKey, i, x, y;
    yAxis.stacking.stacksTouched += 1;
    // loop over the non-null y values and read them into a local array
    for (i = 0; i < yDataLength; i++) {
        x = xData[i];
        y = yData[i];
        stackIndicator = series.getStackIndicator(stackIndicator, x, series.index);
        pointKey = stackIndicator.key;
        // Read stacked values into a stack based on the x value,
        // the sign of y and the stack key. Stacking is also handled for null
        // values (#739)
        isNegative = negStacks && y < (stackThreshold ? 0 : threshold);
        key = isNegative ? negKey : stackKey;
        // Create empty object for this stack if it doesn't exist yet
        if (!stacks[key]) {
            stacks[key] = {};
        }
        // Initialize StackItem for this x
        if (!stacks[key][x]) {
            if (oldStacks[key] &&
                oldStacks[key][x]) {
                stacks[key][x] = oldStacks[key][x];
                stacks[key][x].total = null;
            } else {
                stacks[key][x] = new StackItem(yAxis, yAxis.options.stackLabels, !!isNegative, x, stackOption);
            }
        }
        // If the StackItem doesn't exist, create it first
        stack = stacks[key][x];
        if (y !== null) {
            stack.points[pointKey] = stack.points[series.index] =
                [pick(stack.cumulative, stackThreshold)];
            // Record the base of the stack
            if (!defined(stack.cumulative)) {
                stack.base = pointKey;
            }
            stack.touched = yAxis.stacking.stacksTouched;
            // In area charts, if there are multiple points on the same X value,
            // let the area fill the full span of those points
            if (stackIndicator.index > 0 && series.singleStacks === false) {
                stack.points[pointKey][0] =
                    stack.points[series.index + ',' + x + ',0'][0];
            }
            // When updating to null, reset the point stack (#7493)
        } else {
            stack.points[pointKey] = stack.points[series.index] =
                null;
        }
        // Add value to the stack total
        if (stacking === 'percent') {
            // Percent stacked column, totals are the same for the positive and
            // negative stacks
            other = isNegative ? stackKey : negKey;
            if (negStacks && stacks[other] && stacks[other][x]) {
                other = stacks[other][x];
                stack.total = other.total =
                    Math.max(other.total, stack.total) +
                    Math.abs(y) ||
                    0;
                // Percent stacked areas
            } else {
                stack.total =
                    correctFloat(stack.total + (Math.abs(y) || 0));
            }
        } else if (stacking === 'group') {
            if (isArray(y)) {
                y = y[0];
            }
            // In this stack, the total is the number of valid points
            if (y !== null) {
                stack.total = (stack.total || 0) + 1;
            }
        } else {
            stack.total = correctFloat(stack.total + (y || 0));
        }
        if (stacking === 'group') {
            // This point's index within the stack, pushed to stack.points[1]
            stack.cumulative = (stack.total || 1) - 1;
        } else {
            stack.cumulative = correctFloat(pick(stack.cumulative, stackThreshold) +
                (y || 0));
        }
        if (y !== null) {
            stack.points[pointKey].push(stack.cumulative);
            stackedYData[i] = stack.cumulative;
            stack.hasValidPoints = true;
        }
    }
    if (stacking === 'percent') {
        yAxis.stacking.usePercentage = true;
    }
    if (stacking !== 'group') {
        this.stackedYData = stackedYData; // To be used in getExtremes
    }
    // Reset old stacks
    yAxis.stacking.oldStacks = {};
}

/* *
 *
 *  Classes
 *
 * */
/**
 * Adds stacking support to axes.
 * @private
 * @class
 */
class AxisAdditions {
    /* *
     *
     *  Constructors
     *
     * */
    constructor(axis) {
        this.oldStacks = {};
        this.stacks = {};
        this.stacksTouched = 0;
        this.axis = axis;
    }

    /* *
     *
     *  Functions
     *
     * */
    /**
     * Build the stacks from top down
     * @private
     */
    buildStacks() {
        const stacking = this;
        const axis = stacking.axis;
        const axisSeries = axis.series;
        const reversedStacks = axis.options.reversedStacks;
        const len = axisSeries.length;
        let actualSeries, i;
        stacking.usePercentage = false;
        i = len;
        while (i--) {
            actualSeries = axisSeries[reversedStacks ? i : len - i - 1];
            actualSeries.setStackedPoints();
            actualSeries.setGroupedPoints();
        }
        // Loop up again to compute percent and stream stack
        for (i = 0; i < len; i++) {
            axisSeries[i].modifyStacks();
        }
        fireEvent(axis, 'afterBuildStacks');
    }

    /**
     * @private
     */
    cleanStacks() {
        const stacking = this;
        let stacks;
        if (stacking.oldStacks) {
            stacks = stacking.stacks = stacking.oldStacks;
        }
        // reset stacks
        objectEach(stacks, function (type) {
            objectEach(type, function (stack) {
                stack.cumulative = stack.total;
            });
        });
    }

    /**
     * Set all the stacks to initial states and destroy unused ones.
     * @private
     */
    resetStacks() {
        objectEach(this.stacks, (type) => {
            objectEach(type, (stack, x) => {
                // Clean up memory after point deletion (#1044, #4320)
                if (isNumber(stack.touched) &&
                    stack.touched < this.stacksTouched) {
                    stack.destroy();
                    delete type[x];
                    // Reset stacks
                } else {
                    stack.total = null;
                    stack.cumulative = null;
                }
            });
        });
    }

    /**
     * @private
     */
    renderStackTotals() {
        const stacking = this, axis = stacking.axis, chart = axis.chart, renderer = chart.renderer,
            stacks = stacking.stacks, stackLabelsAnim = axis.options.stackLabels &&
                axis.options.stackLabels.animation, animationConfig = getDeferredAnimation(chart, stackLabelsAnim || false),
            stackTotalGroup = stacking.stackTotalGroup = (stacking.stackTotalGroup ||
                renderer
                    .g('stack-labels')
                    .attr({
                        zIndex: 6,
                        opacity: 0
                    })
                    .add());
        // plotLeft/Top will change when y axis gets wider so we need to
        // translate the stackTotalGroup at every render call. See bug #506
        // and #516
        stackTotalGroup.translate(chart.plotLeft, chart.plotTop);
        // Render each stack total
        objectEach(stacks, function (type) {
            objectEach(type, function (stack) {
                stack.render(stackTotalGroup);
            });
        });
        stackTotalGroup.animate({
            opacity: 1
        }, animationConfig);
    }
}

/* *
 *
 *  Composition
 *
 * */
var StackingAxis;
(function (StackingAxis) {
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
     * Extends axis with stacking support.
     * @private
     */
    function compose(AxisClass, ChartClass, SeriesClass) {
        if (U.pushUnique(composedMembers, AxisClass)) {
            addEvent(AxisClass, 'init', onAxisInit);
            addEvent(AxisClass, 'destroy', onAxisDestroy);
        }
        if (U.pushUnique(composedMembers, ChartClass)) {
            const chartProto = ChartClass.prototype;
            chartProto.getStacks = chartGetStacks;
        }
        if (U.pushUnique(composedMembers, SeriesClass)) {
            const seriesProto = SeriesClass.prototype;
            seriesProto.getStackIndicator = seriesGetStackIndicator;
            seriesProto.modifyStacks = seriesModifyStacks;
            seriesProto.percentStacker = seriesPercentStacker;
            seriesProto.setGroupedPoints = seriesSetGroupedPoints;
            seriesProto.setStackedPoints = seriesSetStackedPoints;
        }
    }

    StackingAxis.compose = compose;
})(StackingAxis || (StackingAxis = {}));
/* *
 *
 *  Default Export
 *
 * */
export default StackingAxis;
