import $ from 'jquery';
import * as handle from './template.js';
// var $projectList = $('#projectList');
// var $add = $('#add');
// var $delete = $('#delete');
// var $quickAdd = $('#quickAdd');
// var $projectDetails = $('#projectDetails');
window.$ = $;

export function appendList(node, data) {
    handle.getProject('project-list')
        .then(function (content) {
            node.empty();
            data.forEach(function (project) {
                let projectData = content(project);
                node.append(projectData);
            });
        }, function () {
            throw Error;
        });
}


export function appendProjectDetails(node, data) {
    handle.getProject('project-detail').then(function (content) {
        data.forEach(function (project) {
            let projectData = content(project);
            node.append(projectData);
        });
    }, function () {
        throw Error;
    });
}


export function emptyProjectDetailBox() {
    // $projectDetails.empty();
}

export function showDelete() {
    var $add = $('#add');
    var $delete = $('#delete');
    var $quickAdd = $('#quickAdd');
    $add.hide(300);
    $quickAdd.hide(300);
    $delete.show(350);
}

export function hideDelete() {

    var $add = $('#add');
    var $delete = $('#delete');
    var $quickAdd = $('#quickAdd');
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