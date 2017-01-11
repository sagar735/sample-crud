import $ from 'jquery';
import * as handle from './template.js';
window.$=$;
var $projectList = $('#projectList');
var $add = $('#add');
var $delete = $('#delete');
var $quickAdd = $('#quickAdd');
var $projectDetails = $('#projectDetails');

export function appendList(data) {
    $projectList.empty();
    handle.getProject('project-list')
        .then(function (content) {
            data.forEach(function (project) {
                let projectData = content(project);
                $projectList.append(projectData);
            });
        }, function () {
            throw Error;
        });
}


export function appendProjectDetails(data) {
    handle.getProject('project-detail').then(function (content) {
        data.forEach(function (project) {
            let projectData = content(project);
            $projectDetails.append(projectData);
        });
    }, function () {
        throw Error;
    });
}


export function emptyProjectDetailBox() {
    $projectDetails.empty();
}

export function showDelete() {
    $add.hide(300);
    $quickAdd.hide(300);
    $delete.show(350);
}

export function hideDelete() {
    $delete.hide(300);
    $add.show(350);
    $quickAdd.show(350);

}

export function goToAddPage() {
    $('.page1').hide();
    $('.page2').show();
    $('.page3').hide();
    $('.page4').hide();
}

export function goToDashboard() {
    $('.page2').hide();
    $('.page1').show();
    $('.page3').hide();
    $('.page4').hide();
}

export function goToProjectDetailsPage() {
    $('.page1').hide();
    $('.page2').hide();
    $('.page3').show();
}

export function goToErrorPage() {
    $('.page1').hide();
    $('.page2').hide();
    $('.page3').hide();
    $('.page4').show();
}

export function showLoading() {
    $('.page1').hide();
    $('.page2').hide();
    $('.page3').hide();
    $('.page4').hide();
    $('.page5').hide();
    $('#loading').show();
}

export function hideLoading() {
    $('#loading').hide();
    goToProjectDetailsPage();
}