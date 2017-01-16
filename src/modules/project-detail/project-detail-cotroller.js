import * as view from '../../services/view';
import * as route from '../../framework/router';
import * as data from '../../services/data';


export function projectDetailController() {
    const $back = $('#backToHomePage');
    const projectDetails = $('#projectDetails');

    $($back).on('click', () => route.goToState('dashboard'));
    // route.getStateParams() --->  {id: 5} /details/{id} /details/5
   // route.getStateParams();
    data.getProjectDetails(2)
        .then(function (projectData) {
            view.appendProjectDetails(projectDetails,projectData);
        }).catch(function () {
            throw Error;
        });
}