var graphEdges, graphNodes, displayEdges;
QUnit.module( "graph.js tests", {
  beforeEach: function() {
    graphEdges = {};
	graphNodes = {};
	displayEdges = [];
  }
});
	
QUnit.test("Test getEdgeId nodeID1 < nodeID2", function( assert ) {
  // arrange
  const nodeID1 = 1;
  const nodeID2 = 2;
  
  // act
  const result = getEdgeID(nodeID1, nodeID2);
  
  // assert
  assert.deepEqual(result, "1_2");
});

QUnit.test("Test getEdgeId nodeID2 < nodeID1", function( assert ) {
  // arrange
  const nodeID1 = 2;
  const nodeID2 = 1;
  
  // act
  const result = getEdgeID(nodeID1, nodeID2);
  
  // assert
  assert.deepEqual(result, "1_2");
});

QUnit.test("Test getEdgesBetweenNodes when no edge exists", function( assert ) {
	// arrange
	graphNodes = {  
		"1": {
			"id": 1, 
			"label": "N1", 
			"x": 0, 
			"y": 0, 
			"group": "primary" 
		},
		"2": {
			"id": 2, 
			"label": "N2", 
			"x": 1, 
			"y": 0, 
			"group": "primary" 
		} 
	};
	
	graphEdges = { };
	
	// act
	const result = getEdgesBetweenNodes(1, 2);
	
	// assert
	assert.deepEqual(result, []);
});

QUnit.test("Test getEdgesBetweenNodes when one edge exists", function( assert ) {
	// arrange
	graphNodes = {  
		"1": {
			"id": 1, 
			"label": "N1", 
			"x": 0, 
			"y": 0, 
			"group": "primary" 
		},
		"2": {
			"id": 2, 
			"label": "N2", 
			"x": 1, 
			"y": 0, 
			"group": "primary" 
		} 
	};
	
	graphEdges = { 
		"1_2": { 
			"id": "1_2", 
			"from": 1, 
			"to": 2, 
			"waypointEdges": ["1_2"], 
			"graphEdge": "1_2"
		} 
	};
			
	const displayEdgeData = [ { "id": "1_2", "from": 1, "to": 2, "length": 1, "waypointEdges": ["1_2"], "graphEdge": "1_2" } ];
	displayEdges = getDataSetForItems(displayEdgeData);
	
	// act
	const result = getEdgesBetweenNodes(1, 2);
	
	// assert
	assert.deepEqual(result, [{ "id": "1_2", "from": 1, "to": 2, "length": 1, "waypointEdges": ["1_2"], "graphEdge": "1_2" }]);
});

QUnit.test("Test getEdgesBetweenNodes with multiple waypoints", function( assert ) {
	// arrange
	graphNodes = {  
		"1": {
			"id": 1, 
			"label": "N1", 
			"x": 0, 
			"y": 0, 
			"group": "primary" 
		},
		"2": {
			"id": 2, 
			"label": "N2", 
			"x": 3, 
			"y": 0, 
			"group": "primary" 
		}
	};
	
	graphEdges = { 
		"1_2": { 
			"id": "1_2", 
			"from": 1, 
			"to": 2, 
			"waypointEdges": [
				"1_2_waypoint_1", 
				"1_2_waypoint_2", 
				"1_2_waypoint_3"
			], 
		"graphEdge": "1_2"
		} 
	};
			
	const displayEdgeData = [ 
		{ 
			"id": "1_2_waypoint_1", 
			"from": 1, 
			"to": "waypoint_0", 
			"graphEdge": "1_2" 
		},
		{ 
			"id": "1_2_waypoint_2", 
			"from": "waypoint_0", 
			"to": "waypoint_1", 
			"graphEdge": "1_2" 
		},
		{ 
			"id": "1_2_waypoint_3", 
			"from": "waypoint_1", 
			"to": "waypoint_2", 
			"graphEdge": "1_2" 
		} 
	];
	
	displayEdges = getDataSetForItems(displayEdgeData);
	
	// act
	const result = getEdgesBetweenNodes(1, 2);
	
	// assert
	assert.deepEqual(result, displayEdgeData);
});

QUnit.test("Test getDistanceBetweenPoints diagonal line", function( assert ) {
	// arrange
	const point1 = { 
		"x": 0, 
		"y": 0 
	};	
	const point2 = { 
		"x": 3, 
		"y": 4 
	};
  
	// act
	const result = getDistanceBetweenPoints(point1, point2);
  
	// assert
	assert.deepEqual(result, 5);
});

QUnit.test("Test getDistanceBetweenPoints straight line", function( assert ) {
	// arrange
	const point1 = { 
		"x": 1, 
		"y": 0 
	};
	const point2 = { 
		"x": 1, 
		"y": 3 
	};
  
	// act
	const result = getDistanceBetweenPoints(point1, point2);
  
	// assert
	assert.deepEqual(result, 3);
});
