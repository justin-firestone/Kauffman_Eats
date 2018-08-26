const visualTestSetup = () => {
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
            "x": 1,
            "y": 0,
            "group":"primary"
        },
        "3": {  
            "id": 3,
            "label": "J3",
            "x": 2,
            "y": 0,
            "group": "primary"
        },
        "4": {  
            "id": 4,
            "label": "J4",
            "x": 2,
            "y": 1,
            "group": "primary"
        },
        "5": {  
            "id": 5,
            "label": "J5",
            "x": 3,
            "y": 1,
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
        },
    };
    graphEdges = { 
        "1_2": {  
           "id": "1_2",
           "from": 1,
           "to": 2,
           "length": 1,
           "waypointEdges":[  
              "1_2"
           ],
           "graphEdge":"1_2"
        },
        "2_3": {  
            "id": "2_3",
            "from": 2,
            "to": 3,
            "length": 1,
            "waypointEdges":[  
               "2_3"
            ],
            "graphEdge":"2_3"
        },
        "2_4": {  
            "id": "2_4",
            "from": 2,
            "to": 4,
            "length": 1,
            "waypointEdges":[  
               "2_4"
            ],
            "graphEdge":"2_4"
        },
        "4_5": {  
            "id": "4_5",
            "from": 4,
            "to": 5,
            "length": 1,
            "waypointEdges":[  
               "4_5"
            ],
            "graphEdge":"4_5"
        },
        "10_11": {  
            "id": "10_11",
            "from": 10,
            "to": 11,
            "length": 1,
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
            "x": 1,
            "y": 0,
            "group": "primary"
        },
        {  
            "id": 3,
            "label": "J3",
            "x": 2,
            "y": 0,
            "group": "primary"
        },
        {  
            "id": 4,
            "label": "J4",
            "x": 2,
            "y": 1,
            "group": "primary"
        },
        {  
            "id": 5,
            "label": "J5",
            "x": 3,
            "y": 1,
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
        }
    ]);
    initNetwork();
}
QUnit.module("visualTests", {beforeEach: visualTestSetup});

QUnit.test("highlightPath: highlight path 1-2-3", function( assert ) {
    //arrange
    let path = [graphNodes[1], graphNodes[2], graphNodes[3]];
    let color = 'hsla(137, 100%, 50%, 1)';

    //act
    highlightPath(path, color);

    //assert
    assert.ok(displayEdges._data["1_2"].shadow.color === color);
    assert.ok(displayEdges._data["2_3"].shadow.color === color);
});

QUnit.test("highlightPath: highlight path 2-4-5", function( assert ) {
    //arrange
    let path = [graphNodes[2], graphNodes[4], graphNodes[5]];
    let color = 'hsla(137, 100%, 50%, 1)';

    //act
    highlightPath(path, color);

    //assert
    assert.ok(displayEdges._data["2_4"].shadow.color === color);
    assert.ok(displayEdges._data["4_5"].shadow.color === color);
});

QUnit.test("highlightAllPaths: highlight path 1-2", function( assert ) {
    //arrange
    RESTAURANTS = '[2]';
    addDeliverators(1);
    deliverators[0].path = [graphNodes[1], graphNodes[2]];

    //act
    highlightAllPaths();

    //assert
    assert.ok(displayEdges._data["1_2"].shadow.color === deliverators[0].color.background);
});

QUnit.test("highlightAllPaths: highlight path 1-2-3-2-4", function( assert ) {
    //arrange
    RESTAURANTS = '[3]';
    addDeliverators(1);
    deliverators[0].path = [graphNodes[1], graphNodes[2], graphNodes[3], graphNodes[2], graphNodes[4]];

    //act
    highlightAllPaths();

    //assert
    assert.ok(displayEdges._data["1_2"].shadow.color === deliverators[0].color.background);
    assert.ok(displayEdges._data["2_3"].shadow.color === deliverators[0].color.background);
    assert.ok(displayEdges._data["2_4"].shadow.color === deliverators[0].color.background);
});

QUnit.test("getOrderedPointsFromPath: points from path 1-2", function( assert ) {
    //arrange
    let path = [graphNodes[1], graphNodes[2]];
    let expectedPoints = [
        {x: 0, y: 0},
        {x: 1, y: 0}
    ];

    //act
    let points = getOrderedPointsFromPath(path);

    //assert
    for(let i = 0; i < expectedPoints.length; i++){
        assert.ok(expectedPoints[i].x === points[i].x && expectedPoints[i].y === points[i].y);
    }
});

