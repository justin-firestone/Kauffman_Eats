QUnit.module("initTests", {
    beforeEach: function(){
        setRandomSeed('Raikes');
        loadMap();
    }
});

QUnit.test("initNetwork: Network Creation", function( assert ) {
    //arrange
    const expectedContainer = document.getElementById('mynetwork');
    const expectedNodeIds = Object.keys(displayNodes._data);
    const expectedEdgeIds = Object.keys(displayEdges._data);

    //act
    initNetwork();

    //assert
    const networkNodeIds = new Set( Object.keys( network.body.nodes ) );
    const networkEdgeIds = new Set( Object.keys( network.body.edges ) );

    assert.ok( network, "Passed!" );
    assert.deepEqual( network.body.container,  expectedContainer);
    assert.ok( expectedNodeIds.every(n => networkNodeIds.has(n)) );
    assert.ok( expectedEdgeIds.every(e => networkEdgeIds.has(e)) );
});

QUnit.test("addDeliverators: Add 10 Deliverators", function(assert){
    //arrange
    const numDeliverators = 10;
    const oldDisplayNodesSize = displayNodes.length;

    //act
    addDeliverators(numDeliverators);

    //assert
    assert.deepEqual(deliverators.length, numDeliverators);
    assert.deepEqual(displayNodes.length, oldDisplayNodesSize + numDeliverators);
});

QUnit.test("addDeliverators: Add negative Deliverators", function(assert){
    //arrange
    const numDeliverators = -10;
    const expectedNum = 0;

    //act
    addDeliverators(numDeliverators);

    //assert
    assert.deepEqual(deliverators.length, expectedNum);
});

QUnit.test("getNewStartLocation: Deliverator with already-set end location", function(assert){
    //arrange
    const expectedStartId = 844923267;
    const node = {
        id: 'test_deliverator',
        label: 'T_D',
        color: {
            background: getRandomColor(),
        },
        group: 'deliverator',
        start: false,
        restaurant: false,
        end: expectedStartId
    };

    //act
    const newStart = getNewStartLocation(node);

    //assert
    assert.deepEqual(newStart.id, expectedStartId);
});

QUnit.test("getNewStartLocation: Deliverator with no end location", function(assert){
    //arrange
    const node = {
        id: 'test_deliverator',
        label: 'T_D',
        color: {
            background: getRandomColor(),
        },
        group: 'deliverator',
        start: false,
        restaurant: false,
        end: false
    };

    //act
    const newStart = getNewStartLocation(node);

    //assert
    assert.ok(newStart.id);
});

QUnit.test("getNewEndLocation: Deliverator with already-set start location", function(assert){
    //arrange
    const expectedEndId = 844923267;
    const node = {
        id: 'test_deliverator',
        label: 'T_D',
        color: {
            background: getRandomColor(),
        },
        group: 'deliverator',
        start: expectedEndId,
        restaurant: false,
        end: false
    };

    //act
    const newStart = getNewEndLocation(node);

    //assert
    assert.ok(newStart.id !== expectedEndId);
});

QUnit.test("getNewEndLocation: Deliverator with no start location", function(assert){
    //arrange
    const node = {
        id: 'test_deliverator',
        label: 'T_D',
        color: {
            background: getRandomColor(),
        },
        group: 'deliverator',
        start: false,
        restaurant: false,
        end: false
    };

    //act
    const newStart = getNewEndLocation(node);

    //assert
    assert.ok(newStart.id !== false);
});

QUnit.test("resetDeliverator: reset deliverator with existing start and end locations", function(assert){
    //arrange
    const startNodeId = 4719907357, endNodeId = 844923267;
    const startX = 476.30366971418425, startY = -348.97568806968593;
    const deliverator = {
        id: 'test_deliverator',
        label: 'T_D',
        color: {
            background: getRandomColor(),
        },
        group: 'deliverator',
        start: startNodeId,
        restaurant: false,
        end: endNodeId
    };

    //act
    resetDeliverator(deliverator);

    //assert
    assert.deepEqual(deliverator.start, endNodeId);
    assert.ok(deliverator.restaurant);
    assert.deepEqual(deliverator.x, startX);
    assert.deepEqual(deliverator.y, startY);
    assert.ok(deliverator.end !== deliverator.start);
    assert.deepEqual(deliverator.path.length, 0);
    assert.deepEqual(deliverator.steps.length, 0);
});

