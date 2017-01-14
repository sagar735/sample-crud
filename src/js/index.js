import $ from 'jquery';

import {
    State
} from './entities/state-entity.js';
import * as view from './view.js';
import * as route from './router.js';

import {
    dashboardController
} from './modules/dashboard/dashboard-controller.js';
import {
    addController
} from './modules/project-add/add-controller.js';
import {
    projectDetailController
} from './modules/project-detail/project-detail-cotroller.js';
// import {
//     errorController
// } from './modules/error/error-controller.js';
window.$ = $;

$(fireOnReady);

function fireOnReady() {

  
    route.setMountElement($('.main-container').get(0));

    const stateProjectDetails = new State('project-details', '/details/{id}', './modules/project-detail/projectDetail.html', projectDetailController);
    const stateAddPage = new State('project-add', '/add', './modules/project-add/addPage.html', addController);
    const stateDashboard = new State('dashboard', '/dashboard', './modules/dashboard/dashboard.html', dashboardController);
    route.addState(stateProjectDetails);
    route.addState(stateAddPage);
    route.addState(stateDashboard);

    route.goToState('dashboard');


    // let dashboardNodes = {
    //     '$quickAdd': $('#quickAdd'),
    //     '$projectNameInput': $('#projectNameInput'),
    //     '$projectListBox': $('#projectListBox'),
    //     '$add': $('#add')
    // };

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

    //---------------------------------------------------project detail page-------------------------------------------
    // var $back = $('#backToHomePage');

    // $($back).on('click', goToHomePage);

    // function goToHomePage() {
    //     showDashboardPage();
    //     route.goToState('dashboard');
    // }
    

    function showDashboardPage() {
        view.goToDashboard();
        route.goToState('dashboard');

    }
    //--------------------------------------------------add button page----------------------------------------------------
    // let addPageNodes = {
    //     '$projectId': $('#ProjectId'),
    //     '$projectName': $('#ProjectName'),
    //     '$rating': $('#Rating'),
    //     '$createbtn': $('#createbtn'),
    //     '$cancelbtn': $('#cancelbtn'),
    // };
    // addPageNodes.$createbtn.on('click', () => {
    //     let projectId = addPageNodes.$projectId.val();
    //     let name = addPageNodes.$projectName.val();
    //     let rating = addPageNodes.$rating.val();
    //     let newProject = new Project(projectId, name, rating);

    //     if (newProject.projectId === '') {
    //         alert('Project Id can not be NULL');
    //     } else {
    //         data.addProject(newProject)
    //             .then(function (content) {
    //                 view.appendList(content);
    //                 alert('Project created successfully');
    //                 showDashboardPage();
    //             }, function () {
    //                 throw Error;
    //             });
    //     }
    // });
    // addPageNodes.$cancelbtn.on('click', showDashboardPage);
    //-------------------------------------------------Error Page---------------------------------------------------------
    var $homePage = $('#homePage');
    $homePage.on('click', showDashboardPage);

}