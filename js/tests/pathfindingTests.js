var graphEdges, graphNodes;
QUnit.module( "pathfinding.js tests", {
  beforeEach: function() {
    graphEdges = {};
	graphNodes = {};
  }
});

QUnit.test("Test findPath starts at source", function( assert ) {
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
		},
		"3": {
			"id": 3, 
			"label": "N3", 
			"x": 2, 
			"y": 0, 
			"group": "primary" 
		}
	};
	
	graphEdges = { 
		"1_2": { 
			"id": "1_2", 
			"from": 1, 
			"to": 2, 
			"length": 1, 
			"waypointEdges": ["1_2"], 
			"graphEdge": "1_2"
		},
		"2_3": { 
			"id": "2_3", 
			"from": 2, 
			"to": 3, 
			"length": 1, 
			"waypointEdges": ["2_3"], 
			"graphEdge": "2_3"
		}
	};
					
	// act
	const result = findPath(1, 3);
	
	// assert
	// The path starts at the source if the id of the first step is the id of the source
	assert.deepEqual(result[0].id, 1); 
});

QUnit.test("Test findPath ends at destination", function( assert ) {
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
		},
		"3": {
			"id": 3, 
			"label": "N3", 
			"x": 2, 
			"y": 0, 
			"group": "primary" 
		}
	};
	
	graphEdges = { 
		"1_2": { 
			"id": "1_2", 
			"from": 1, 
			"to": 2, 
			"length": 1, 
			"waypointEdges": ["1_2"], 
			"graphEdge": "1_2"
		},
		"2_3": { 
			"id": "2_3", 
			"from": 2, 
			"to": 3, 
			"length": 1, 
			"waypointEdges": ["2_3"], 
			"graphEdge": "2_3"
		}
	};
					
	// act
	const result = findPath(1, 3);
	
	// assert
	// The path ends at the destination if the id of the last step is the id of the destination
	assert.deepEqual(result[result.length - 1].id, 3); 
});

QUnit.test("Test findPath returns empty array when no path exists, no edges", function( assert ) {
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
		},
		"3": {
			"id": 3, 
			"label": "N3", 
			"x": 2, 
			"y": 0, 
			"group": "primary" 
		}
	};
	
	graphEdges = {};
					
	// act
	const result = findPath(1, 3);
	
	// assert
	assert.deepEqual(result, []); 
});

QUnit.test("Test findPath returns empty array when no path exists", function( assert ) {
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
		},
		"3": {
			"id": 3, 
			"label": "N3", 
			"x": 2, 
			"y": 0, 
			"group": "primary" 
		}
	};
	
	graphEdges = { 
		"1_2": { 
			"id": "1_2", 
			"from": 1, 
			"to": 2, 
			"length": 1, 
			"waypointEdges": ["1_2"], 
			"graphEdge": "1_2"
		} 
	};
	
	// act
	const result = findPath(1, 3);
	
	// assert
	assert.deepEqual(result, []); 
});

QUnit.test("Test findPath returns array with start/end node when finding path from a node to itself", function( assert ) {
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
		},
		"3": {
			"id": 3, 
			"label": "N3", 
			"x": 2, 
			"y": 0, 
			"group": "primary" 
		}
	};
						
	graphEdges = { 
		"1_2": { 
			"id": "1_2", 
			"from": 1, 
			"to": 2, 
			"length": 1, 
			"waypointEdges": ["1_2"], 
			"graphEdge": "1_2"
		},
		"2_3": { 
			"id": "2_3", 
			"from": 2, 
			"to": 3, 
			"length": 1, 
			"waypointEdges": ["2_3"], 
			"graphEdge": "2_3"
		} 
	};
					
	// act
	const result = findPath(1, 1);
	
	// assert
	// Path should only contain one node
	assert.deepEqual(result.length, 1);
	
	// The node in the path should have the id of the source/destination node
	assert.deepEqual(result[0].id, 1);	
});

QUnit.test("Test getNeighborsForNode for node with no neighbors", function( assert ) {
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
		},
		"3": {
			"id": 3, 
			"label": "N3", 
			"x": 2, 
			"y": 0, 
			"group": "primary" 
		}
	};
	
	// No edges means no node can have neighbors
	graphEdges = {};
					
	// act
	const result = getNeighborsForNode(1);
	
	// assert
	assert.deepEqual(result, []); 
});

