

var $projectDetails = $('#projectDetails');


export var jsondata = (function () {
    var json = null;
    $.ajax({
        type: 'GET',
        async: false,
        url: '/projectList',
        dataType: 'json',
        'success': function (data) {
            json = data;
        },
        error: function () {
        alert('error in loading the data');
        }

    });
    return json;
})();
  

  
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
                  
                },
                error: function () {
                    alert('error in loading the data');
                },
            });
            return json;
            
        })();
    } else {
        var jsondata1 = (function () {
            var json=null;
            $.ajax({
                type: 'GET',
                async: false,
                url: '/details/' + currentLocation,
                dataType: 'json',
                'success': function (data) {
                    json=data;
                  
                },
                error: function () {
                    alert('error in loading the data');
                },
            });
           return json;
        })();
    }
    return jsondata1;
}

    