QUnit.test("resetDeliverator: reset deliverator with a start but no end locations", function(assert){
    //arrange
    const startNodeId = 4719907357, endNodeId = 4719495257;
    const startX = 521.8036697129946, startY = -933.4256880713099;
    const restaurantId = 2568624543;
    const deliverator = {
        id: 'test_deliverator',
        label: 'T_D',
        color: {
            background: getRandomColor(),
        },
        group: 'deliverator',
        start: false,
        restaurant: false,
        end: 4719907357
    };

    //act
    resetDeliverator(deliverator);

    //assert
    assert.deepEqual(deliverator.start, startNodeId);
    assert.deepEqual(deliverator.restaurant, restaurantId);
    assert.deepEqual(deliverator.end, endNodeId);
    assert.deepEqual(deliverator.x, startX);
    assert.deepEqual(deliverator.y, startY);
    assert.ok(deliverator.end !== deliverator.start);
    assert.deepEqual(deliverator.path.length, 0);
    assert.deepEqual(deliverator.steps.length, 0);
});

QUnit.test("resetDeliverator: reset deliverator with no start and end locations", function(assert){
    //arrange
    const startNodeId = 2568624551, endNodeId = 2585936649;
    const startX = 235.50366971392123, startY = 324.12431193051816;
    const restaurantId = 2568599384;
    const deliverator = {
        id: 'test_deliverator',
        label: 'T_D',
        color: {
            background: getRandomColor(),
        },
        group: 'deliverator',
        start: false,
        restaurant: false,
        end: false
    };

    //act
    resetDeliverator(deliverator);

    //assert
    assert.deepEqual(deliverator.start, startNodeId);
    assert.deepEqual(deliverator.restaurant, restaurantId);
    assert.deepEqual(deliverator.end, endNodeId);
    assert.deepEqual(deliverator.x, startX);
    assert.deepEqual(deliverator.y, startY);
    assert.ok(deliverator.end !== deliverator.start);
    assert.deepEqual(deliverator.path.length, 0);
    assert.deepEqual(deliverator.steps.length, 0);
});


QUnit.test("getRandomInt: max is greater than zero", function(assert){
    //arrange
    const max = 5;
    const expectedRandomInts = [1,3,4];

    //act
    let randomInts = [];
    for(let i = 0; i < expectedRandomInts.length; i++){
        randomInts.push(getRandomInt(max));
    }

    //assert
    for(let i = 0; i < expectedRandomInts.length; i++){
        assert.deepEqual(randomInts[i], expectedRandomInts[i]);
    }
});

QUnit.test("getRandomInt: max is zero", function(assert){
    //arrange
    const max = 0;
    const expectedRandomInt = 0;

    //act
    const randomInt = getRandomInt(max);

    //assert
    assert.deepEqual(randomInt, expectedRandomInt);
});

QUnit.test("getRandomColor: first color with 'Raikes' seed", function(assert){
    //arrange
    const expectedColor = 'hsla(115.2894018880268, 100%, 50%, 1)';

    //act
    const randomColor = getRandomColor();

    //assert
    assert.deepEqual(randomColor, expectedColor);
});

QUnit.test("getRandomGraphNode: first graph node with 'Raikes' seed", function(assert){
    //arrange
    const expectedGraphNodeId = 2568600191;

    //act
    const randomGraphNode = getRandomGraphNode();

    //assert
    assert.deepEqual(randomGraphNode.id, expectedGraphNodeId);
});

QUnit.test("getRandomRestaurantNode: first restaurant node with 'Raikes' seed", function(assert){
    //arrange
    const expectedRestaurantNodeId = 2568600187;

    //act
    const randomRestaurantNode = getRandomRestaurantNode();

    //assert
    assert.deepEqual(randomRestaurantNode.id, expectedRestaurantNodeId);
});

