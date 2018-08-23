/**
 * Determines which JSON map will be loaded.
 * @type {String}
 */
var MAP_DATA = MAP_DATA_SMALL;

/**
 * Loads the data to instantiate the map.
 * @method loadMap
 */
function loadMap() {
    // get the map data
    var mapData = JSON.parse(MAP_DATA);

    // set global variables graphNodes and graphEdges
    graphNodes = mapData.graphNodes;
    graphEdges = mapData.graphEdges;

    // create datasets for display nodes and display edges (global variables)
    displayNodes = getDataSetForItems(mapData.displayNodes);
    displayEdges = getDataSetForItems(mapData.displayEdges);
}

/**
 * Helper function that translates an array of items into a vis.js DataSet of
 *   items.
 * @method getDataSetForItems
 * @param  {Array}           items the array of items you'd like to add to the
 *   DataSet
 * @return {DataSet}               a DataSet containing all the things in items
 */
function getDataSetForItems(items) {
    var ds = new vis.DataSet();
    for (let i = 0; i < items.length; i++) {
        ds.add(items[i]);
    }

    return ds;
}