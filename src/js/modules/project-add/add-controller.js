import * as view from '../../view.js';
import * as route from '../../router.js';
import * as data from '../../data.js';
import {
    Project
} from '../../entities/project-entity.js';


export function addController() {

    var addPageNodes = {
        '$projectId': $('#ProjectId'),
        '$projectName': $('#ProjectName'),
        '$rating': $('#Rating'),
        '$createbtn': $('#createbtn'),
        '$cancelbtn': $('#cancelbtn')
    };

    addPageNodes.$createbtn.on('click', () => {

        let projectId = addPageNodes.$projectId.val();
        let name = addPageNodes.$projectName.val();
        let rating = addPageNodes.$rating.val();
        let newProject = new Project(projectId, name, rating);

        if (newProject.projectId === '') {
            alert('Project Id can not be NULL');
        } else {
            if (newProject instanceof Project) {
                data.addProject(newProject)
                    .then(function (content) {
                        route.goToState('dashboard');
                        view.appendList($('#projectList'), content);
                        alert('Project created successfully');
                    }).catch(
                        function () {
                            throw Error;
                        });

            }
        }
    });
    addPageNodes.$cancelbtn.on('click', ()=>{
        route.goToState('dashboard');
    });
}