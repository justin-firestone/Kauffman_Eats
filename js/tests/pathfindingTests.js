var graphEdges, graphNodes;
QUnit.module( "pathfinding.js tests", {
  beforeEach: function() {
    graphEdges = {};
	graphNodes = {};
  }
});

QUnit.test("Test findPath starts at source", function( assert ) {
	graphNodes = {  "1": {"id": 1, "label": "N1", "x": 0, "y": 0, "group": "primary" },
					"2": {"id": 2, "label": "N2", "x": 1, "y": 0, "group": "primary" },
					"3": {"id": 3, "label": "N3", "x": 2, "y": 0, "group": "primary" }};
	
	graphEdges = { "1_2": { "id": "1_2", "from": 1, "to": 2, "length": 1, "waypointEdges": ["1_2"], "graphEdge": "1_2"},
					"2_3": { "id": "2_3", "from": 2, "to": 3, "length": 1, "waypointEdges": ["2_3"], "graphEdge": "2_3"}};
					
	let result = findPath(1, 3);
	
	assert.deepEqual(result[0].id, 1); 
});

QUnit.test("Test findPath ends at destination", function( assert ) {
	graphNodes = {  "1": {"id": 1, "label": "N1", "x": 0, "y": 0, "group": "primary" },
					"2": {"id": 2, "label": "N2", "x": 1, "y": 0, "group": "primary" },
					"3": {"id": 3, "label": "N3", "x": 2, "y": 0, "group": "primary" }};
	
	graphEdges = { "1_2": { "id": "1_2", "from": 1, "to": 2, "length": 1, "waypointEdges": ["1_2"], "graphEdge": "1_2"},
					"2_3": { "id": "2_3", "from": 2, "to": 3, "length": 1, "waypointEdges": ["2_3"], "graphEdge": "2_3"}};
					
	let result = findPath(1, 3);
	
	assert.deepEqual(result[2].id, 3); 
});

QUnit.test("Test findPath returns empty array when no path exists, no edges", function( assert ) {
	graphNodes = {  "1": {"id": 1, "label": "N1", "x": 0, "y": 0, "group": "primary" },
					"2": {"id": 2, "label": "N2", "x": 1, "y": 0, "group": "primary" },
					"3": {"id": 3, "label": "N3", "x": 2, "y": 0, "group": "primary" }};
	
	graphEdges = {};
					
	let result = findPath(1, 3);
	
	assert.deepEqual(result, []); 
});

QUnit.test("Test findPath returns array with start/end node when finding path from a node to itself", function( assert ) {
	graphNodes = {  "1": {"id": 1, "label": "N1", "x": 0, "y": 0, "group": "primary" },
					"2": {"id": 2, "label": "N2", "x": 1, "y": 0, "group": "primary" },
					"3": {"id": 3, "label": "N3", "x": 2, "y": 0, "group": "primary" }};
	
	graphEdges = { "1_2": { "id": "1_2", "from": 1, "to": 2, "length": 1, "waypointEdges": ["1_2"], "graphEdge": "1_2"},
					"2_3": { "id": "2_3", "from": 2, "to": 3, "length": 1, "waypointEdges": ["2_3"], "graphEdge": "2_3"} };
					
	let result = findPath(1, 1);
	
	assert.deepEqual(result.length, 1);
	assert.deepEqual(result[0].id, 1);	
});

QUnit.test("Test findPath returns empty array when no path exists", function( assert ) {
	graphNodes = {  "1": {"id": 1, "label": "N1", "x": 0, "y": 0, "group": "primary" },
					"2": {"id": 2, "label": "N2", "x": 1, "y": 0, "group": "primary" },
					"3": {"id": 3, "label": "N3", "x": 2, "y": 0, "group": "primary" }};
	
	graphEdges = { "1_2": { "id": "1_2", "from": 1, "to": 2, "length": 1, "waypointEdges": ["1_2"], "graphEdge": "1_2"} };
					
	let result = findPath(1, 3);
	
	assert.deepEqual(result, []); 
});

QUnit.test("Test getNeighborsForNode for node with no neighbors", function( assert ) {
	graphNodes = {  "1": {"id": 1, "label": "N1", "x": 0, "y": 0, "group": "primary" },
					"2": {"id": 2, "label": "N2", "x": 1, "y": 0, "group": "primary" },
					"3": {"id": 3, "label": "N3", "x": 2, "y": 0, "group": "primary" }};
	
	graphEdges = {};
					
	let result = getNeighborsForNode(1);
	
	assert.deepEqual(result, []); 
});

QUnit.test("Test getNeighborsForNode for node with one neighbor", function( assert ) {
	graphNodes = {  "1": {"id": 1, "label": "N1", "x": 0, "y": 0, "group": "primary" },
					"2": {"id": 2, "label": "N2", "x": 1, "y": 0, "group": "primary" },
					"3": {"id": 3, "label": "N3", "x": 2, "y": 0, "group": "primary" }};
	
	graphEdges = { "1_2": { "id": "1_2", "from": 1, "to": 2, "length": 1, "waypointEdges": ["1_2"], "graphEdge": "1_2"},
					"2_3": { "id": "2_3", "from": 2, "to": 3, "length": 1, "waypointEdges": ["2_3"], "graphEdge": "2_3"}};
					
	let result = getNeighborsForNode(1);
	
	assert.deepEqual(result.length, 1); 
	assert.deepEqual(result[0].id, 2);
});

