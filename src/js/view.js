 var $projectList = $('#projectList');
 var $add = $('#add');
 var $delete = $('#delete');
 var $quickAdd = $('#quickAdd');
 var $projectDetails = $('#projectDetails');

 export function appendList(data) {
     $projectList.empty();

     $.each(data, function (i, project) {
         $projectList.append('<li id='+project.projectId+'><input type=\'checkbox\' class=\'checkbox \' >Project ID: ' + project.projectId + ', Project Name: ' + project.name +
             ', Rating: ' + project.rating + '<button class=\'button1\' id="' + project.projectId + '">Details </button>' + '</li>');

     });
 }

 export function appendProjectDetails(data) {
     $.each(data, function (i, project) {
         $projectDetails.empty();
         $projectDetails.append('<h3>Project Name: ' + project.name + '</h3>');
         $projectDetails.append('<h3>Project ID: ' + project.projectId + '</h3>');
         $projectDetails.append('<h3>Project Rating: ' + project.rating + '</h3>');
         $projectDetails.append('<h3>Project Team: ' + project.team + '</h3>');
         $projectDetails.append('<h3>Project Details: ' + project.details + '</h3>');

     });
 }
 export function emptyProjectDetailBox() {
     $projectDetails.empty();
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

 export function goToAddPage() {
     $('.page1').hide();
     $('.page2').show();
     $('.page3').hide();
     $('.page4').hide();
 }

 export function goToDashboard() {
     $('.page2').hide();
     $('.page1').show();
     $('.page3').hide();
     $('.page4').hide();
 }

 export function goToProjectDetailsPage() {
     $('.page1').hide();
     $('.page2').hide();
     $('.page3').show();
 }

 export function goToErrorPage() {
     $('.page1').hide();
     $('.page2').hide();
     $('.page3').hide();
     $('.page4').show();
 }

 export function showLoading() {
     $('.page1').hide();
     $('.page2').hide();
     $('.page3').hide();
     $('.page4').hide();
     $('.page5').hide();
     $('#loading').show();
 }
 export function hideLoading() {
     $('#loading').hide();
     goToProjectDetailsPage();
 }