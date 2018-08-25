var graphEdges, graphNodes, displayEdges;
QUnit.module( "graph.js tests", {
  beforeEach: function() {
    graphEdges = {};
	graphNodes = {};
	displayEdges = [];
  }
});
	
QUnit.test( "Test getEdgeId nodeID1 < nodeID2", function( assert ) {
  var nodeID1 = 1;
  var nodeID2 = 2;
  
  var result = getEdgeID(nodeID1, nodeID2);
  
  assert.deepEqual(result, "1_2");
});

QUnit.test( "Test getEdgeId nodeID2 < nodeID1", function( assert ) {
  var nodeID1 = 2;
  var nodeID2 = 1;
  
  var result = getEdgeID(nodeID1, nodeID2);
  
  assert.deepEqual(result, "1_2");
});

QUnit.test( "Test getEdgesBetweenNodes when no edge exists", function( assert ) {
	graphNodes = {  "node1": {"id": 1, "label": "N1", "x": 0, "y": 0, "group": "primary" },
					"node2": {"id": 2, "label": "N2", "x": 1, "y": 0, "group": "primary" } };
	
	graphEdges = { };
	
	var result = getEdgesBetweenNodes(1, 2);
	
	assert.deepEqual(result, []);
});

QUnit.test( "Test getEdgesBetweenNodes when one edge exists", function( assert ) {
	graphNodes = {  "node1": {"id": 1, "label": "N1", "x": 0, "y": 0, "group": "primary" },
					"node2": {"id": 2, "label": "N2", "x": 1, "y": 0, "group": "primary" }};
	
	graphEdges = { "1_2": { "id": "1_2", "from": 1, "to": 2, "waypointEdges": ["1_2"], "graphEdge": "1_2"} };
					
	displayEdges = getDataSetForItems([ { "id": "1_2", "from": 1, "to": 2, "length": 1, "waypointEdges": ["1_2"], "graphEdge": "1_2" } ]);
	
	var result = getEdgesBetweenNodes(1, 2);
	
	assert.deepEqual(result, [{ "id": "1_2", "from": 1, "to": 2, "length": 1, "waypointEdges": ["1_2"], "graphEdge": "1_2" }]);
});

QUnit.test( "Test getEdgesBetweenNodes with multiple waypoints", function( assert ) {
	graphNodes = {  "node1": {"id": 1, "label": "N1", "x": 0, "y": 0, "group": "primary" },
					"node2": {"id": 2, "label": "N2", "x": 3, "y": 0, "group": "primary" }};
	
	graphEdges = { "1_2": { "id": "1_2", "from": 1, "to": 2, "waypointEdges": ["1_2_waypoint_1", "1_2_waypoint_2", "1_2_waypoint_3"], "graphEdge": "1_2"} };
					
	displayEdges = getDataSetForItems([ { "id": "1_2_waypoint_1", "from": 1, "to": "waypoint_0", "graphEdge": "1_2" },
										{ "id": "1_2_waypoint_2", "from": "waypoint_0", "to": "waypoint_1", "graphEdge": "1_2" },
										{ "id": "1_2_waypoint_3", "from": "waypoint_1", "to": "waypoint_2", "graphEdge": "1_2" } ]);
	
	var result = getEdgesBetweenNodes(1, 2);
	
	assert.deepEqual(result, [ { "id": "1_2_waypoint_1", "from": 1, "to": "waypoint_0", "graphEdge": "1_2" },
							   { "id": "1_2_waypoint_2", "from": "waypoint_0", "to": "waypoint_1", "graphEdge": "1_2" },
							   { "id": "1_2_waypoint_3", "from": "waypoint_1", "to": "waypoint_2", "graphEdge": "1_2" } ]);
});

QUnit.test( "Test getDistanceBetweenPoints ", function( assert ) {
  var point1 = { x: 0, y: 0 };
  var point2 = { x: 3, y: 4 };
  
  var result = getDistanceBetweenPoints(point1, point2);
  
  assert.deepEqual(result, 5);
});

QUnit.test( "Test getDistanceBetweenPoints ", function( assert ) {
  var point1 = { x: 1, y: 0 };
  var point2 = { x: 1, y: 3 };
  
  var result = getDistanceBetweenPoints(point1, point2);
  
  assert.deepEqual(result, 3);
});
