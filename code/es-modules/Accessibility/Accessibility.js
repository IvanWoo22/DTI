/* *
 *
 *  (c) 2009-2021 Øystein Moseng
 *
 *  Accessibility module for Highcharts
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import D from '../Core/Defaults.js';
import H from '../Core/Globals.js';
import U from '../Core/Utilities.js';
import HU from './Utils/HTMLUtilities.js';
import A11yI18n from './A11yI18n.js';
import ContainerComponent from './Components/ContainerComponent.js';
import FocusBorder from './FocusBorder.js';
import InfoRegionsComponent from './Components/InfoRegionsComponent.js';
import KeyboardNavigation from './KeyboardNavigation.js';
import LegendComponent from './Components/LegendComponent.js';
import MenuComponent from './Components/MenuComponent.js';
import NewDataAnnouncer from './Components/SeriesComponent/NewDataAnnouncer.js';
import ProxyProvider from './ProxyProvider.js';
import RangeSelectorComponent from './Components/RangeSelectorComponent.js';
import SeriesComponent from './Components/SeriesComponent/SeriesComponent.js';
import ZoomComponent from './Components/ZoomComponent.js';
import whcm from './HighContrastMode.js';
import highContrastTheme from './HighContrastTheme.js';
import defaultOptionsA11Y from './Options/A11yDefaults.js';
import defaultLangOptions from './Options/LangDefaults.js';
import copyDeprecatedOptions from './Options/DeprecatedOptions.js';

const {defaultOptions} = D;
const {doc} = H;
const {addEvent, extend, fireEvent, merge} = U;
const {removeElement} = HU;

/* *
 *
 *  Class
 *
 * */
/**
 * The Accessibility class
 *
 * @private
 * @requires module:modules/accessibility
 *
 * @class
 * @name Highcharts.Accessibility
 *
 * @param {Highcharts.Chart} chart
 * Chart object
 */
class Accessibility {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(chart) {
        /* *
         *
         *  Properties
         *
         * */
        this.chart = void 0;
        this.components = void 0;
        this.keyboardNavigation = void 0;
        this.proxyProvider = void 0;
        this.init(chart);
    }

    /* *
     *
     *  Functions
     *
     * */

    /* eslint-disable valid-jsdoc */
    /**
     * Initialize the accessibility class
     * @private
     * @param {Highcharts.Chart} chart
     *        Chart object
     */
    init(chart) {
        this.chart = chart;
        // Abort on old browsers
        if (!doc.addEventListener) {
            this.zombie = true;
            this.components = {};
            chart.renderTo.setAttribute('aria-hidden', true);
            return;
        }
        // Copy over any deprecated options that are used. We could do this on
        // every update, but it is probably not needed.
        copyDeprecatedOptions(chart);
        this.proxyProvider = new ProxyProvider(this.chart);
        this.initComponents();
        this.keyboardNavigation = new KeyboardNavigation(chart, this.components);
    }

    /**
     * @private
     */
    initComponents() {
        const chart = this.chart;
        const proxyProvider = this.proxyProvider;
        const a11yOptions = chart.options.accessibility;
        this.components = {
            container: new ContainerComponent(),
            infoRegions: new InfoRegionsComponent(),
            legend: new LegendComponent(),
            chartMenu: new MenuComponent(),
            rangeSelector: new RangeSelectorComponent(),
            series: new SeriesComponent(),
            zoom: new ZoomComponent()
        };
        if (a11yOptions.customComponents) {
            extend(this.components, a11yOptions.customComponents);
        }
        const components = this.components;
        this.getComponentOrder().forEach(function (componentName) {
            components[componentName].initBase(chart, proxyProvider);
            components[componentName].init();
        });
    }

    /**
     * Get order to update components in.
     * @private
     */
    getComponentOrder() {
        if (!this.components) {
            return []; // For zombie accessibility object on old browsers
        }
        if (!this.components.series) {
            return Object.keys(this.components);
        }
        const componentsExceptSeries = Object.keys(this.components)
            .filter((c) => c !== 'series');
        // Update series first, so that other components can read accessibility
        // info on points.
        return ['series'].concat(componentsExceptSeries);
    }

    /**
     * Update all components.
     */
    update() {
        const components = this.components, chart = this.chart, a11yOptions = chart.options.accessibility;
        fireEvent(chart, 'beforeA11yUpdate');
        // Update the chart type list as this is used by multiple modules
        chart.types = this.getChartTypes();
        // Update proxies. We don't update proxy positions since most likely we
        // need to recreate the proxies on update.
        const kbdNavOrder = a11yOptions.keyboardNavigation.order;
        this.proxyProvider.updateGroupOrder(kbdNavOrder);
        // Update markup
        this.getComponentOrder().forEach(function (componentName) {
            components[componentName].onChartUpdate();
            fireEvent(chart, 'afterA11yComponentUpdate', {
                name: componentName,
                component: components[componentName]
            });
        });
        // Update keyboard navigation
        this.keyboardNavigation.update(kbdNavOrder);
        // Handle high contrast mode
        if (!chart.highContrastModeActive && // Only do this once
            whcm.isHighContrastModeActive()) {
            whcm.setHighContrastTheme(chart);
        }
        fireEvent(chart, 'afterA11yUpdate', {
            accessibility: this
        });
    }

    /**
     * Destroy all elements.
     */
    destroy() {
        const chart = this.chart || {};
        // Destroy components
        const components = this.components;
        Object.keys(components).forEach(function (componentName) {
            components[componentName].destroy();
            components[componentName].destroyBase();
        });
        // Destroy proxy provider
        if (this.proxyProvider) {
            this.proxyProvider.destroy();
        }
        // Remove announcer container
        if (chart.announcerContainer) {
            removeElement(chart.announcerContainer);
        }
        // Kill keyboard nav
        if (this.keyboardNavigation) {
            this.keyboardNavigation.destroy();
        }
        // Hide container from screen readers if it exists
        if (chart.renderTo) {
            chart.renderTo.setAttribute('aria-hidden', true);
        }
        // Remove focus border if it exists
        if (chart.focusElement) {
            chart.focusElement.removeFocusBorder();
        }
    }

