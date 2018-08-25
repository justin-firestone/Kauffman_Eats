const setup = () => {
    setRandomSeed();
    loadMap();
}
QUnit.module("initTests", {beforeEach: setup});

QUnit.test( "initNetwork Test 1: Network Creation", function( assert ) {
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