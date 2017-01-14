import $ from 'jquery';

export function getAllProjects(callback, callbackError) {
    $.ajax({
        type: 'GET',
        url: '/projectList',
        dataType: 'json',
        success: function (data) {
            setTimeout(function () {
                callback(data);
            }, 10);
        },
        error: function () {
            callbackError();
        }

    });
}

export function getProjectById(id, callback, callbackError) {
    $.ajax({
        type: 'GET',
        url: '/details/' + id,
        dataType: 'json',
        success: function (data) {
            callback(data);
        },
        error: function () {
            callbackError();
        }
    });
}