    /**
     * Return a list of the types of series we have in the chart.
     * @private
     */
    getChartTypes() {
        const types = {};
        this.chart.series.forEach(function (series) {
            types[series.type] = 1;
        });
        return Object.keys(types);
    }
}

/* *
 *
 *  Class Namespace
 *
 * */
(function (Accessibility) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Constants
     *
     * */
    const composedMembers = [];
    Accessibility.i18nFormat = A11yI18n.i18nFormat;
    /* *
     *
     *  Functions
     *
     * */

    /* eslint-disable valid-jsdoc */
    /**
     * Destroy with chart.
     * @private
     */
    function chartOnDestroy() {
        if (this.accessibility) {
            this.accessibility.destroy();
        }
    }

    /**
     * Handle updates to the module and send render updates to components.
     * @private
     */
    function chartOnRender() {
        // Update/destroy
        if (this.a11yDirty && this.renderTo) {
            delete this.a11yDirty;
            this.updateA11yEnabled();
        }
        const a11y = this.accessibility;
        if (a11y && !a11y.zombie) {
            a11y.proxyProvider.updateProxyElementPositions();
            a11y.getComponentOrder().forEach(function (componentName) {
                a11y.components[componentName].onChartRender();
            });
        }
    }

    /**
     * Update with chart/series/point updates.
     * @private
     */
    function chartOnUpdate(e) {
        // Merge new options
        const newOptions = e.options.accessibility;
        if (newOptions) {
            // Handle custom component updating specifically
            if (newOptions.customComponents) {
                this.options.accessibility.customComponents =
                    newOptions.customComponents;
                delete newOptions.customComponents;
            }
            merge(true, this.options.accessibility, newOptions);
            // Recreate from scratch
            if (this.accessibility && this.accessibility.destroy) {
                this.accessibility.destroy();
                delete this.accessibility;
            }
        }
        // Mark dirty for update
        this.a11yDirty = true;
    }

    /**
     * @private
     */
    function chartUpdateA11yEnabled() {
        let a11y = this.accessibility;
        const accessibilityOptions = this.options.accessibility;
        if (accessibilityOptions && accessibilityOptions.enabled) {
            if (a11y && !a11y.zombie) {
                a11y.update();
            } else {
                this.accessibility = a11y = new Accessibility(this);
                if (a11y && !a11y.zombie) {
                    a11y.update();
                }
            }
        } else if (a11y) {
            // Destroy if after update we have a11y and it is disabled
            if (a11y.destroy) {
                a11y.destroy();
            }
            delete this.accessibility;
        } else {
            // Just hide container
            this.renderTo.setAttribute('aria-hidden', true);
        }
    }

    /**
     * @private
     */
    function compose(ChartClass, LegendClass, PointClass, SeriesClass, SVGElementClass, RangeSelectorClass) {
        // ordered:
        KeyboardNavigation.compose(ChartClass);
        NewDataAnnouncer.compose(SeriesClass);
        LegendComponent.compose(ChartClass, LegendClass);
        MenuComponent.compose(ChartClass);
        SeriesComponent.compose(ChartClass, PointClass, SeriesClass);
        // RangeSelector
        A11yI18n.compose(ChartClass);
        FocusBorder.compose(ChartClass, SVGElementClass);
        if (RangeSelectorClass) {
            RangeSelectorComponent.compose(ChartClass, RangeSelectorClass);
        }
        if (U.pushUnique(composedMembers, ChartClass)) {
            const chartProto = ChartClass.prototype;
            chartProto.updateA11yEnabled = chartUpdateA11yEnabled;
            addEvent(ChartClass, 'destroy', chartOnDestroy);
            addEvent(ChartClass, 'render', chartOnRender);
            addEvent(ChartClass, 'update', chartOnUpdate);
            // Mark dirty for update
            ['addSeries', 'init'].forEach((event) => {
                addEvent(ChartClass, event, function () {
                    this.a11yDirty = true;
                });
            });
            // Direct updates (events happen after render)
            ['afterApplyDrilldown', 'drillupall'].forEach((event) => {
                addEvent(ChartClass, event, function chartOnAfterDrilldown() {
                    const a11y = this.accessibility;
                    if (a11y && !a11y.zombie) {
                        a11y.update();
                    }
                });
            });
        }
        if (U.pushUnique(composedMembers, PointClass)) {
            addEvent(PointClass, 'update', pointOnUpdate);
        }
        if (U.pushUnique(composedMembers, SeriesClass)) {
            // Mark dirty for update
            ['update', 'updatedData', 'remove'].forEach((event) => {
                addEvent(SeriesClass, event, function () {
                    if (this.chart.accessibility) {
                        this.chart.a11yDirty = true;
                    }
                });
            });
        }
    }

    Accessibility.compose = compose;

    /**
     * Mark dirty for update.
     * @private
     */
    function pointOnUpdate() {
        if (this.series.chart.accessibility) {
            this.series.chart.a11yDirty = true;
        }
    }
})(Accessibility || (Accessibility = {}));
/* *
 *
 *  Registry
 *
 * */
// Add default options
merge(true, defaultOptions, defaultOptionsA11Y, {
    accessibility: {
        highContrastTheme: highContrastTheme
    },
    lang: defaultLangOptions
});
/* *
 *
 *  Default Export
 *
 * */
export default Accessibility;
