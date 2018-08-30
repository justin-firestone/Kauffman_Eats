/**
 * Initializes the vis.js Network that displays the simulation
 * @method initNetwork
 */
function initNetwork() {
    // get the container in the DOM that will display the network
    const container = document.getElementById('network_container');
    // specify the data that will be displayed
    const data = {
        nodes: displayNodes,
        edges: displayEdges
    };
    // specify the options that will control how the data is displayed
    const options = getNetworkOptions();

    // actually create the network (a global variable)
    network = new vis.Network(container, data, options);
}


/**
 * Returns the object defining the options that customize the vis.js Network.
 * @method getNetworkOptions
 * @return {Object}          An object containing the preferences for the vis.js
 *   Network, according to the vis.js Network documentation.
 */
function getNetworkOptions() {
    const options = {
        autoResize: true,
        height: '100%',
        width: '100%',
        nodes: {
            fixed: {
                x: true,
                y: true
            },
            chosen: {
                node: function (values, id, selected, hovering) {
                    console.log(displayNodes.get(id));
                },
            }
        },
        edges: {
            chosen: false,
            color: {
                color: '#555555',
                highlight: '#555555',
                hover: '#555555',
                opacity: 1.0,
            },
            shadow: {
                enabled: false,
                size: 15,
                x: 0,
                y: 0,
            },
            width: 20,
        },
        groups: {
            primary: {
                color: {
                    background: 'black',
                },
                borderWidth: 0,
                shape: "circle",
            },
            restaurant: {
                color: {
                    background: "#aaaaaa",
                },
                font: {
                    color: "hsla(0,0,0,0)",
                },
                shape: 'image',
                image: 'images/spoon_and_fork.png',
                borderWidth: 0,
            },
            waypoint: {
                shape: 'image',
                image: 'images/transparent.png',
                size: 25,
                borderWidth: 0,
            },
            deliverator: {
                color: {
                    border: '#555555',
                },
                size: 75,
                borderWidth: 0,
            },
        },
    };
    return options;
}


/**
 * Sets a random seed, so that the randomness is consistent between loads of the
 *    simulator.
 * @method setRandomSeed
 */
function setRandomSeed() {
    Math.seedrandom('Raikes');
}


/**
 * Adds a certain number of deliverators to the simulation
 * @method addDeliverators
 * @param  {Number}     numDeliverators The number of deliverators you'd like to add
 *   to the simulation.
 */
function addDeliverators(numDeliverators) {
    deliverators = [];

    for (let count = 0; count < numDeliverators; count++) {
        // initialize node
        let node = {
            id: 'deliverator_' + count,
            label: 'D' + count,
            color: {
                background: getRandomColor(),
            },
            group: 'deliverator',
            start: false,
            restaurant: false,
            end: false,
        }

        // ensure it's all set up.
        resetDeliverator(node);

        // add to the official lists
        displayNodes.add(node);
        deliverators.push(node);
    }
}


/**
 * Gets a start location for a deliverator. If the deliverator has an already-set end
 *   location, the new start location will be that end location. Otherwise, it
 *   will be a new random location.
 * @method getNewStartLocation
 * @param  {Object}            node The deliverator object for whom a new start
 *   location should be selected
 * @return {Object}                 The node object for the new start location.
 */
function getNewStartLocation(node) {
    let start;
    if (node.end != false) {
        start = graphNodes[node.end];
    } else {
        start = getRandomGraphNode();
    }
    return start;
}


/**
 * Gets a start location for a deliverator. It will be a new random location that
 *   is not eqivalent to the deliverator's start location.
 * @method getNewStartLocation
 * @param  {Object}            node The deliverator object for whom a new end
 *   location should be selected
 * @return {Object}                 The node object for the new end location
 */
function getNewEndLocation(node) {
    let end = getRandomGraphNode();
    while (node.start == end.id) {
        end = getRandomGraphNode();
    }
    return end;
}


/**
 * Resets a deliverator object with new start/end locations, etc.
 * @method resetDeliverator
 * @param  {Object}      deliveratorNode The deliverator that needs to be reset
 */
function resetDeliverator(deliveratorNode) {
    const start = getNewStartLocation(deliveratorNode);
    deliveratorNode.start = start.id;
    deliveratorNode.x = start.x;
    deliveratorNode.y = start.y;

    const restaurant = getRandomRestaurantNode();
    deliveratorNode.restaurant = restaurant.id;

    const end = getNewEndLocation(deliveratorNode);
    deliveratorNode.end = end.id;

    deliveratorNode.path = [];
    deliveratorNode.steps = [];
}


/**
 * Gets random integer in range of 0 to max (inclusive)
 * @method getRandomInt
 * @param  {Number}     max The maximum int that should be returned (inclusive)
 * @return {Number}         A random integer in range of 0 to max (inclusive)
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


/**
 * Gets a random color. Code based on:
 * https://stackoverflow.com/questions/1484506/random-color-generator
 * @method getRandomColor
 * @return {String}       A string color code in the HSLA color space.
 */
function getRandomColor() {
    return 'hsla(' + (Math.random() * 360) + ', 100%, 50%, 1)';
}


/**
 * Gets a random node from the graph (not a waypoint).
 * @method getRandomGraphNode
 * @return {Object}           A node object from the collection of graph nodes
 */
function getRandomGraphNode() {
    const keys = Object.keys(graphNodes);
    const randomNode = graphNodes[keys[getRandomInt(keys.length - 1)]];
    return randomNode;
}


/**
 * Gets a random restaurant node from the graph.
 * @method getRandomRestaurantNode
 * @return {Object}           A node object from the list of restaurant nodes
 */
function getRandomRestaurantNode() {
    const restaurants = JSON.parse(RESTAURANTS);
    const randomRestaurant = restaurants[getRandomInt(restaurants.length - 1)];
    return graphNodes[randomRestaurant];
}


/**
 * Controls and defines the timer that controls the animation
 * @method startAnimationTimer
 */
function startAnimationTimer() {
    const timer = setInterval(animationTimer, 10);

    // the function to be called on each tick of the timer
    function animationTimer() {
        for (let t = 0; t < deliverators.length; t++) {
            // if the deliverator has completed all of its steps, find a new location
            if (deliverators[t].steps.length == 0) {
                // find new destination for the deliverator
                resetDeliverator(deliverators[t]);

                // find a path for the deliverator
                deliverators[t].path = findPathThroughRestaurant(deliverators[t].start, deliverators[t].restaurant, deliverators[t].end)

                // highlight the path
                highlightAllPaths();

                // find incremental steps for the path
                deliverators[t].steps = getStepsAlongPath(deliverators[t].path);

                updateDeliveratorInfoPanels();
            }
            // pop a step off the stack, and travel that step
            let step = deliverators[t].steps.shift();
            network.moveNode(deliverators[t].id, step.x, step.y);
        }
    }
}