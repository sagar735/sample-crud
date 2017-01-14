// import $ from 'jquery';
import * as facade from './ajax-facade.js';
import {
    Project
} from './entities/project-entity.js';

var projectList;

// export function getAllProjects() {
//     return new Promise(function (resolve, reject) {
//         if (projectList === undefined) {
//             facade.getAllProjects(function (_projectList) {
//                 if (_projectList) {
//                     projectList = _projectList;
//                     resolve(_projectList);
//                 } else {
//                     reject();
//                 }
//             }, function () {
//                 throw Error;
//             });
//         } else {
//             return resolve(projectList);
//         }
//     });
// }

// export function getProjectDetails(projectId) {
//     return new Promise(function (resolve, reject) {
//         facade.getProjectById(projectId, function (projectData) {
//             if (projectData) {
//                 resolve(projectData);
//             } else {
//                 reject();
//             }
//         }, function () {
//             throw Error;
//         });
//     });
// }
export function getAllProjects() {
    return new Promise(function (resolve) {
        if (projectList === undefined) {
            facade.getAllProjects(function (_projectList) {
                projectList = _projectList;
                resolve(_projectList);
            }, function () {
                throw Error;
            });
        } else {
            return resolve(projectList);
        }
    });
}

export function getProjectDetails(projectId) {
    return new Promise(function (resolve) {
        facade.getProjectById(projectId, function (projectData) {
            resolve(projectData);
        }, function () {
            throw Error;
        });
    });
}

export function addProject(project) {
    if (project instanceof Project) {
        return new Promise(function (resolve) {
            projectList.push(project);
            resolve(projectList);
        });
    } else {
        throw Error;
    }
}



// export function removeProject(node,projectId) {
//     return new Promise(function (resolve) {
//         var _newList = projectList.filter(item => parseInt(item.projectId) === parseInt(projectId));
//         if (_newList.length === 1) {
//             var projectToDelete = _newList[0];
//             var index = projectList.indexOf(projectToDelete);
//             projectList.splice(index, 1);
//         }
//         console.log('projectlist  value '+JSON.stringify(projectList));
//         resolve(projectList);
//     });
// }
export function removeProject(projectId) {
    return new Promise(function (resolve) {
        var _newList = projectList.filter(item => parseInt(item.projectId) === parseInt(projectId));
        if (_newList.length === 1) {
            var projectToDelete = _newList[0];
            var index = projectList.indexOf(projectToDelete);
            projectList.splice(index, 1);
        }
        resolve(projectList);
    });
}