QUnit.test("Test getNeighborsForNode for node with one neighbor", function( assert ) {
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
		},
		"3": {
			"id": 3, 
			"label": "N3", 
			"x": 2, 
			"y": 0, 
			"group": "primary" 
		}
	};
	
	graphEdges = { 
		"1_2": { 
			"id": "1_2", 
			"from": 1, 
			"to": 2, 
			"length": 1, 
			"waypointEdges": ["1_2"], 
			"graphEdge": "1_2"
		},
		"2_3": { 
			"id": "2_3", 
			"from": 2, 
			"to": 3, 
			"length": 1, 
			"waypointEdges": ["2_3"], 
			"graphEdge": "2_3"
		}
	};
					
	// act
	const result = getNeighborsForNode(1);
	
	// assert
	// Node 1's only neighbor is Node 2
	assert.deepEqual(result.length, 1); 
	assert.deepEqual(result[0].id, 2);
});

QUnit.test("Test getNeighborsForNode for node with multiple neighbors", function( assert ) {
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
		},
		"3": {
			"id": 3, 
			"label": "N3", 
			"x": 2, 
			"y": 0, 
			"group": "primary" 
		}
	};
	
	graphEdges = { 
		"1_2": { 
			"id": "1_2", 
			"from": 1, 
			"to": 2, 
			"length": 1, 
			"waypointEdges": ["1_2"], 
			"graphEdge": "1_2"
		},
		"2_3": { 
			"id": "2_3", 
			"from": 2, 
			"to": 3, 
			"length": 1, 
			"waypointEdges": ["2_3"], 
			"graphEdge": "2_3"
		}
	};
					
	// act
	const result = getNeighborsForNode(2);
	
	// assert
	assert.deepEqual(result.length, 2); 
	
	// Node 2 has two neighbors, Node 1 and Node 3
	assert.deepEqual(result.filter(node => node.id === 1).length, 1);
	assert.deepEqual(result.filter(node => node.id === 3).length, 1);
});

QUnit.test("Test getNeighborsForNode returns distinct neighbors when two edges between the same two nodes", function( assert ) {
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
	
	// Adding two edges between nodes 1 and 2
	graphEdges = { 
		"1_2": { 
			"id": "1_2", 
			"from": 1, 
			"to": 2, 
			"length": 1, 
			"waypointEdges": ["1_2"], 
			"graphEdge": "1_2"
		},
		"2_1": { 
			"id": "2_3", 
			"from": 2, 
			"to": 1, 
			"length": 1, 
			"waypointEdges": ["2_1"], 
			"graphEdge": "2_1"
		}
	};
					
	// act
	const result = getNeighborsForNode(2);
	
	// assert
	// There should be no duplicate neighbors so because  node 2 only has one neighbor, only one neighbor should be returned
	assert.deepEqual(result.length, 1); 
});

QUnit.test("Test findPathThroughRestaurant starts at source", function( assert ) {
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
			"group": "restaurant" 
		},
		"3": {
			"id": 3, 
			"label": "N3", 
			"x": 2, 
			"y": 0, 
			"group": "primary" 
		}
	};
	
	graphEdges = { 
		"1_2": { 
			"id": "1_2", 
			"from": 1, 
			"to": 2, 
			"length": 1, 
			"waypointEdges": ["1_2"], 
			"graphEdge": "1_2"
		},
		"2_3": { 
			"id": "2_3", 
			"from": 2, 
			"to": 3, 
			"length": 1, 
			"waypointEdges": ["2_3"], 
			"graphEdge": "2_3"
		}
	};
					
	// act
	const result = findPathThroughRestaurant(1, 2, 3);
	
	// assert
	// The path starts at the source if the id of the first step is the id of the source
	assert.deepEqual(result[0].id, 1); 
});

QUnit.test("Test findPathThroughRestaurant ends at destination", function( assert ) {
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
			"group": "restaurant" 
		},
		"3": {
			"id": 3, 
			"label": "N3", 
			"x": 2, 
			"y": 0, 
			"group": "primary" 
		}
	};
	
	graphEdges = { 
		"1_2": { 
			"id": "1_2", 
			"from": 1, 
			"to": 2, 
			"length": 1, 
			"waypointEdges": ["1_2"], 
			"graphEdge": "1_2"
		},
		"2_3": { 
			"id": "2_3", 
			"from": 2, 
			"to": 3, 
			"length": 1, 
			"waypointEdges": ["2_3"], 
			"graphEdge": "2_3"
		}
	};
					
	// act
	const result = findPathThroughRestaurant(1, 2, 3);
	
	// assert
	// The path ends at the destination if the id of the last step is the id of the destination
	assert.deepEqual(result[result.length - 1].id, 3); 
});