// define QUnit module here
QUnit.module("animationTimer", {
    beforeEach: function(){
        setRandomSeed('Raikes');
        graphNodes = {  
            "1": {  
                "id":1,
                "label":"J1",
                "x": 0,
                "y": 0,
                "group":"primary"
            },
            "2": {  
                "id":2,
                "label":"J2",
                "x": 2,
                "y": 0,
                "group":"primary"
            },
            "3": {  
                "id": 3,
                "label": "J3",
                "x": 4,
                "y": 0,
                "group": "primary"
            },
            "4": {  
                "id": 4,
                "label": "J4",
                "x": 4,
                "y": 2,
                "group": "primary"
            },
            "5": {  
                "id": 5,
                "label": "J5",
                "x": 6,
                "y": 2,
                "group": "primary"
            },
            "10": {  
                "id": 10,
                "label": "J10",
                "x": 10,
                "y": 1,
                "group": "primary"
            },
            "11": {  
                "id": 11,
                "label": "J11",
                "x": 20,
                "y": 1,
                "group": "primary"
            }
        };
        graphEdges = { 
            "1_2": {  
            "id": "1_2",
            "from": 1,
            "to": 2,
            "length": 2,
            "waypointEdges":[  
                "1_2"
            ],
            "graphEdge":"1_2"
            },
            "2_3": {  
                "id": "2_3",
                "from": 2,
                "to": 3,
                "length": 2,
                "waypointEdges":[  
                "2_3"
                ],
                "graphEdge":"2_3"
            },
            "2_4": {  
                "id": "2_4",
                "from": 2,
                "to": 4,
                "length": 2,
                "waypointEdges":[  
                "2_4"
                ],
                "graphEdge":"2_4"
            },
            "4_5": {  
                "id": "4_5",
                "from": 4,
                "to": 5,
                "length": 2,
                "waypointEdges":[  
                "4_5"
                ],
                "graphEdge":"4_5"
            },
            "10_11": {  
                "id": "10_11",
                "from": 10,
                "to": 11,
                "length": 2,
                "waypointEdges":[  
                "10_11"
                ],
                "graphEdge":"10_11"
            }
        };
        displayNodes = getDataSetForItems([
            {  
                "id": 1,
                "label": "J1",
                "x": 0,
                "y": 0,
                "group": "primary"
            },
            {  
                "id": 2,
                "label": "J2",
                "x": 2,
                "y": 0,
                "group": "primary"
            },
            {  
                "id": 3,
                "label": "J3",
                "x": 4,
                "y": 0,
                "group": "primary"
            },
            {  
                "id": 4,
                "label": "J4",
                "x": 4,
                "y": 2,
                "group": "primary"
            },
            {  
                "id": 5,
                "label": "J5",
                "x": 6,
                "y": 2,
                "group": "primary"
            },
            {  
                "id": 10,
                "label": "J10",
                "x": 10,
                "y": 1,
                "group": "primary"
            },
            {  
                "id": 11,
                "label": "J11",
                "x": 20,
                "y": 1,
                "group": "primary"
            },
            {  
                "id": "waypoint_1",
                "label": "J12",
                "x": 2,
                "y": 0,
                "group": "waypoint"
            },
            {  
                "id": "waypoint_2",
                "label": "J13",
                "x": 3,
                "y": 0,
                "group": "waypoint"
            }
        ]);
        displayEdges = getDataSetForItems([
            {  
                "id": "1_2",
                "from": 1,
                "to": 2,
                "length": 1,
                "waypointEdges":[  
                "1_2"
                ],
                "graphEdge":"1_2"
            },
            {  
                "id": "2_3",
                "from": 2,
                "to": 3,
                "length": 1,
                "waypointEdges":[  
                "2_3"
                ],
                "graphEdge":"2_3"
            },
            {  
                "id": "2_4",
                "from": 2,
                "to": 4,
                "length": 1,
                "waypointEdges":[  
                "2_4"
                ],
                "graphEdge":"2_4"
            },
            {  
                "id": "4_5",
                "from": 4,
                "to": 5,
                "length": 1,
                "waypointEdges":[  
                "4_5"
                ],
                "graphEdge":"4_5"
            },
            {  
                "id": "10_11",
                "from": 10,
                "to": 11,
                "length": 1,
                "waypointEdges":[  
                "10_11"
                ],
                "graphEdge":"10_11"
            },
            {
                "id": "2_3_waypoint_1",
                "from": 2,
                "to": "waypoint_1",
                "graphEdge": "2_3"
            },
            {
                "id": "2_3_waypoint_2",
                "from": "waypoint_1",
                "to": "waypoint_2",
                "graphEdge": "2_3"
            },
            {
                "id": "2_3_waypoint_3",
                "from": "waypoint_2",
                "to": 3,
                "graphEdge": "2_3"
            }
        ]);
        RESTAURANTS = "[3]";
        initNetwork();
        DISTANCE_PER_TICK = 3;
    }
});

