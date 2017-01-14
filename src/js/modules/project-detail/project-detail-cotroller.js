import * as view from '../../view';
import * as route from '../../router';
import * as data from '../../data';


export function projectDetailController() {
    const $back = $('#backToHomePage');
    const projectDetails = $('#projectDetails');

    $($back).on('click', () => route.goToState('dashboard'));
    // route.getStateParams() --->  {id: 5} /details/{id} /details/5
    route.getStateParams();
    data.getProjectDetails()
        .then(function (projectData) {
            view.appendProjectDetails(projectDetails,projectData);
        }).catch(function () {
            throw Error;
        });
}