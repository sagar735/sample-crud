import $ from 'jquery';
import * as handle from './template';

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
            node.empty();
            let projectData = content(project);
            node.append(projectData);
        });
    }, function () {
        throw Error;
    });
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

export function goToDashboard() {
    $('.page2').hide();
    $('.page1').show();
    $('.page3').hide();
    $('.page4').hide();
}



export function goToErrorPage() {
    $('.page1').hide();
    $('.page2').hide();
    $('.page3').hide();
    $('.page4').show();
}