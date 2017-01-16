const Hapi = require('hapi');


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
        path: '/modules/project-detail/project-detail.html',
        handler: (request, reply) => {
            reply.file('./src/modules/project-detail/project-detail.html');
        }
    });
    
    server.route({
        method: 'GET',
        path: '/project-detail',
        handler: (request, reply) => {
            reply.file('./src/modules/project-detail/project-detail-template.html');
        }
    });
    server.route({
        method: 'GET',
        path: '/modules/project-add/addPage.html',
        handler: (request, reply) => {
            reply.file('./src/modules/project-add/addPage.html');
        }
    });


    server.route({
        method: 'GET',
        path: '/modules/dashboard/dashboard.html',
        handler: (request, reply) => {
            reply.file('./src/modules/dashboard/dashboard.html');
        }
    });
    server.route({
        method: 'GET',
        path: '/modules/error/errorPage.html',
        handler: (request, reply) => {
            reply.file('./src/modules/error/errorPage.html');
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
        path: '/project-list',
        handler: (request, reply) => {
            reply.file('./src/modules/dashboard/project-list-template.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/modules/project-detail/project-detail-template.html',
        handler: (request, reply) => {
            reply.file('./src/modules/project-detail/project-detail-template.html');
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
        path: '/image/loading.gif',
        handler: (request, reply) => {
            reply.file('./src/image/loading.gif');
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
            } else {
                reply.file('./src/jsonFiles/error.json');
            }
        }
    });
    server.route({
        method: '*',
        path: '/{p*}',
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
    console.log('server running at ' + server.info.uri);
});