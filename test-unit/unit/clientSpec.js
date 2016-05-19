/* global it, describe, expect, jasmine */
var proxyquire = require( 'proxyquire' ),
	ConnectionMock = require( '../mocks/message/connection-mock' ),
	deepstream = proxyquire( '../../src/client', { './message/connection': ConnectionMock } );
	
describe( 'connects', function(){
	var client,
		stateChangeCallback = jasmine.createSpy( 'stateChangeCallback' );
	
	it( 'creates the client', function() {
		client = deepstream( 'someUrl' );
		expect( client.getConnectionState() ).toBe( 'CLOSED' );
		expect( client._connection.lastSendMessage ).toBe( null );
	});

	it( 'receives a different uid for every call', function(){
		expect( client.getUid() ).not.toBe( client.getUid() );
	});

	it( 'exposes constants', function() {
		expect( deepstream.CONSTANTS ).toEqual( require( '../../src/constants/constants' ) );
	});

	it( 'exposes merge strategies', function(){
		expect( deepstream.MERGE_STRATEGIES ).toEqual( require( '../../src/constants/merge-strategies' ) );
	});

	it( 'merges options correctly', function(){
		client = deepstream( 'someUrl', {
			recordPersistDefault: false,
			recordDeleteTimeout: 34852
		});
		expect( client._options.recordPersistDefault ).toBe( false );
		expect( client._options.recordReadTimeout ).toBe( 3000 );
		expect( client._options.recordDeleteTimeout ).toBe( 34852 );
	});
});
