$( document ).ready( onReady );

function addItem(){
    console.log( 'in addItem' );
    // get user input & place in an object to send to server
    const objectToSend = {
        description: $( '#descriptionIn').val(),
        name: $( '#nameIn').val()
    }
    console.log( 'sending:', objectToSend );
    // send to server via POST
    $.ajax({
        type: 'POST',
        url: '/items',
        data: objectToSend
    }).then( function( response ){
        console.log( 'back from server with:', response );
        getItems();
    }).catch( function( err ){
        alert( 'error adding item. see console for details' );
        console.log( err );
    })
    // update DOM
} // end addItem

function getItems(){
    $.ajax({
        type: 'GET',
        url: '/items'
    }).then( function( response ){
        showItems( response );
    }).catch( function( err ){
        console.log( err );
        alert( 'problem!' );
    })
    $( '#searchHeadline').hide();
    $( '#currentItemsHeadline').show();
} //end getItems

function onReady(){
    console.log( 'JQ' );
    $( '#addItemButton').on( 'click', addItem );
    $( '#searchButton').on( 'click', search );
    $( '#searchHeadline' ).on( 'click', getItems );
    $( '#searchHeadline').hide();
    getItems();
}

function search(){
    console.log( 'in search' );
    $.ajax({
        type: 'POST',
        url: '/search',
        data: { name: $( '#searchIn').val() }
    }).then( function( response ){
        console.log( 'back from server with:', response );
        $( '#searchHeadline').show();
        $( '#currentItemsHeadline').hide();
        showItems( response );
    }).catch( function( err ){
        alert( 'error adding item. see console for details' );
        console.log( err );
    })
} // end search

function showItems( arrayOfItems ){
    console.log( 'in showItems:', arrayOfItems );
    const el = $( '#itemsOut' );
    el.empty();
    for( let i=0; i<arrayOfItems.length; i++ ){
        el.append( `<li>${ arrayOfItems [i].name}: 
            ${ arrayOfItems [i].description}</li>`)
    } // end for
} // end showItems