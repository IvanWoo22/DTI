/* *
 *
 *  (c) 2016 Highsoft AS
 *  Authors: Jon Arild Nygard
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import U from '../../Utilities.js';

const {addEvent, isObject, isNumber, pick, wrap} = U;
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
function onTickInit() {
    const tick = this;
    if (!tick.treeGrid) {
        tick.treeGrid = new TreeGridTickAdditions(tick);
    }
}

/**
 * @private
 */
function onTickHover(label) {
    label.addClass('highcharts-treegrid-node-active');
    if (!label.renderer.styledMode) {
        label.css({
            textDecoration: 'underline'
        });
    }
}

/**
 * @private
 */
function onTickHoverExit(label, options) {
    const css = isObject(options.style) ? options.style : {};
    label.removeClass('highcharts-treegrid-node-active');
    if (!label.renderer.styledMode) {
        label.css({textDecoration: css.textDecoration});
    }
}

/**
 * @private
 */
function renderLabelIcon(tick, params) {
    const treeGrid = tick.treeGrid, isNew = !treeGrid.labelIcon, renderer = params.renderer, labelBox = params.xy,
        options = params.options, width = options.width || 0, height = options.height || 0, iconCenter = {
            x: labelBox.x - (width / 2) - (options.padding || 0),
            y: labelBox.y - (height / 2)
        }, rotation = params.collapsed ? 90 : 180, shouldRender = params.show && isNumber(iconCenter.y);
    let icon = treeGrid.labelIcon;
    if (!icon) {
        treeGrid.labelIcon = icon = renderer
            .path(renderer.symbols[options.type](options.x || 0, options.y || 0, width, height))
            .addClass('highcharts-label-icon')
            .add(params.group);
    }
    // Set the new position, and show or hide
    icon[shouldRender ? 'show' : 'hide'](); // #14904, #1338
    // Presentational attributes
    if (!renderer.styledMode) {
        icon
            .attr({
                cursor: 'pointer',
                'fill': pick(params.color, "#666666" /* Palette.neutralColor60 */),
                'stroke-width': 1,
                stroke: options.lineColor,
                strokeWidth: options.lineWidth || 0
            });
    }
    // Update the icon positions
    icon[isNew ? 'attr' : 'animate']({
        translateX: iconCenter.x,
        translateY: iconCenter.y,
        rotation: rotation
    });
}

/**
 * @private
 */
function wrapGetLabelPosition(proceed, x, y, label, horiz, labelOptions, tickmarkOffset, index, step) {
    const tick = this, lbOptions = pick(tick.options && tick.options.labels, labelOptions), pos = tick.pos,
        axis = tick.axis, options = axis.options, isTreeGrid = options.type === 'treegrid',
        result = proceed.apply(tick, [x, y, label, horiz, lbOptions, tickmarkOffset, index, step]);
    let symbolOptions, indentation, mapOfPosToGridNode, node, level;
    if (isTreeGrid) {
        symbolOptions = (lbOptions && isObject(lbOptions.symbol, true) ?
            lbOptions.symbol :
            {});
        indentation = (lbOptions && isNumber(lbOptions.indentation) ?
            lbOptions.indentation :
            0);
        mapOfPosToGridNode = axis.treeGrid.mapOfPosToGridNode;
        node = mapOfPosToGridNode && mapOfPosToGridNode[pos];
        level = (node && node.depth) || 1;
        result.x += (
            // Add space for symbols
            ((symbolOptions.width || 0) +
                ((symbolOptions.padding || 0) * 2)) +
            // Apply indentation
            ((level - 1) * indentation));
    }
    return result;
}

/**
 * @private
 */
function wrapRenderLabel(proceed) {
    const tick = this, pos = tick.pos, axis = tick.axis, label = tick.label,
        mapOfPosToGridNode = axis.treeGrid.mapOfPosToGridNode, options = axis.options,
        labelOptions = pick(tick.options && tick.options.labels, options && options.labels),
        symbolOptions = (labelOptions && isObject(labelOptions.symbol, true) ?
            labelOptions.symbol :
            {}), node = mapOfPosToGridNode && mapOfPosToGridNode[pos], level = node && node.depth,
        isTreeGrid = options.type === 'treegrid', shouldRender = axis.tickPositions.indexOf(pos) > -1,
        prefixClassName = 'highcharts-treegrid-node-', styledMode = axis.chart.styledMode;
    let collapsed, addClassName, removeClassName;
    if (isTreeGrid && node) {
        // Add class name for hierarchical styling.
        if (label &&
            label.element) {
            label.addClass(prefixClassName + 'level-' + level);
        }
    }
    proceed.apply(tick, Array.prototype.slice.call(arguments, 1));
    if (isTreeGrid &&
        label &&
        label.element &&
        node &&
        node.descendants &&
        node.descendants > 0) {
        collapsed = axis.treeGrid.isCollapsed(node);
        renderLabelIcon(tick, {
            color: (!styledMode &&
                label.styles &&
                label.styles.color ||
                ''),
            collapsed: collapsed,
            group: label.parentGroup,
            options: symbolOptions,
            renderer: label.renderer,
            show: shouldRender,
            xy: label.xy
        });
        // Add class name for the node.
        addClassName = prefixClassName +
            (collapsed ? 'collapsed' : 'expanded');
        removeClassName = prefixClassName +
            (collapsed ? 'expanded' : 'collapsed');
        label
            .addClass(addClassName)
            .removeClass(removeClassName);
        if (!styledMode) {
            label.css({
                cursor: 'pointer'
            });
        }
        // Add events to both label text and icon
        [label, tick.treeGrid.labelIcon].forEach((object) => {
            if (object && !object.attachedTreeGridEvents) {
                // On hover
                addEvent(object.element, 'mouseover', function () {
                    onTickHover(label);
                });
                // On hover out
                addEvent(object.element, 'mouseout', function () {
                    onTickHoverExit(label, labelOptions);
                });
                addEvent(object.element, 'click', function () {
                    tick.treeGrid.toggleCollapse();
                });
                object.attachedTreeGridEvents = true;
            }
        });
    }
}

