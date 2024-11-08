/* *
 *
 *  (c) 2009-2023 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Torstein Hønsi
 *  - Gøran Slettemark
 *  - Wojciech Chmiel
 *  - Sophie Bremer
 *
 * */
'use strict';
import DataConnector from './DataConnector.js';
import H from '../../Core/Globals.js';
import HTMLTableConverter from '../Converters/HTMLTableConverter.js';
import U from '../../Core/Utilities.js';

const {win} = H;
const {merge} = U;

/* *
 *
 *  Class
 *
 * */
/**
 * Class that handles creating a dataconnector from an HTML table.
 *
 * @private
 */
class HTMLTableConnector extends DataConnector {
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructs an instance of HTMLTableConnector.
     *
     * @param {HTMLTableConnector.UserOptions} [options]
     * Options for the connector and converter.
     */
    constructor(options) {
        const mergedOptions = merge(HTMLTableConnector.defaultOptions, options);
        super(mergedOptions);
        this.converter = new HTMLTableConverter(mergedOptions);
        this.options = mergedOptions;
    }

    /**
     * Initiates creating the dataconnector from the HTML table
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @emits HTMLTableConnector#load
     * @emits HTMLTableConnector#afterLoad
     * @emits HTMLTableConnector#loadError
     */
    load(eventDetail) {
        const connector = this;
        // If already loaded, clear the current rows
        connector.table.deleteColumns();
        connector.emit({
            type: 'load',
            detail: eventDetail,
            table: connector.table,
            tableElement: connector.tableElement
        });
        const {table: tableHTML} = connector.options;
        let tableElement;
        if (typeof tableHTML === 'string') {
            connector.tableID = tableHTML;
            tableElement = win.document.getElementById(tableHTML);
        } else {
            tableElement = tableHTML;
            connector.tableID = tableElement.id;
        }
        connector.tableElement = tableElement || void 0;
        if (!connector.tableElement) {
            const error = 'HTML table not provided, or element with ID not found';
            connector.emit({
                type: 'loadError',
                detail: eventDetail,
                error,
                table: connector.table
            });
            return Promise.reject(new Error(error));
        }
        connector.converter.parse(merge({tableElement: connector.tableElement}, connector.options), eventDetail);
        connector.table.setColumns(connector.converter.getTable().getColumns());
        connector.emit({
            type: 'afterLoad',
            detail: eventDetail,
            table: connector.table,
            tableElement: connector.tableElement
        });
        return Promise.resolve(this);
    }
}

/* *
 *
 *  Static Properties
 *
 * */
HTMLTableConnector.defaultOptions = {
    table: ''
};
DataConnector.registerType('HTMLTable', HTMLTableConnector);
/* *
 *
 *  Default Export
 *
 * */
export default HTMLTableConnector;
