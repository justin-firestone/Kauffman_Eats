/**
 * An array to hold the edges that are currently highlighted (stored for time
 *   efficiency).
 * @type {array}
 */
var highlightedEdges = [];


/**
 * The map distance to travel for each tick as deliverator follows path in
 *   animation.
 * @type {number}
 */
var DISTANCE_PER_TICK = 3;


/**
 * Decorates a specific path in the color provided.
 * @method highlightPath
 * @param  {array}      path  An ordered array of nodes that represents a path
 * @param  {string}     color The color to use in the decoration
 */
function highlightPath(path, color) {
    // for each node in the path
    for (let i = 1; i < path.length; i++) {
        const start = path[i - 1],
			end = path[i];

        // find the edge(s) associated with those nodes
        const edgesBetween = getEdgesBetweenNodes(start.id, end.id);

        // add shadow to those edges
        for (let e = 0; e < edgesBetween.length; e++) {
            highlightedEdges.push(edgesBetween[e].id);
            displayEdges.update({
                id: edgesBetween[e].id,
                shadow: {
                    enabled: true,
                    color: color,
                }
            });
        }
    }
}


/**
 * Highlights all paths that are being traveled by deliverators.
 * @method highlightAllPaths
 */
function highlightAllPaths() {
    // remove highlight from all edges
    for (let i = 0; i < highlightedEdges.length; i++) {
        displayEdges.update({
            id: highlightedEdges[i],
            shadow: {
                enabled: false,
                color: '#000000',
            }
        });
    }

    // reset the global variable that contains highlighted edges
    highlightedEdges = [];

    // for each deliverator
    for (let i = 0; i < deliverators.length; i++) {
        // highlight that deliverator's path
        highlightPath(deliverators[i].path, deliverators[i].color.background);
    }
}


/**
 * Gets a list of points that represent all vertices on that line (including
 *   waypoint edges not included in original path)
 * @method getOrderedPointsFromPath
 * @param  {array}                  path An array of node objects that represent
 *   a path
 * @return {array}                       An array of point objects (including x
 *   and y coords) that represent the path with waypoints included
 */
function getOrderedPointsFromPath(path) {
    // want to return a list of points.
    // assume a line segment exists between each pair of points

    const orderedLineSegments = [];

    // for each node in the path
    for (let i = 1; i < path.length; i++) {
        const start = path[i - 1],
            end = path[i];

        // find the edge(s) associated with those nodes node
        let edgesBetween = getEdgesBetweenNodes(start.id, end.id);

        if (edgesBetween[0].from != start.id) {
            edgesBetween = invertEdgesBetween(edgesBetween);
        }

        for (let e = 0; e < edgesBetween.length; e++) {
            const fromNode = displayNodes.get(edgesBetween[e].from);
            orderedLineSegments.push({
                x: fromNode.x,
                y: fromNode.y
            });
        }
    }

    // push the first node
    orderedLineSegments.push({
        x: path[path.length - 1].x,
        y: path[path.length - 1].y
    })

    return orderedLineSegments;
}


/**
 * Since all edges in our graph are considered bi-directional, sometimes the
 *   desired start point is stored as the endpoint, and vice versa. This
 *   function accepts an ordered list of edges and returns a new list of edges
 *   in the opposite order.
 * @method invertEdgesBetween
 * @param  {array}            edgesBetween A list of edges between two points
 * @return {array}                         An inverted list of edges between two
 *   points
 */
function invertEdgesBetween(edgesBetween) {
    let inverted = [];

    // invert the edges
    for (let i = 0; i < edgesBetween.length; i++) {
        const edgeCopy = {
            from: edgesBetween[i].to,
            to: edgesBetween[i].from,
        }
        inverted.push(edgeCopy);
    }

    // reverse the array of edges
    inverted = inverted.reverse();

    return inverted;
}


/**
 * Interpolates more points along a given path, with each new point
 *   DISTANCE_PER_TICK away from the previous point. Last point is always
 *   included, regardless of preceding step size.
 * @method getStepsAlongPath
 * @param  {array}           path An ordered list of points (including
 *   waypoints) that represent a path through the graph
 * @return {array}                An ordered list of interpolated points objects
 *   (including x and y coords)
 */
