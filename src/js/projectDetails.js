import {
    appendPojectDetails
} from './view.js'

var $projectDetails = $('#projectDetails');


export function jsonFiles() {
    var currentLocation = window.location.href.split('/')[4];
    var currentLocation2 = window.location.href.split('/')[5];

    if (currentLocation === 'details') {
        var jsondata1 = (function () {
            var json=null;
            $.ajax({
                type: 'GET',
                async: false,
                url: '/details/' + currentLocation2,
                dataType: 'json',
                'success': function (data) {
                    json=data;
                    appendPojectDetails(data);
                },
                error: function () {
                    alert('error in loading the data');
                },
            });
            return json;
            
        })();
    } else {
        var jsondata2 = (function () {
            var json=null;
            $.ajax({
                type: 'GET',
                async: false,
                url: '/details/' + currentLocation,
                dataType: 'json',
                'success': function (data) {
                    json=data;
                    appendPojectDetails(data);
                },
                error: function () {
                    alert('error in loading the data');
                },
            });
           return json;
        })();
    }
}
// function appendList(data) {
//     $.each(data, function (i, project) {
//              $projectDetails.empty();
//         $projectDetails.append('<h3>Project Name: ' + project.Name + '</h3>');
//         $projectDetails.append('<h3>Project ID: ' + project.ProjectID + '</h3>');
//         $projectDetails.append('<h3>Project Rating: ' + project.Rating + '</h3>');
//         $projectDetails.append('<h3>Project Team: ' + project.Team + '</h3>');
//         $projectDetails.append('<h3>Project Details: ' + project.Details + '</h3>');

//     });

// }