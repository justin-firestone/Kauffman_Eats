const setup = () => {
    setRandomSeed('Raikes');
    loadMap();
}
QUnit.module("initTests", {beforeEach: setup});

QUnit.test("initNetwork: Network Creation", function( assert ) {
    //arrange
    let expectedContainer = document.getElementById('mynetwork');
    let expectedNodeIds = Object.keys(displayNodes._data);
    let expectedEdgeIds = Object.keys(displayEdges._data);

    //act
    initNetwork();

    //assert
    let networkNodeIds = new Set( Object.keys( network.body.nodes ) );
    let networkEdgeIds = new Set( Object.keys( network.body.edges ) );

    assert.ok( network, "Passed!" );
    assert.equal( network.body.container,  expectedContainer);
    assert.ok( expectedNodeIds.every(n => networkNodeIds.has(n)) );
    assert.ok( expectedEdgeIds.every(e => networkEdgeIds.has(e)) );
});

QUnit.test("addDeliverators: Add 10 Deliverators", function(assert){
    //arrange
    let numDeliverators = 10;
    let oldDisplayNodesSize = displayNodes.length;

    //act
    addDeliverators(numDeliverators);

    //assert
    assert.equal(deliverators.length, numDeliverators);
    assert.equal(displayNodes.length, oldDisplayNodesSize + numDeliverators);
});

QUnit.test("addDeliverators: Add negative Deliverators", function(assert){
    //arrange
    let numDeliverators = -10;
    let expectedNum = 0;

    //act
    addDeliverators(numDeliverators);

    //assert
    assert.equal(deliverators.length, expectedNum);
});

QUnit.test("getNewStartLocation: Deliverator with already-set end location", function(assert){
    //arrange
    let expectedStartId = 844923267;
    let node = {
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
    let newStart = getNewStartLocation(node);

    //assert
    assert.equal(newStart.id, expectedStartId);
});

QUnit.test("getNewStartLocation: Deliverator with no end location", function(assert){
    //arrange
    let node = {
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
    let newStart = getNewStartLocation(node);

    //assert
    assert.ok(newStart.id);
});

QUnit.test("getNewEndLocation: Deliverator with already-set start location", function(assert){
    //arrange
    let expectedEndId = 844923267;
    let node = {
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
    let newStart = getNewEndLocation(node);

    //assert
    assert.ok(newStart.id !== expectedEndId);
});

QUnit.test("getNewEndLocation: Deliverator with no start location", function(assert){
    //arrange
    let node = {
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
    let newStart = getNewEndLocation(node);

    //assert
    assert.ok(newStart.id !== false);
});

QUnit.test("resetDeliverator: reset deliverator with existing start and end locations", function(assert){
    //arrange
    let startNodeId = 4719907357, endNodeId = 844923267;
    let startX = 476.30366971418425, startY = -348.97568806968593;
    let deliverator = {
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
    assert.equal(deliverator.start, endNodeId);
    assert.ok(deliverator.restaurant);
    assert.equal(deliverator.x, startX);
    assert.equal(deliverator.y, startY);
    assert.ok(deliverator.end !== deliverator.start);
    assert.equal(deliverator.path.length, 0);
    assert.equal(deliverator.steps.length, 0);
});

QUnit.test("resetDeliverator: reset deliverator with a start but no end locations", function(assert){
    //arrange
    let startNodeId = 4719907357, endNodeId = 4719495257;
    let startX = 521.8036697129946, startY = -933.4256880713099;
    let restaurantId = 2568624543;
    let deliverator = {
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
    assert.equal(deliverator.start, startNodeId);
    assert.equal(deliverator.restaurant, restaurantId);
    assert.equal(deliverator.end, endNodeId);
    assert.equal(deliverator.x, startX);
    assert.equal(deliverator.y, startY);
    assert.ok(deliverator.end !== deliverator.start);
    assert.equal(deliverator.path.length, 0);
    assert.equal(deliverator.steps.length, 0);
});

QUnit.test("resetDeliverator: reset deliverator with no start and end locations", function(assert){
    //arrange
    let startNodeId = 2568624551, endNodeId = 2585936649;
    let startX = 235.50366971392123, startY = 324.12431193051816;
    let restaurantId = 2568599384;
    let deliverator = {
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
    assert.equal(deliverator.start, startNodeId);
    assert.equal(deliverator.restaurant, restaurantId);
    assert.equal(deliverator.end, endNodeId);
    assert.equal(deliverator.x, startX);
    assert.equal(deliverator.y, startY);
    assert.ok(deliverator.end !== deliverator.start);
    assert.equal(deliverator.path.length, 0);
    assert.equal(deliverator.steps.length, 0);
});


QUnit.test("getRandomInt: max is greater than zero", function(assert){
    //arrange
    let max = 5;
    let expectedRandomInts = [1,3,4];

    //act
    let randomInts = [];
    for(let i = 0; i < expectedRandomInts.length; i++){
        randomInts.push(getRandomInt(max));
    }

    //assert
    for(let i = 0; i < expectedRandomInts.length; i++){
        assert.equal(randomInts[i], expectedRandomInts[i]);
    }
});

QUnit.test("getRandomInt: max is zero", function(assert){
    //arrange
    let max = 0;
    let expectedRandomInt = 0;

    //act
    let randomInt = getRandomInt(max);

    //assert
    assert.equal(randomInt, expectedRandomInt);
});

QUnit.test("getRandomColor: first color with 'Raikes' seed", function(assert){
    //arrange
    let expectedColor = 'hsla(115.2894018880268, 100%, 50%, 1)';

    //act
    let randomColor = getRandomColor();

    //assert
    assert.equal(randomColor, expectedColor);
});

QUnit.test("getRandomGraphNode: first graph node with 'Raikes' seed", function(assert){
    //arrange
    let expectedGraphNodeId = 2568600191;

    //act
    let randomGraphNode = getRandomGraphNode();

    //assert
    assert.equal(randomGraphNode.id, expectedGraphNodeId);
});

QUnit.test("getRandomRestaurantNode: first restaurant node with 'Raikes' seed", function(assert){
    //arrange
    let expectedRestaurantNodeId = 2568600187;

    //act
    let randomRestaurantNode = getRandomRestaurantNode();

    //assert
    assert.equal(randomRestaurantNode.id, expectedRestaurantNodeId);
});