QUnit.test("animationTimer: one deliverator following the path 1-2-3-2-4-5", function(assert){
    //arrange
    addDeliverators(1);
    DISTANCE_PER_TICK = 1;
    const deliverator = deliverators[0];
    const expectedPath = [graphNodes[1], graphNodes[2], graphNodes[3], graphNodes[2], graphNodes[4], graphNodes[5]];
    const expectedSteps = [
        {
            "x": 1,
            "y": 0
          },
          {
            "x": 2,
            "y": 0
          },
          {
            "x": 2,
            "y": 0
          },
          {
            "x": 3,
            "y": 0
          },
          {
            "x": 4,
            "y": 0
          },
          {
            "x": 4,
            "y": 0
          },
          {
            "x": 3,
            "y": 0
          },
          {
            "x": 2,
            "y": 0
          },
          {
            "x": 2,
            "y": 0
          },
          {
            "x": 2.7071067811865475,
            "y": 0.7071067811865475
          },
          {
            "x": 3.414213562373095,
            "y": 1.414213562373095
          },
          {
            "x": 4.82842712474619,
            "y": 2
          },
          {
            "x": 5.82842712474619,
            "y": 2
          },
          {
            "x": 6,
            "y": 2
          }
    ];

    //act/assert
    //run animationTimer once to generate the path/steps for the new deliverator
    assert.deepEqual(deliverator.path.length, 0);
    animationTimer();
    assert.deepEqual(deliverator.path, expectedPath);

    //verify that the deliverator is stepping to the expected coordinates
    for(let i = 0; i < expectedSteps.length; i++){
        assert.deepEqual(deliverator.steps, expectedSteps.slice(i));
        animationTimer();
    }
});

QUnit.test("animationTimer: one deliverator following the path 1-2-4-5", function(assert){
    //arrange
    addDeliverators(1);
    DISTANCE_PER_TICK = 1;
    const deliverator = deliverators[0];
    deliverator.start = 5;
    deliverator.end = 1;
    RESTAURANTS = "[2]";
    const expectedPath = [graphNodes[1], graphNodes[2], graphNodes[4], graphNodes[5]];
    const expectedSteps = [
        {x: 1, y: 0},
        {x: 2, y: 0},
        {x: 2, y: 0},
        {x: 2.7071067811865475, y: 0.7071067811865475},
        {x: 3.414213562373095, y: 1.414213562373095},
        {x: 4.82842712474619, y: 2},
        {x: 5.82842712474619, y: 2},
        {x: 6, y: 2}
    ];

    //act/assert
    //run animationTimer once to generate the path/steps for the new deliverator
    assert.deepEqual(deliverator.path.length, 0);
    animationTimer();
    assert.deepEqual(deliverator.path, expectedPath);

    //verify that the deliverator is stepping to the expected coordinates
    for(let i = 0; i < expectedSteps.length; i++){
        assert.deepEqual(deliverator.steps, expectedSteps.slice(i));
        animationTimer();
    }
});

QUnit.test("animationTimer: deliverators get new paths if their step count is zero", function(assert){
    //arrange
    addDeliverators(1);
    const deliverator = deliverators[0];

    //act/assert
    assert.deepEqual(deliverator.steps.length, 0);
	
	//run animationTimer once to generate the path for the new deliverator
    animationTimer();
	
    assert.notDeepEqual(deliverator.path.length, 0);
});

QUnit.test("animationTimer: deliverators get new steps if their step count is zero", function(assert){
    //arrange
    addDeliverators(1);
    const deliverator = deliverators[0];

    //act/assert
    assert.deepEqual(deliverator.steps.length, 0);
	
	//run animationTimer once to generate the steps for the new deliverator
    animationTimer();
	
    assert.notDeepEqual(deliverator.steps.length, 0);
});

QUnit.test("animationTimer: deliverators get correct new start location if they didn't have any steps", function(assert){
    //arrange
    addDeliverators(1);
    const deliverator = deliverators[0];
	const expectedStartId = 1;

    //act/assert
    assert.deepEqual(deliverator.steps.length, 0);
	
	//run animationTimer once to generate the start location for the new deliverator
    animationTimer();
	
	assert.deepEqual(deliverator.start, expectedStartId);
});

