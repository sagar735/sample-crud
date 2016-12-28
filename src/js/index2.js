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
  
    



