/**
 * Returns a unique edge id for the two node ids. Returned edge id is the same,
 *   regardless of which node is node1 and which is node2.
 * @method getEdgeID
 * @param  {String}  nodeID1 the nodeID of node1
 * @param  {String}  nodeID2 the nodeID of node2
 * @return {String}          the new id of the edge between the two provided
 *   nodes
 */
function getEdgeID(nodeID1, nodeID2) {
    const first = Math.min(nodeID1, nodeID2);
    const second = Math.max(nodeID1, nodeID2);
    return first + '_' + second;
}


/**
 * Returns a list of the edges between tw nodes. If there is an edge between the
 *   two nodes without any waypoints, then it will return an array with that
 *   single edge ID in it. If the edge between the nodes has waypoints, it will
 *   return an array including all of the waypoint edges. If there does not
 *   exist an edge between these two nodes, an empy array will be returned.
 * @method getEdgesBetweenNodes
 * @param  {String}             nodeID1 The ID of the first node
 * @param  {String}             nodeID2 The ID of the second node
 * @return {Array}                      An array of display edges between two
 *   nodes (including waypoints)
 */
function getEdgesBetweenNodes(nodeID1, nodeID2) {
    const graphEdge = graphEdges[getEdgeID(nodeID1, nodeID2)];
    if (!graphEdge) {
        return [];
    }

    const allEdges = [];
    for (let i = 0; i < graphEdge.waypointEdges.length; i++) {
        allEdges.push(displayEdges.get(graphEdge.waypointEdges[i]))
    }

    return allEdges;
}


/**
 * Calculates the Euclidean distance between two points.
 * @method getDistanceBetweenPoints
 * @param  {Object}                 point1 an object with x and y coordinates
 * @param  {Object}                 point2 an object with x and y coordinates
 * @return {Number}                        The Euclidean distance between point1
 *   and point2
 */
function getDistanceBetweenPoints(point1, point2) {
    const a = point1.x - point2.x;
    const b = point1.y - point2.y;

    const c = Math.sqrt(a * a + b * b);
    return c;
}