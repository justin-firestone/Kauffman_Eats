const setup = () => {
    setRandomSeed();
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

    //act
    addDeliverators(numDeliverators);

    //assert
    assert.equal(deliverators.length, numDeliverators);
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