QUnit.test("Test findPathThroughRestaurant contains restaurant exactly once", function( assert ) {
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
			"group": "restaurant" 
		},
		"3": {
			"id": 3, 
			"label": "N3", 
			"x": 2, 
			"y": 0, 
			"group": "primary" 
		}
	};
	
	graphEdges = { 
		"1_2": { 
			"id": "1_2", 
			"from": 1, 
			"to": 2, 
			"length": 1, 
			"waypointEdges": ["1_2"], 
			"graphEdge": "1_2"
		},
		"2_3": { 
			"id": "2_3", 
			"from": 2, 
			"to": 3, 
			"length": 1, 
			"waypointEdges": ["2_3"], 
			"graphEdge": "2_3"
		}
	};
					
	// act
	const result = findPathThroughRestaurant(1, 2, 3);
	
	// assert
	assert.deepEqual(result.filter(node => node.id === 2).length, 1); 
});

QUnit.test("Test findPathThroughRestaurant when source is at restaurant, starts at restaurant", function( assert ) {
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
			"label": "R1", 
			"x": 1, 
			"y": 0, 
			"group": "restaurant" 
		}
	};
	
	graphEdges = { 
		"1_2": { 
			"id": "1_2", 
			"from": 1, 
			"to": 2, 
			"length": 1, 
			"waypointEdges": ["1_2"], 
			"graphEdge": "1_2"
		} 
	};
					
	// act
	const result = findPathThroughRestaurant(2, 2, 1);
	
	// assert
	assert.deepEqual(result[0].id, 2); 
});

QUnit.test("Test findPathThroughRestaurant when source is at restaurant, only contains restaurant once", function( assert ) {
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
			"label": "R1", 
			"x": 1, 
			"y": 0, 
			"group": "restaurant" 
		}
	};
	
	graphEdges = { 
		"1_2": { 
			"id": "1_2", 
			"from": 1, 
			"to": 2, 
			"length": 1, 
			"waypointEdges": ["1_2"], 
			"graphEdge": "1_2"
		} 
	};
					
	// act
	const result = findPathThroughRestaurant(2, 2, 1);
	
	// assert
	assert.deepEqual(result.filter(node => node.id === 2).length, 1); 
});

QUnit.test("Test findPathThroughRestaurant when destination is at restaurant, ends at restaurant", function( assert ) {
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
			"label": "R1", 
			"x": 1, 
			"y": 0, 
			"group": "restaurant" 
		}
	};
	
	graphEdges = { 
		"1_2": { 
			"id": "1_2", 
			"from": 1, 
			"to": 2, 
			"length": 1, 
			"waypointEdges": ["1_2"], 
			"graphEdge": "1_2"
		} 
	};
					
	// act
	const result = findPathThroughRestaurant(1, 2, 2);
	
	// assert
	assert.deepEqual(result[result.length - 1].id, 2);
});

QUnit.test("Test findPathThroughRestaurant when destination is at restaurant, only contains restaurant once", function( assert ) {
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
			"label": "R1", 
			"x": 1, 
			"y": 0, 
			"group": 
			"restaurant" 
		}
	};
	
	graphEdges = { 
		"1_2": { 
			"id": "1_2", 
			"from": 1, 
			"to": 2, 
			"length": 1, 
			"waypointEdges": ["1_2"], 
			"graphEdge": "1_2"
		} 
	};
					
	// act
	const result = findPathThroughRestaurant(1, 2, 2);
	
	// assert
	assert.deepEqual(result.filter(node => node.id === 2).length, 1);
});

