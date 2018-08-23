function findPathThroughRestaurant(sourceID, restaurantID, destinationID) {
    var sourceToRestaurantPath = findPath(sourceID, restaurantID);
    var restaurantToDestinationPath = findPath(restaurantID, destinationID);

    // if the restaurant can't show up twice in the path, so delete it from one of the lists.
    sourceToRestaurantPath.pop();

    var totalPath = sourceToRestaurantPath.concat(restaurantToDestinationPath);

    return totalPath;
}

/**
 * Finds a path through the graph from the source to the destination.
 * @method findPath
 * @param  {string} sourceID      The ID of the source node
 * @param  {string} destinationID The ID of the destination node
 * @return {array}                An ordered array of nodes that constitute the
 *   path. Adjacent nodes in the array can be assumed to have edges between
 *   them.
 */
function findPath(sourceID, destinationID) {
    var sourceNode = false;
    var destinationNode = false;

    // set all nodes to unvisited and find source/destination nodes
    for (let id in graphNodes) {
        graphNodes[id].visited = false;
        if (id == sourceID) {
            sourceNode = graphNodes[id];
        }
        if (id == destinationID) {
            destinationNode = graphNodes[id];
        }
    }

    // get the path & return it
    var path = dfs(sourceNode, destinationNode);
    return path;
}


/**
 * Gets the neighbors for a given node (neighbors with whom the given node
 *   shares an edge).
 * @method getNeighborsForNode
 * @param  {object}            nodeId The ID of the node whose neighbors are
 *   requested
 * @return {array}                   An array of node objects
 */
function getNeighborsForNode(nodeId) {
    // loop through all edges in graphEdges
    var neighbors = [];

    // loop through the edges and find neighbors
    for (let edgeID in graphEdges) {
        if (graphEdges.hasOwnProperty(edgeID)) {
            if (graphEdges[edgeID].from == nodeId) {
                neighbors.push(graphNodes[graphEdges[edgeID].to]);
            }
            if (graphEdges[edgeID].to == nodeId) {
                neighbors.push(graphNodes[graphEdges[edgeID].from]);
            }
        }
    }

    // make sure neighbors aren't duplicated
    var uniqueNeighbors = Array.from(new Set(neighbors));

    return uniqueNeighbors;
}


/**
 * Performs a depth-first search to find a path between the source and the
 *   destination. If no path exists, an empty array will be returned.
 * @method dfs
 * @param  {object} source      The node object that represents the start of the
 *   desired path
 * @param  {object} destination The node object that represents the end of the
 *   desired paths
 * @return {array}             An ordered array of node objects that represents
 *   the found path
 */
function dfs(source, destination) {
    var path = []

    var numRecurses = 0;
    recursiveDFS(source, destination);

    function recursiveDFS(source, destination) {
        numRecurses++;
        if (numRecurses > 1000) {
            return false;
        }

        // set this node to visited
        source.visited = true;

        // push this node onto the path
        path.push(source);

        // if this is the end, return true, we have the path we want.
        if (source.id == destination.id) {
            return true;
        }

        // get neighbors
        var neighbors = getNeighborsForNode(source.id);

        // set termination variable
        var pathFound = false;

        // loop and recurse. terminate loop if path is found
        for (let i = 0; i < neighbors.length && !pathFound; i++) {
            if (neighbors[i].visited == false) {
                pathFound = recursiveDFS(neighbors[i], destination);
            }
        }

        // if no path was found through this node, pop it off of the stack
        if (pathFound == false) {
            path.pop();
            return false;
        }
        // if the path was found, celebrate!
        else {
            return true;
        }
    }

    return path;
}