QUnit.test("animationTimer: deliverators get correct new x if they didn't have any steps", function(assert){
    //arrange
    addDeliverators(1);
    const deliverator = deliverators[0];
	const expectedX = 0;

    //act/assert
    assert.deepEqual(deliverator.steps.length, 0);
	
	//run animationTimer once to generate the new x coordinate for the new deliverator
    animationTimer();
	
	assert.deepEqual(deliverator.x, expectedX);
});

QUnit.test("animationTimer: deliverators get correct new y if they didn't have any steps", function(assert){
    //arrange
    addDeliverators(1);
    const deliverator = deliverators[0];
	const expectedY = 0;

    //act/assert
    assert.deepEqual(deliverator.steps.length, 0);
	
	//run animationTimer once to generate the new y coordinate for the new deliverator
    animationTimer();
	
	assert.deepEqual(deliverator.y, expectedY);
});

QUnit.test("animationTimer: deliverators get correct new restaurant if they didn't have any steps", function(assert){
    //arrange
    addDeliverators(1);
    const deliverator = deliverators[0];
	// create multiple restaurants
	RESTAURANTS = "[3,5,10]";
	const expectedRestaurant = 5;

    //act/assert
    assert.deepEqual(deliverator.steps.length, 0);
	
	//run animationTimer once to generate the new restaurant for the new deliverator
    animationTimer();
	
	assert.deepEqual(deliverator.restaurant, expectedRestaurant);
});

QUnit.test("animationTimer: deliverators get correct new end location if they didn't have any steps", function(assert){
    //arrange
    addDeliverators(1);
    const deliverator = deliverators[0];
	const expectedEndId = 5;

    //act/assert
    assert.deepEqual(deliverator.steps.length, 0);
	
	//run animationTimer once to generate the new end for the new deliverator
    animationTimer();

	assert.deepEqual(deliverator.end, expectedEndId);
});

QUnit.test("animationTimer: when one deliverator is out of steps and is reset, others should remain untouched", function(assert){
    //arrange
    addDeliverators(2);
    const deliverator1 = deliverators[0];
	const deliverator2 = deliverators[1];

	deliverator1.steps = [{x: 0, y: 0}];
	deliverator2.steps = [{x: 0, y: 0}, {x: 1, y: 0}];
	
	//act/assert
	// step once to clear the last step for deliverator1
	animationTimer();
	
	assert.deepEqual(deliverator1.steps.length, 0);
	assert.deepEqual(deliverator2.steps.length, 1);
	
	// step once to reset deliverator1
	animationTimer();
	
	// verify that deliverator1 was reset by checking that it got more steps
	assert.notDeepEqual(deliverator1.steps.length, 0);
	
	// verify that deliverator2 was not reset by checking it did not get more steps
	assert.deepEqual(deliverator2.steps, []);
});


QUnit.test("animationTimer: exactly one step is removed from the deliverator", function(assert){
    //arrange
    addDeliverators(1);
    DISTANCE_PER_TICK = 1;
    const deliverator = deliverators[0];
    const originalStepsLength = 14;

    //act/assert
    animationTimer();
    assert.deepEqual(deliverator.steps.length, originalStepsLength);
    animationTimer();
    assert.deepEqual(deliverator.steps.length, originalStepsLength - 1);
});

QUnit.test("animationTimer: if deliverators get a new path, that path is highlighted", function(assert){
    //arrange
    addDeliverators(1);
    const deliverator = deliverators[0];
    const color = "hsla(217.53495674219417, 100%, 50%, 1)";
    const edges = [displayEdges._data["1_2"], displayEdges._data["2_3"], displayEdges._data["2_4"], displayEdges._data["4_5"]];
    
    //act
    animationTimer();

    //assert
    for(let edge of edges){
        assert.deepEqual(edge.shadow.color, color);
    }
});

QUnit.test("animationTimer: deliverator has moved on the network", function(assert){
    //arrange
    addDeliverators(1);
    const deliveratorId = "deliverator_0";
    const start = {
        x: 0,
        y: 0
    };
    const end = {
        x: 4,
        y: 0
    };
    
    //act/assert
    animationTimer();
    deliveratorPosition = network.getPositions(deliveratorId)[deliveratorId];
    assert.deepEqual(deliveratorPosition, start);

    animationTimer();
    deliveratorPosition = network.getPositions(deliveratorId)[deliveratorId];
    assert.deepEqual(deliveratorPosition, end);
});