QUnit.test("getOrderedPointsFromPath: points from path 1-2-3-2-4", function( assert ) {
    //arrange
    let path = [graphNodes[1], graphNodes[2], graphNodes[3], graphNodes[2], graphNodes[4]];
    let expectedPoints = [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 2, y: 0},
        {x: 1, y: 0},
        {x: 2, y: 1}
    ];

    //act
    let points = getOrderedPointsFromPath(path);

    //assert
    for(let i = 0; i < expectedPoints.length; i++){
        assert.ok(expectedPoints[i].x === points[i].x && expectedPoints[i].y === points[i].y);
    }
});

QUnit.test("invertBetweenEdges: flips list of edges [[1,2]]", function(assert){
    //arrange
    let edges = [graphEdges["1_2"]];

    //act
    let inverted = invertEdgesBetween(edges);

    //assert
    assert.equal(edges.length, inverted.length);
    for(let i = 0; i < edges.length; i++){
        let index = edges.length - 1 - i;
        assert.ok(edges[i].to === inverted[index].from && edges[i].from === inverted[index].to);
    }
});

QUnit.test("invertBetweenEdges: flips list of edges [[1,2],[2,3],[2,4]]", function(assert){
    //arrange
    let edges = [graphEdges["1_2"], graphEdges["2_3"], graphEdges["2_4"]];

    //act
    let inverted = invertEdgesBetween(edges);

    //assert
    assert.equal(edges.length, inverted.length);
    for(let i = 0; i < edges.length; i++){
        let index = edges.length - 1 - i;
        assert.ok(edges[i].to === inverted[index].from && edges[i].from === inverted[index].to);
    }
});

QUnit.test("getStepsAlongPath: steps for path 1-2", function( assert ) {
    //arrange
    let path = [graphNodes[10], graphNodes[11]];
    let expectedSteps = [
        {x: 10, y: 1},
        {x: 13, y: 1},
        {x: 16, y: 1},
        {x: 19, y: 1},
        {x: 20, y: 1}
    ];

    //act
    let steps = getStepsAlongPath(path);

    //assert
    assert.equal(expectedSteps.length, steps.length);
    for(let i = 0; i < expectedSteps.length; i++){
        assert.ok(expectedSteps[i].x === steps[i].x && expectedSteps[i].y === steps[i].y);
    }
});

QUnit.test("getStepsAlongPath: steps for path 1-2-4-5", function( assert ) {
    //arrange
    let path = [graphNodes[1], graphNodes[2], graphNodes[4], graphNodes[5]];
    let expectedSteps = [
        {x: 0, y: 0},
        {x: 1.7071067811865475, y: 0.7071067811865475},
        {x: 2.414213562373095, y: 1},
        {x: 3, y: 1}
    ];

    //act
    let steps = getStepsAlongPath(path);

    //assert
    assert.equal(expectedSteps.length, steps.length);
    for(let i = 0; i < expectedSteps.length; i++){
        assert.ok(expectedSteps[i].x === steps[i].x && expectedSteps[i].y === steps[i].y);
    }
});

QUnit.test("travelDistanceAlongLineSegment: travel distance from 1 to 2", function( assert ) {
    //arrange
    let start = graphNodes[1], end = graphNodes[2], distanceToTravel = 1;
    let expectedStep = {
        x: 1,
        y: 0
    }

    //act
    let step = travelDistanceAlongLineSegment(start, end, distanceToTravel);

    //assert
    assert.equal(step.x, expectedStep.x);
    assert.equal(step.y, expectedStep.y);
});

QUnit.test("travelDistanceAlongLineSegment: travel distance from 1 to 5", function( assert ) {
    //arrange
    let start = graphNodes[1], end = graphNodes[5], distanceToTravel = 3;
    let expectedStep = {
        x: 2.846049894151541,
        y: 0.9486832980505138
    }

    //act
    let step = travelDistanceAlongLineSegment(start, end, distanceToTravel);

    //assert
    assert.equal(step.x, expectedStep.x);
    assert.equal(step.y, expectedStep.y);
});