QUnit.test("Test dfs starts at source", function( assert ) {
	// arrange
	graphNodes = {  
		"1": {
			"id": 1, 
			"label": "N1", 
			"x": 0, 
			"y": 0, 
			"group": "primary", 
			"visited": false 
		},
		"2": {
			"id": 2, 
			"label": "N2", 
			"x": 0, 
			"y": 1, 
			"group": 
			"primary", 
			"visited": false 
		},
		"3": {
			"id": 3, 
			"label": "N3", 
			"x": 1, 
			"y": 0, 
			"group": "primary", 
			"visited": false 
		}
	};
	
	graphEdges = { 
		"1_2": { 
			"id": "1_2", 
			"from": 1, 
			"to": 2, 
			"length": 1, 
			"waypointEdges": ["1_2"], 
			"graphEdge": "1_2"
		},
		"1_3": { 
			"id": "1_3", 
			"from": 1, 
			"to": 3, 
			"length": 1, 
			"waypointEdges": ["1_3"], 
			"graphEdge": "1_3"
		}
	};
					
	// act
	const result = dfs(graphNodes[2], graphNodes[3]);
	
	// assert
	assert.deepEqual(result[0].id, 2); 
});

QUnit.test("Test dfs ends at destination", function( assert ) {
	// arrange
	graphNodes = {  
		"1": {
			"id": 1, 
			"label": 
			"N1", 
			"x": 0, 
			"y": 0, 
			"group": "primary", 
			"visited": false 
		},
		"2": {
			"id": 2, 
			"label": "N2", 
			"x": 0, 
			"y": 1, 
			"group": "primary", 
			"visited": false 
		},
		"3": {
			"id": 3, 
			"label": "N3", 
			"x": 1, 
			"y": 0, 
			"group": "primary", 
			"visited": false 
		}
	};
	
	graphEdges = { 
		"1_2": { 
			"id": "1_2", 
			"from": 1, 
			"to": 2, 
			"length": 1, 
			"waypointEdges": ["1_2"], 
			"graphEdge": "1_2"
		},
		"1_3": { 
			"id": "1_3", 
			"from": 1, 
			"to": 3, 
			"length": 1, 
			"waypointEdges": ["1_3"], 
			"graphEdge": "1_3"
		}
	};
					
	// act
	const result = dfs(graphNodes[2], graphNodes[3]);
	
	// assert
	assert.deepEqual(result[result.length - 1].id, 3); 
});

QUnit.test("Test dfs returns empty array if no path", function( assert ) {
	// arrange
	graphNodes = {  
		"1": {
			"id": 1, 
			"label": "N1", 
			"x": 0, 
			"y": 0, 
			"group": "primary", 
			"visited": false 
		},
		"2": {
			"id": 2, 
			"label": "N2", 
			"x": 0, 
			"y": 1, 
			"group": "primary", 
			"visited": false 
		},
		"3": {
			"id": 3, 
			"label": "N3", 
			"x": 1, 
			"y": 0, 
			"group": "primary", 
			"visited": false 
		}
	};
	
	graphEdges = { 
		"1_2": { 
			"id": "1_2", 
			"from": 1, 
			"to": 2, 
			"length": 1, 
			"waypointEdges": ["1_2"], 
			"graphEdge": "1_2"
		} 
	};
					
	// act
	const result = dfs(graphNodes[2], graphNodes[3]);
	
	// assert
	assert.deepEqual(result, []); 
});

QUnit.test("Test dfs returns an array with start/end node in it if finding path from a node to itself", function( assert ) {
	// arrange
	graphNodes = {  
		"1": {
			"id": 1, 
			"label": "N1", 
			"x": 0, 
			"y": 0, 
			"group": "primary", 
			"visited": false 
		},
		"2": {
			"id": 2, 
			"label": "N2", 
			"x": 0, 
			"y": 1, 
			"group": "primary", 
			"visited": false 
		},
		"3": {
			"id": 3, 
			"label": "N3", 
			"x": 1, 
			"y": 0, 
			"group": "primary", 
			"visited": false 
		}
	};
	
	graphEdges = { 
		"1_2": { 
			"id": "1_2", 
			"from": 1, 
			"to": 2, 
			"length": 1, 
			"waypointEdges": ["1_2"], 
			"graphEdge": "1_2"
		},
		"1_3": { 
			"id": "1_3", 
			"from": 1, 
			"to": 3, 
			"length": 1, 
			"waypointEdges": ["1_3"], 
			"graphEdge": "1_3"
		}
	};
					
	// act
	const result = dfs(graphNodes[2], graphNodes[2]);
	
	// assert
	assert.deepEqual(result.length, 1);
	assert.deepEqual(result[0].id, 2)
});