/* *
 *
 *  Classes
 *
 * */
/**
 * @private
 * @class
 */
class TreeGridTickAdditions {
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     * @private
     */
    static compose(TickClass) {
        if (U.pushUnique(composedMembers, TickClass)) {
            addEvent(TickClass, 'init', onTickInit);
            wrap(TickClass.prototype, 'getLabelPosition', wrapGetLabelPosition);
            wrap(TickClass.prototype, 'renderLabel', wrapRenderLabel);
            // backwards compatibility
            TickClass.prototype.collapse = function (redraw) {
                this.treeGrid.collapse(redraw);
            };
            TickClass.prototype.expand = function (redraw) {
                this.treeGrid.expand(redraw);
            };
            TickClass.prototype.toggleCollapse = function (redraw) {
                this.treeGrid.toggleCollapse(redraw);
            };
        }
    }

    /* *
     *
     *  Constructors
     *
     * */
    /**
     * @private
     */
    constructor(tick) {
        this.tick = tick;
    }

    /* *
     *
     *  Functions
     *
     * */
    /**
     * Collapse the grid cell. Used when axis is of type treegrid.
     *
     * @see gantt/treegrid-axis/collapsed-dynamically/demo.js
     *
     * @private
     * @function Highcharts.Tick#collapse
     *
     * @param {boolean} [redraw=true]
     * Whether to redraw the chart or wait for an explicit call to
     * {@link Highcharts.Chart#redraw}
     */
    collapse(redraw) {
        const tick = this.tick, axis = tick.axis, brokenAxis = axis.brokenAxis;
        if (brokenAxis &&
            axis.treeGrid.mapOfPosToGridNode) {
            const pos = tick.pos, node = axis.treeGrid.mapOfPosToGridNode[pos], breaks = axis.treeGrid.collapse(node);
            brokenAxis.setBreaks(breaks, pick(redraw, true));
        }
    }

    /**
     * Destroy remaining labelIcon if exist.
     *
     * @private
     * @function Highcharts.Tick#destroy
     */
    destroy() {
        if (this.labelIcon) {
            this.labelIcon.destroy();
        }
    }

    /**
     * Expand the grid cell. Used when axis is of type treegrid.
     *
     * @see gantt/treegrid-axis/collapsed-dynamically/demo.js
     *
     * @private
     * @function Highcharts.Tick#expand
     *
     * @param {boolean} [redraw=true]
     * Whether to redraw the chart or wait for an explicit call to
     * {@link Highcharts.Chart#redraw}
     */
    expand(redraw) {
        const tick = this.tick, axis = tick.axis, brokenAxis = axis.brokenAxis;
        if (brokenAxis &&
            axis.treeGrid.mapOfPosToGridNode) {
            const pos = tick.pos, node = axis.treeGrid.mapOfPosToGridNode[pos], breaks = axis.treeGrid.expand(node);
            brokenAxis.setBreaks(breaks, pick(redraw, true));
        }
    }

    /**
     * Toggle the collapse/expand state of the grid cell. Used when axis is
     * of type treegrid.
     *
     * @see gantt/treegrid-axis/collapsed-dynamically/demo.js
     *
     * @private
     * @function Highcharts.Tick#toggleCollapse
     *
     * @param {boolean} [redraw=true]
     * Whether to redraw the chart or wait for an explicit call to
     * {@link Highcharts.Chart#redraw}
     */
    toggleCollapse(redraw) {
        const tick = this.tick, axis = tick.axis, brokenAxis = axis.brokenAxis;
        if (brokenAxis &&
            axis.treeGrid.mapOfPosToGridNode) {
            const pos = tick.pos, node = axis.treeGrid.mapOfPosToGridNode[pos],
                breaks = axis.treeGrid.toggleCollapse(node);
            brokenAxis.setBreaks(breaks, pick(redraw, true));
        }
    }
}

/* *
 *
 *  Default Export
 *
 * */
export default TreeGridTickAdditions;
