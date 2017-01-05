import {
    Project
} from './project-entity.js';
import * as view from './view.js';
import * as route from './router.js';
import * as data from './data.js';

$(fireOnReady);

function fireOnReady() {

    let dashboardNodes = {
        '$quickAdd': $('#quickAdd'),
        '$projectNameInput': $('#projectNameInput'),
        '$projectListBox': $('#projectListBox'),
        '$add': $('#add'),

    }
    let currentStatus = route.listen(callback);

    function callback() {
        let currentHref = window.location.href.split('/')[4];
        let projectId = window.location.href.split('/')[5];

        if (currentHref === 'details') {
            data.getProjectDetails(projectId)
                .then(function (content) {
                    view.appendProjectDetails(content);
                });
        }
    }

    if (currentStatus === 'one') {
        view.goToDashboard();
    } else if (currentStatus === 'two') {
        view.goToAddPage();
    } else if (currentStatus === 'three') {
        view.goToProjectDetailsPage();
    } else if (currentStatus === 'error') {
        view.goToErrorPage();
    }
    //------------------------------------------Getting project list and Dashboard page-------------------------
    data.getAllProjects()
        .then(function (content) {
            view.appendList(content);
        });

    // --------------------------------------delete functionality-----------------------------------------------

    $(dashboardNodes.$projectListBox).on('click', '.checkbox', checkboxStatus);

    function checkboxStatus() {
        if ($('.checkbox').is(':checked') === true) {
            view.showDelete();
        } else if ($('.checkbox').is(':checked') === false) {
            view.hideDelete();
        }
    }
    //------------------------------------------------------when delete is clicked--------------------------------
 let $delete = $('#delete');
    $delete.on('click', () => {
        let $checkbox = $('.checkbox');
        $($checkbox).each(function () {
            if (this.checked === true) {
                var id = $(this).parent().attr('id');
                data.removeProject(id)
                    .then(function (content) {
                        view.hideDelete();
                        view.appendList(content);
                    });
            }
        });
    });

    //-------------------------------------------- when click on project Details------------------------------------

    $(dashboardNodes.$projectListBox).on('click', '.button1', projectDetails);

    function projectDetails() {
        let $buttonName = $(this).attr('id');
        goToPageDetails($buttonName);
    }

    function goToPageDetails(buttonName) {
        route.goToProjectDetails(buttonName);
        view.goToProjectDetailsPage();
        view.emptyProjectDetailBox();
        view.showLoading();

        data.getProjectDetails(buttonName)
            .then(function (content) {
                view.hideLoading();
                view.appendProjectDetails(content);
            });
    }
    //---------------------------------------------------project detail page-------------------------------------------
    var $back = $('#backToHomePage');

    $($back).on('click', goToHomePage);

    function goToHomePage() {
        showDashboardPage();
    }
    //---------------------------------------------quick add project---------------------------------------------------- 
    dashboardNodes.$quickAdd.on('click', function () {
        let name = dashboardNodes.$projectNameInput.val();
        let project = new Project(10, name, 5);

        if (project.name === "") {
            alert('Please Enter the name of the Project');
        } else {
            data.addProject(project)
                .then(function (content) {
                    view.appendList(content);
                    dashboardNodes.$projectNameInput.val('');
                });
        }
    });
    //-----------------------------------when add button is clicked------------------------------------------------------
    dashboardNodes.$add.on('click', showAddPage);

    function showAddPage() {
        view.goToAddPage();
        route.goToAdd();
    }

    function showDashboardPage() {
        view.goToDashboard();
        route.gotToDashboard();
    }
    //--------------------------------------------------add button page----------------------------------------------------
    let addPageNodes = {
        '$projectId': $('#ProjectId'),
        '$projectName': $('#ProjectName'),
        '$rating': $('#Rating'),
        '$createbtn': $('#createbtn'),
        '$cancelbtn': $('#cancelbtn'),
    };
    addPageNodes.$createbtn.on('click', () => {
        let projectId = addPageNodes.$projectId.val();
        let name = addPageNodes.$projectName.val();
        let rating = addPageNodes.$rating.val();
        let newProject = new Project(projectId, name, rating);

        if (newProject.projectId === '') {
            alert('Project Id can not be NULL');
        } else {
            data.addProject(newProject)
                .then(function (content) {
                    view.appendList(content);
                    alert('Project created successfully');
                    showDashboardPage();
                });
        }
    });
    addPageNodes.$cancelbtn.on('click', showDashboardPage);
    //-------------------------------------------------Error Page---------------------------------------------------------
    var $homePage = $('#homePage');
    $homePage.on('click', showDashboardPage);

}