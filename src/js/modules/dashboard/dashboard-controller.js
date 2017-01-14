import * as view from '../../view';
import * as route from '../../router';
import * as data from '../../data';
import {
    Project
} from '../../entities/project-entity';


export function dashboardController() {

    const dashboardNodes = {
        '$quickAdd': $('#quickAdd'),
        '$projectNameInput': $('#projectNameInput'),
        '$projectListBox': $('#projectListBox'),
        '$add': $('#add'),
        $projectList: $('#projectList')
    };

    // get all project data
    data.getAllProjects()
        .then(function (content) {
            view.appendList(dashboardNodes.$projectList, content);
        })
        .catch(function () {
            throw Error;
        });

    dashboardNodes.$quickAdd.on('click', function () {
        let name = dashboardNodes.$projectNameInput.val();
        let project = new Project(10, name, 5);

        if (project.name === '') {
            alert('Please Enter the name of the Project');
        } else {
            data.addProject(project)
                .then(function (content) {
                    view.appendList(dashboardNodes.$projectList, content);
                    dashboardNodes.$projectNameInput.val('');
                }, function () {
                    throw Error;
                });
        }
    });
    //-----------------------------------when add button is clicked------------------------------------------------------
    dashboardNodes.$add.on('click', showAddPage);

    function showAddPage() {
        route.goToState('project-add');
    }
    //---------------------------------------------------when checkbox is clicked-------------------------------------------
    dashboardNodes.$projectListBox.on('click', '.checkbox', checkboxStatus);

    function checkboxStatus() {
        console.log('checkbox clicked');
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
                        view.appendList(dashboardNodes.$projectList,content);
                    }).catch(function () {
                        throw Error;
                    });
            }
        });
    });
    //-----------------------------------------------------------------project detail is clicked------------------------
    $(dashboardNodes.$projectListBox).on('click', '.button1', projectDetails);


    function projectDetails() {
        let $buttonName = $(this).attr('id');
        route.goToState('project-details', {
            id: $buttonName
        });
    }

}