function getStepsAlongPath(path) {
    const lineSegmentPoints = getOrderedPointsFromPath(path),
        steps = [];

    // add the first point as a step
    steps.push(lineSegmentPoints[0]);

    // variable that contains the amount remaining when a partial step was executed.
    let stepDistanceRemaining = DISTANCE_PER_TICK;

    // start looping through all the line segments
    for (let i = 0; i < lineSegmentPoints.length - 1; i++) {
        // how long is this line segment?
        let segmentDistanceRemaining = getDistanceBetweenPoints(lineSegmentPoints[i], lineSegmentPoints[i + 1]);
        let previousStep = lineSegmentPoints[i];

        // while there's still distance on the segment to travel,
        while (segmentDistanceRemaining - stepDistanceRemaining >= 0) {
            // travel that distance
            const step = travelDistanceAlongLineSegment(previousStep, lineSegmentPoints[i + 1], stepDistanceRemaining);
            // add the point to steps
            steps.push(step);
            // reset previousStep to be this step
            previousStep = step;
            // reset the segmentDistanceRemaining
            segmentDistanceRemaining = segmentDistanceRemaining - stepDistanceRemaining;
            // reset the stepDistanceRemaining to a full step
            stepDistanceRemaining = DISTANCE_PER_TICK;
        }

        // update the stepDistanceRemaining to be whatever's left of segmentDistanceRemaining
        stepDistanceRemaining = segmentDistanceRemaining;
    }

    // regardless of distance remaining (it will likely not be a full step),
    // add the path's endpoint as a step.
    steps.push(lineSegmentPoints[lineSegmentPoints.length - 1]);

    return steps;
}


/**
 * Calculates and returns a point that falls a specific distance along a line.
 *   It is assumed that the distanceToTravel is less than or equal to the
 *   distance between the two provided points.
 * @method travelDistanceAlongLineSegment
 * @param  {Object}                       point1           An object with x and
 *   y coords. This is the point from which the distance will be calculated.
 * @param  {Object}                       point2           An object with x and
 *   y coords. This is the endpoint of the line.
 * @param  {Number}                       distanceToTravel The distance along
 *   the line that should be traveled
 * @return {Object}                                        An object with x and
 *   y coords, representing the point that is a specific distance along the
 *   line.
 */
function travelDistanceAlongLineSegment(point1, point2, distanceToTravel) {
    // get distance between two points
    const totalDistance = getDistanceBetweenPoints(point1, point2);

    // get ratio of the distance we want to travel to the point length
    const distanceRatio = distanceToTravel / totalDistance;

    //(xt,yt)=(((1−t)x0+t*x1),((1−t)y0+t*y1))
    const step = {
        x: ((1 - distanceRatio) * point1.x) + (distanceRatio * point2.x),
        y: ((1 - distanceRatio) * point1.y) + (distanceRatio * point2.y),
    };
    return step;
}


function createDeliveratorInfoPanels() {
    // for each deliverator
    for (let i = 0; i < deliverators.length; i++) {
        // make a new panel
        const newPanel = $('<div class="deliverator_master_panel" id="deliverator_' + i + '_panel"></div>');

        // add a title
        const title = $('<div class="deliverator_title">Deliverator ' + i + '</div>');
        title.css('color', deliverators[i].color.background);
        newPanel.append(title);

        // add a div to hold the data about the panel
        const infoDiv = $('<div class="deliverator_info"></div>');
        newPanel.append(infoDiv);

        // add the start
        const startNodeLabel = graphNodes[deliverators[i].start].label;
        const start = $('<span class="start">' + startNodeLabel + '</span>');
        infoDiv.append(start);
        infoDiv.append("&rarr;");

        // add the restaurant
        const restaurantNodeLabel = graphNodes[deliverators[i].restaurant].label;
        const restaurant = $('<span class="restaurant">' + restaurantNodeLabel + '</span>');
        infoDiv.append(restaurant);
        infoDiv.append("&rarr;");

        // add the start
        const endNodeLabel = graphNodes[deliverators[i].end].label;
        const end = $('<span class="end">' + endNodeLabel + '</span>');
        infoDiv.append(end);

        $('#deliverator_panels').append(newPanel);
    }
}


/**
 * Updates the deliverator info panels
 * @method updateDeliveratorInfoPanels
 * @return {[type]}                    [description]
 */
function updateDeliveratorInfoPanels() {
    for (let i = 0; i < deliverators.length; i++) {
        const startNodeLabel = graphNodes[deliverators[i].start].label;
        $('#deliverator_' + i + '_panel .start').html(startNodeLabel);

        const restaurantNodeLabel = graphNodes[deliverators[i].restaurant].label;
        $('#deliverator_' + i + '_panel .restaurant').html(restaurantNodeLabel);

        const endNodeLabel = graphNodes[deliverators[i].end].label;
        $('#deliverator_' + i + '_panel .end').html(endNodeLabel);
    }
}