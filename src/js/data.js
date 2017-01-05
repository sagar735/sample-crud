import * as facade from './ajax-facade.js';
import {Project} from './project-entity.js';

var projectList;

export  function getAllProjects(){
        if(projectList===undefined){
            return new Promise(function (resolve,reject){
                facade.getAllProjects(function(_projectList){
                    projectList=_projectList;
                    resolve(_projectList);
                });
            });
        }
        else{
            return projectList;
        }
}
export function getProjectDetails(projectId) {
    return new Promise(function (resolve, reject) {
        facade.getProjectById(projectId, function (projectData) {
            resolve(projectData);
        });
    });
}

export function addProject(project) {
    if (project instanceof Project) {
        return new Promise(function (resolve, reject) {
            projectList.push(project);
            resolve(projectList);
        });
    } else {
        throw errormessage();
    }
}
function errormessage() {
    alert('Invalid Data Format');
}

export function removeProject(projectId) {
    return new Promise(function (resolve, reject) {
        var _newList = projectList.filter(item => parseInt(item.projectId) === parseInt(projectId));
        if (_newList.length === 1) {
            var projectToDelete = _newList[0];
            var index = projectList.indexOf(projectToDelete);
            projectList.splice(index, 1);
        }
        resolve(projectList);
    });
}
