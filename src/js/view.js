 var $projectList = $('#projectList');
 var $add = $('#add');
 var $delete = $('#delete');
 var $quickAdd = $('#quickAdd');
 var $projectDetails = $('#projectDetails');

 export function appendList(data) {
     $projectList.empty();

     $.each(data, function (i, project) {
         $projectList.append('<li><input type=\'checkbox\' class=\'checkbox \' >Project ID: ' + project.ProjectID + ', Project Name: ' + project.Name +
             ', Rating: ' + project.Rating + '<button class=\'button1\' id="' + project.ProjectID + '">Details </button>' + '</li>');

     });
 }

  export function appendPojectDetails(data) {
     $.each(data, function (i, project) {
         $projectDetails.empty();
         $projectDetails.append('<h3>Project Name: ' + project.Name + '</h3>');
         $projectDetails.append('<h3>Project ID: ' + project.ProjectID + '</h3>');
         $projectDetails.append('<h3>Project Rating: ' + project.Rating + '</h3>');
         $projectDetails.append('<h3>Project Team: ' + project.Team + '</h3>');
         $projectDetails.append('<h3>Project Details: ' + project.Details + '</h3>');

     });

 }
 export function showDelete() {
     $add.hide(300);
     $quickAdd.hide(300);
     $delete.show(350);
 }

 export function hideDelete() {
     $delete.hide(300);
     $add.show(350);
     $quickAdd.show(350);

 }