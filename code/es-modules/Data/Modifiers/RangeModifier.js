/* *
 *
 *  (c) 2009-2023 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */
'use strict';
import DataModifier from './DataModifier.js';
import U from '../../Core/Utilities.js';

const {merge} = U;

/* *
 *
 *  Class
 *
 * */
/**
 * Filters out table rows with a specific value range.
 *
 * @private
 */
class RangeModifier extends DataModifier {
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructs an instance of the range modifier.
     *
     * @param {RangeModifier.Options} [options]
     * Options to configure the range modifier.
     */
    constructor(options) {
        super();
        this.options = merge(RangeModifier.defaultOptions, options);
    }

    /* *
     *
     *  Functions
     *
     * */
    /**
     * Replaces table rows with filtered rows.
     *
     * @param {DataTable} table
     * Table to modify.
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {DataTable}
     * Table with `modified` property as a reference.
     */
    modifyTable(table, eventDetail) {
        const modifier = this;
        modifier.emit({type: 'modify', detail: eventDetail, table});
        const {ranges, strict} = modifier.options;
        if (ranges.length) {
            const columns = table.getColumns(), rows = [], modified = table.modified;
            for (let i = 0, iEnd = ranges.length, range, rangeColumn; i < iEnd; ++i) {
                range = ranges[i];
                if (strict &&
                    typeof range.minValue !== typeof range.maxValue) {
                    continue;
                }
                rangeColumn = (columns[range.column] || []);
                for (let j = 0, jEnd = rangeColumn.length, cell, row; j < jEnd; ++j) {
                    cell = rangeColumn[j];
                    switch (typeof cell) {
                        default:
                            continue;
                        case 'boolean':
                        case 'number':
                        case 'string':
                            break;
                    }
                    if (strict &&
                        typeof cell !== typeof range.minValue) {
                        continue;
                    }
                    if (cell >= range.minValue &&
                        cell <= range.maxValue) {
                        row = table.getRow(j);
                        if (row) {
                            rows.push(row);
                        }
                    }
                }
            }
            modified.deleteRows();
            modified.setRows(rows);
        }
        modifier.emit({type: 'afterModify', detail: eventDetail, table});
        return table;
    }
}

/* *
 *
 *  Static Properties
 *
 * */
/**
 * Default options for the range modifier.
 */
RangeModifier.defaultOptions = {
    modifier: 'Range',
    strict: false,
    ranges: []
};
DataModifier.registerType('Range', RangeModifier);
/* *
 *
 *  Default Export
 *
 * */
export default RangeModifier;
