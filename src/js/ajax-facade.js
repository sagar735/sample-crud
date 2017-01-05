export function getAllProjects(callback) {
    $.ajax({
        type: 'GET',
        url: '/projectList',
        dataType: 'json',
        success: function (data) {
            setTimeout(function () {
                callback(data);
            }, 100);
        },
        error: function () {
            alert('error in loading the data');
        }

    });
}

export function getProjectById(id, callback) {
    $.ajax({
        type: 'GET',
        url: '/details/' + id,
        dataType: 'json',
        success: function (data) {
            setTimeout(function () {
                callback(data);
            }, 1000);
        },
        error: function () {
            alert('error in loading the data');
        }
    });
}