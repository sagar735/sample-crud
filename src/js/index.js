import $ from 'jquery';

import {
    State
} from '../entities/state-entity.js';
// import * as view from '../services/view';
import * as route from '../framework/router';

import {
    dashboardController
} from '../modules/dashboard/dashboard-controller.js';
import {
    addController
} from '../modules/project-add/add-controller.js';
import {
    projectDetailController
} from '../modules/project-detail/project-detail-cotroller.js';
import {
    errorController
} from '../modules/error/error-controller.js';
window.$ = $;

$(fireOnReady);

function fireOnReady() {

  
    route.setMountElement($('.main-container').get(0));

    const stateProjectDetails = new State('project-details', '/details/{id}', '../modules/project-detail/project-detail.html', projectDetailController);
    const stateAddPage = new State('project-add', '/add', '../modules/project-add/addPage.html', addController);
    const stateDashboard = new State('dashboard', '/dashboard', '../modules/dashboard/dashboard.html', dashboardController);
    const stateError=new State('error','/error','../modules/error/errorPage.html',errorController);
    route.addState(stateProjectDetails);
    route.addState(stateAddPage);
    route.addState(stateDashboard);
    route.addState(stateError);
    route.goToState('dashboard');

    // let currentStatus = route.listen(callback);

    // function callback() {
    //     let currentHref = window.location.href.split('/')[4];
    //     let projectId = window.location.href.split('/')[5];

    //     if (currentHref === 'details') {
    //         data.getProjectDetails(projectId)
    //             .then(function (content) {
    //                 view.appendProjectDetails(content);
    //             }, function () {
    //                 throw Error;
    //             });
    //     }
    // }

    // if (currentStatus === 'one') {
    //     view.goToDashboard();
    // } else if (currentStatus === 'two') {
    //     view.goToAddPage();
    // } else if (currentStatus === 'three') {
    //     view.goToProjectDetailsPage();
    // } else if (currentStatus === 'error') {
    //     view.goToErrorPage();
    // }
 
}