QUnit.test("Test dfs returns correct path, one path exists", function( assert ) {
	// arrange
	graphNodes = {  
		"1": {
			"id": 1, 
			"label": "N1", 
			"x": 0, 
			"y": 0, 
			"group": "primary", 
			"visited": false 
		},
		"2": {
			"id": 2, 
			"label": "N2", 
			"x": 0, 
			"y": 2, 
			"group": "primary", 
			"visited": false 
		},
		"3": {
			"id": 3, 
			"label": "N3", 
			"x": 5, 
			"y": 2, 
			"group": "primary", 
			"visited": false 
		},
		"4": {
			"id": 4, 
			"label": "N4", 
			"x": 0, 
			"y": 4, 
			"group": "primary", 
			"visited": false 
		},
		"5": {
			"id": 5, 
			"label": "N5", 
			"x": 0, 
			"y": 8, 
			"group": "primary", 
			"visited": false 
		},
		"6": {
			"id": 6, 
			"label": "N6", 
			"x": -3, 
			"y": 4, 
			"group": "primary", 
			"visited": false 
		},
		"7": {
			"id": 7, 
			"label": "N7", 
			"x": 5, 
			"y": 4, 
			"group": "primary", 
			"visited": false 
		}
	};
	
	graphEdges = { 
		"1_2": { 
			"id": "1_2", 
			"from": 1, 
			"to": 2, 
			"length": 2, 
			"waypointEdges": ["1_2"], 
			"graphEdge": "1_2"
		},
		"2_3": { 
			"id": "2_3", 
			"from": 2, 
			"to": 3, 
			"length": 5, 
			"waypointEdges": ["2_3"], 
			"graphEdge": "2_3"
		},
		"2_4": { 
			"id": "2_4", 
			"from": 2, 
			"to": 4, 
			"length": 2, 
			"waypointEdges": ["2_4"], 
			"graphEdge": "2_4"
		},
		"4_5": { 
			"id": "4_5", 
			"from": 4, 
			"to": 5, 
			"length": 4, 
			"waypointEdges": ["4_5"], 
			"graphEdge": "4_5"
		},
		"4_6": { 
			"id": "4_6", 
			"from": 4, 
			"to": 6, 
			"length": 3, 
			"waypointEdges": ["4_6"], 
			"graphEdge": "4_6"
		},
		"5_6": { 
			"id": "5_6", 
			"from": 5, 
			"to": 6, 
			"length": 5, 
			"waypointEdges": ["5_6"], 
			"graphEdge": "5_6"
		},
		"3_7": { 
			"id": "3_7", 
			"from": 3, 
			"to": 7, 
			"length": 2, 
			"waypointEdges": ["3_7"], 
			"graphEdge": "3_7"
		}
	};
					
	// act
	const result = dfs(graphNodes[1], graphNodes[7]);
	
	// assert
	assert.deepEqual(result.map(node => node.id), [1, 2, 3, 7]); 
});

QUnit.test("Test dfs returns correct path, multiple possible paths", function( assert ) {
	// arrange
	graphNodes = {  
		"1": {
			"id": 1, 
			"label": "N1", 
			"x": 0, 
			"y": 0, 
			"group": "primary", 
			"visited": false 
		},
		"2": {
			"id": 2, 
			"label": "N2", 
			"x": 0, 
			"y": 2, 
			"group": "primary", 
			"visited": false 
		},
		"3": {
			"id": 3, 
			"label": "N3", 
			"x": 5, 
			"y": 2, 
			"group": "primary", 
			"visited": false 
		},
		"4": {
			"id": 4, 
			"label": "N4", 
			"x": 0, 
			"y": 4, 
			"group": "primary", 
			"visited": false 
		},
		"5": {
			"id": 5, 
			"label": "N5", 
			"x": 0, 
			"y": 8, 
			"group": "primary", 
			"visited": false 
		},
		"6": {
			"id": 6, 
			"label": "N6", 
			"x": -3, 
			"y": 4, 
			"group": "primary", 
			"visited": false 
		},
		"7": {
			"id": 7, 
			"label": "N7", 
			"x": 5, 
			"y": 4, 
			"group": "primary", 
			"visited": false 
		}
	};
	
	graphEdges = { 
		"1_2": { 
			"id": "1_2", 
			"from": 1, 
			"to": 2, 
			"length": 2, 
			"waypointEdges": ["1_2"], 
			"graphEdge": "1_2"
		},
		"2_3": { 
			"id": "2_3", 
			"from": 2, 
			"to": 3, 
			"length": 5, 
			"waypointEdges": ["2_3"], 
			"graphEdge": "2_3"
		},
		"2_4": { 
			"id": "2_4", 
			"from": 2, 
			"to": 4, 
			"length": 2, 
			"waypointEdges": ["2_4"], 
			"graphEdge": "2_4"
		},
		"4_5": { 
			"id": "4_5", 
			"from": 4, 
			"to": 5, 
			"length": 4, 
			"waypointEdges": ["4_5"], 
			"graphEdge": "4_5"
		},
		"4_6": { 
			"id": "4_6", 
			"from": 4, 
			"to": 6, 
			"length": 3, 
			"waypointEdges": ["4_6"], 
			"graphEdge": "4_6"
		},
		"5_6": { 
			"id": "5_6", 
			"from": 5, 
			"to": 6, 
			"length": 5, 
			"waypointEdges": ["5_6"], 
			"graphEdge": "5_6"
		},
		"3_7": { 
			"id": "3_7", 
			"from": 3, 
			"to": 7, 
			"length": 2, 
			"waypointEdges": ["3_7"], 
			"graphEdge": "3_7"
		}
	};
					
	// act
	const result = dfs(graphNodes[1], graphNodes[6]);
	
	// assert
	assert.deepEqual(result.map(node => node.id), [1, 2, 4, 5, 6]); 
});

