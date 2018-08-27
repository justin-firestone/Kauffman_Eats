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