QUnit.test("Test getNeighborsForNode for node with multiple neighbors", function( assert ) {
	graphNodes = {  "1": {"id": 1, "label": "N1", "x": 0, "y": 0, "group": "primary" },
					"2": {"id": 2, "label": "N2", "x": 1, "y": 0, "group": "primary" },
					"3": {"id": 3, "label": "N3", "x": 2, "y": 0, "group": "primary" }};
	
	graphEdges = { "1_2": { "id": "1_2", "from": 1, "to": 2, "length": 1, "waypointEdges": ["1_2"], "graphEdge": "1_2"},
					"2_3": { "id": "2_3", "from": 2, "to": 3, "length": 1, "waypointEdges": ["2_3"], "graphEdge": "2_3"}};
					
	let result = getNeighborsForNode(2);
	
	assert.deepEqual(result.length, 2); 
	assert.deepEqual(result.filter(node => node.id === 1).length, 1);
	assert.deepEqual(result.filter(node => node.id === 3).length, 1);
});

QUnit.test("Test getNeighborsForNode returns distinct neighbors when two edges between the same two nodes", function( assert ) {
	graphNodes = {  "1": {"id": 1, "label": "N1", "x": 0, "y": 0, "group": "primary" },
					"2": {"id": 2, "label": "N2", "x": 1, "y": 0, "group": "primary" }};
	
	graphEdges = { "1_2": { "id": "1_2", "from": 1, "to": 2, "length": 1, "waypointEdges": ["1_2"], "graphEdge": "1_2"},
					"2_1": { "id": "2_3", "from": 2, "to": 1, "length": 1, "waypointEdges": ["2_1"], "graphEdge": "2_1"}};
					
	let result = getNeighborsForNode(2);
	
	assert.deepEqual(result.length, 1); 
});

QUnit.test("Test findPathThroughRestaurant starts at source", function( assert ) {
	graphNodes = {  "1": {"id": 1, "label": "N1", "x": 0, "y": 0, "group": "primary" },
					"2": {"id": 2, "label": "R1", "x": 1, "y": 0, "group": "restaurant" },
					"3": {"id": 3, "label": "N3", "x": 2, "y": 0, "group": "primary" }};
	
	graphEdges = { "1_2": { "id": "1_2", "from": 1, "to": 2, "length": 1, "waypointEdges": ["1_2"], "graphEdge": "1_2"},
					"2_3": { "id": "2_3", "from": 2, "to": 3, "length": 1, "waypointEdges": ["2_3"], "graphEdge": "2_3"}};
					
	let result = findPathThroughRestaurant(1, 2, 3);
	
	assert.deepEqual(result[0].id, 1); 
});

QUnit.test("Test findPathThroughRestaurant ends at destination", function( assert ) {
	graphNodes = {  "1": {"id": 1, "label": "N1", "x": 0, "y": 0, "group": "primary" },
					"2": {"id": 2, "label": "R1", "x": 1, "y": 0, "group": "restaurant" },
					"3": {"id": 3, "label": "N3", "x": 2, "y": 0, "group": "primary" }};
	
	graphEdges = { "1_2": { "id": "1_2", "from": 1, "to": 2, "length": 1, "waypointEdges": ["1_2"], "graphEdge": "1_2"},
					"2_3": { "id": "2_3", "from": 2, "to": 3, "length": 1, "waypointEdges": ["2_3"], "graphEdge": "2_3"}};
					
	let result = findPathThroughRestaurant(1, 2, 3);
	
	assert.deepEqual(result[2].id, 3); 
});

QUnit.test("Test findPathThroughRestaurant contains restaurant exactly once", function( assert ) {
	graphNodes = {  "1": {"id": 1, "label": "N1", "x": 0, "y": 0, "group": "primary" },
					"2": {"id": 2, "label": "R1", "x": 1, "y": 0, "group": "restaurant" },
					"3": {"id": 3, "label": "N3", "x": 2, "y": 0, "group": "primary" }};
	
	graphEdges = { "1_2": { "id": "1_2", "from": 1, "to": 2, "length": 1, "waypointEdges": ["1_2"], "graphEdge": "1_2"},
					"2_3": { "id": "2_3", "from": 2, "to": 3, "length": 1, "waypointEdges": ["2_3"], "graphEdge": "2_3"}};
					
	let result = findPathThroughRestaurant(1, 2, 3);
	
	assert.deepEqual(result.filter(node => node.id === 2).length, 1); 
});

QUnit.test("Test findPathThroughRestaurant, start at restaurant", function( assert ) {
	graphNodes = {  "1": {"id": 1, "label": "N1", "x": 0, "y": 0, "group": "primary" },
					"2": {"id": 2, "label": "R1", "x": 1, "y": 0, "group": "restaurant" }};
	
	graphEdges = { "1_2": { "id": "1_2", "from": 1, "to": 2, "length": 1, "waypointEdges": ["1_2"], "graphEdge": "1_2"} };
					
	let result = findPathThroughRestaurant(2, 2, 1);
	
	assert.deepEqual(result[0].id, 2);
	assert.deepEqual(result[1].id, 1);
	assert.deepEqual(result.filter(node => node.id === 2).length, 1); 
});

QUnit.test("Test findPathThroughRestaurant, end at restaurant", function( assert ) {
	graphNodes = {  "1": {"id": 1, "label": "N1", "x": 0, "y": 0, "group": "primary" },
					"2": {"id": 2, "label": "R1", "x": 1, "y": 0, "group": "restaurant" }};
	
	graphEdges = { "1_2": { "id": "1_2", "from": 1, "to": 2, "length": 1, "waypointEdges": ["1_2"], "graphEdge": "1_2"} };
					
	let result = findPathThroughRestaurant(1, 2, 2);
	
	assert.deepEqual(result[0].id, 1);
	assert.deepEqual(result[1].id, 2);
	assert.deepEqual(result.filter(node => node.id === 2).length, 1); 
});

// dfs starts at source
// dfs ends at destination
// dfs returns empty array if no path
// dfs follows correct path 1 (simple)
// dfs follows correct path 2 (compex)