QUnit.test("Test dfs returns correct path, source and destination are the same node", function( assert ) {
	// arrange
	graphNodes = {  
		"1": {
			"id": 1, 
			"label": "N1", 
			"x": 0, 
			"y": 0, 
			"group": "primary", 
			"visited": false 
		},
		"2": {
			"id": 2, 
			"label": "N2", 
			"x": 0, 
			"y": 2, 
			"group": "primary", 
			"visited": false 
		},
		"3": {
			"id": 3, 
			"label": "N3", 
			"x": 5, 
			"y": 2, 
			"group": "primary", 
			"visited": false 
		},
		"4": {
			"id": 4, 
			"label": "N4", 
			"x": 0, 
			"y": 4, 
			"group": "primary", 
			"visited": false 
		},
		"5": {
			"id": 5, 
			"label": "N5", 
			"x": 0, 
			"y": 8, 
			"group": "primary", 
			"visited": false 
		},
		"6": {
			"id": 6, 
			"label": "N6", 
			"x": -3, 
			"y": 4, 
			"group": "primary", 
			"visited": false 
		},
		"7": {
			"id": 7, 
			"label": "N7", 
			"x": 5, 
			"y": 4, 
			"group": "primary", 
			"visited": false 
		}
	};
	
	graphEdges = { 
		"1_2": { 
			"id": "1_2", 
			"from": 1, 
			"to": 2, 
			"length": 2, 
			"waypointEdges": ["1_2"], 
			"graphEdge": "1_2"
		},
		"2_3": { 
			"id": "2_3", 
			"from": 2, 
			"to": 3, 
			"length": 5, 
			"waypointEdges": ["2_3"], 
			"graphEdge": "2_3"
		},
		"2_4": { 
			"id": "2_4", 
			"from": 2, 
			"to": 4, 
			"length": 2, 
			"waypointEdges": ["2_4"], 
			"graphEdge": "2_4"
		},
		"4_5": { 
			"id": "4_5", 
			"from": 4, 
			"to": 5, 
			"length": 4, 
			"waypointEdges": ["4_5"], 
			"graphEdge": "4_5"
		},
		"4_6": { 
			"id": "4_6", 
			"from": 4, 
			"to": 6, 
			"length": 3, 
			"waypointEdges": ["4_6"], 
			"graphEdge": "4_6"
		},
		"5_6": { 
			"id": "5_6", 
			"from": 5, 
			"to": 6, 
			"length": 5, 
			"waypointEdges": ["5_6"], 
			"graphEdge": "5_6"
		},
		"3_7": { 
			"id": "3_7", 
			"from": 3, 
			"to": 7, 
			"length": 2, 
			"waypointEdges": ["3_7"], 
			"graphEdge": "3_7"
		}
	};
					
	// act
	const result = dfs(graphNodes[1], graphNodes[1]);
	
	// assert
	assert.deepEqual(result.map(node => node.id), [1]); 
});