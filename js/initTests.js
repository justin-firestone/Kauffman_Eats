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

QUnit.test("addDeliverators: Add Negative Deliverators", function(assert){
    //arrange
    let numDeliverators = -10;
    let expectedNum = 0;

    //act
    addDeliverators(numDeliverators);

    //assert
    assert.equal(deliverators.length, expectedNum);
});