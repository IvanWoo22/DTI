/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import U from '../Core/Utilities.js';
import A from '../Core/Animation/AnimationUtilities.js';

const {syncTimeout} = U;
const {animObject} = A;

/**
 * Create a setTimeout for the first drawDataLabels()
 * based on the dataLabels.animation.defer value
 * for series which have enabled simulation.
 * @private
 */
function initDataLabelsDefer() {
    var _a;
    const dlOptions = this.options.dataLabels;
    // drawDataLabels() fires for the first time after
    // dataLabels.animation.defer time unless
    // the dataLabels.animation = false or dataLabels.defer = false
    // or if the simulation is disabled
    if (!(dlOptions === null || dlOptions === void 0 ? void 0 : dlOptions.defer) ||
        !((_a = this.options.layoutAlgorithm) === null || _a === void 0 ? void 0 : _a.enableSimulation)) {
        this.deferDataLabels = false;
    } else {
        syncTimeout(() => {
            this.deferDataLabels = false;
        }, dlOptions ? animObject(dlOptions.animation).defer : 0);
    }
}

/**
 * Initialize the SVG group for the DataLabels with correct opacities
 * and correct styles so that the animation for the series that have
 * simulation enabled works fine.
 * @private
 */
function initDataLabels() {
    const series = this, dlOptions = series.options.dataLabels;
    if (!series.dataLabelsGroup) {
        const dataLabelsGroup = this.initDataLabelsGroup();
        // Apply the dataLabels.style not only to the
        // individual dataLabels but also to the entire group
        if (!series.chart.styledMode && (dlOptions === null || dlOptions === void 0 ? void 0 : dlOptions.style)) {
            dataLabelsGroup.css(dlOptions.style);
        }
        // Initialize the opacity of the group to 0 (start of animation)
        dataLabelsGroup.attr({opacity: 0});
        if (series.visible) { // #2597, #3023, #3024
            dataLabelsGroup.show();
        }
        return dataLabelsGroup;
    }
    series.dataLabelsGroup.attr({opacity: 1});
    return series.dataLabelsGroup;
}

const DataLabelsDeferUtils = {
    initDataLabels,
    initDataLabelsDefer
};
export default DataLabelsDeferUtils;
