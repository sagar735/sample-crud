const Hapi = require('hapi');
const jquery = require('jquery');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: '8080'
});
//--------------------------for home page-----------------------------------------------
server.register(require('inert'), (err) => {
    if (err) {
        throw err;
    }
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            reply.file('./src/index.html');
        }
    });
    server.route({
        method: 'GET',
        path: '/dashboard',
        handler: (request, reply) => {
            reply.file('./src/index.html');
        }
    });
    server.route({
        method: 'GET',
        path: '/css/index.css',
        handler: (request, reply) => {
            reply.file('./src/css/index.css');
        }
    });
    server.route({
        method: 'GET',
        path: '/dest/js/index.js',
        handler: (request, reply) => {
            reply.file('./dest/js/index.js');
        }
    });
    server.route({
        method: 'GET',
        path: '/js/jquery.js',
        handler: (request, reply) => {
            reply.file('./src/js/jquery1.js');
        }
    });
    server.route({
        method: 'GET',
        path: '/projectList',
        handler: (request, reply) => {
            reply.file('projectList.json');
        }
    });
    
    server.route({
    method: 'GET',
    path: '/details/{projectId}',
    handler: (request, reply) => {
       if (request.params.projectId === '1') {
            reply.file('./src/jsonFiles/project1.json');
        } else if (request.params.projectId === '2') {
            reply.file('./src/jsonFiles/project2.json');
        } else if (request.params.projectId === '3') {
            reply.file('./src/jsonFiles/project3.json');
        } else if (request.params.projectId === '4') {
            reply.file('./src/jsonFiles/project4.json');
        } else if (request.params.projectId === '5') {
            reply.file('./src/jsonFiles/project5.json');
        }else{
            reply.file('./src/jsonFiles/error.json');
        }
    }
});
server.route({
    method: '*',
    path: '/{p*}', // catch-all path
    handler: function (request, reply) {
        reply.file('./src/jsonFiles/error.json');
    }
});
});


//--------------------------------------server start-----------------------------------------------------

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('server running at ' + server.info.uri)
})