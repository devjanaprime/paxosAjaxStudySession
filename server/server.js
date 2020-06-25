// requires
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
// uses
app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) )
app.use( bodyParser.json() );
// globals
const port = 5000;
let items = [];
// server up
app.listen( port, ()=>{
    console.log( 'server up:', port );
})
// routes
app.get( '/items', ( req, res )=>{
    console.log( 'in /items GET' );
    res.send( items );
}) // end /items GET
app.post( '/items', ( req, res )=>{
    console.log( 'in /items POST:', req.body );
    items.push( req.body );
    res.sendStatus( 201 );
}) // end /items POST
app.post( '/search', ( req, res )=>{
    console.log( 'in /search POST:', req.body );
    let matches = [];
    for( let i=0; i<items.length; i++){
        if( items[i].name === req.body.name ){
            matches.push( items[i] );
        }
    }
    res.send( matches );
}) // end POST /search