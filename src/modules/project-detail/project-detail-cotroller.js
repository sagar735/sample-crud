import * as view from '../../services/view';
import * as route from '../../framework/router';
import * as data from '../../services/data';


export function projectDetailController() {
    const $back = $('#backToHomePage');
    const projectDetails = $('#projectDetails');

    $($back).on('click', () => route.goToState('dashboard'));
    const params = route.getStateParams();
    const projectId=params.id;
    data.getProjectDetails(projectId)
        .then(function (projectData) {
            view.appendProjectDetails(projectDetails, projectData);
        }).catch(function () {
            throw Error;
        });
}