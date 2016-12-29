 import * as data from './index2.js';
 import * as view from './view.js';
 import * as route from './router.js';
 

 $(function () {
     var $quickAdd = $('#quickAdd');
     var $projectNameInput = $('#projectNameInput');
     var $projectListBox = $('#projectListBox');
     var jsonProjectlist = data.jsondata;
     var jsondata1 = data.jsonFiles();

     var currentStatus = route.listen(callback);

     function callback() {
         data.jsonFiles();
         view.appendPojectDetails(jsondata1);
     }

     if (currentStatus === 'one') {
         view.showPartOne();
     } else if (currentStatus === 'two') {
         view.showPartTwo();
     } else if (currentStatus === 'three') {
         view.showPartThree();
     } else if (currentStatus === 'error') {

         view.showPartFour();
     }

     //------------------------------------------Getting project list and Dashboard page-------------------------
     view.appendList(jsonProjectlist)
         // --------------------------------------delete functionality-----------------------------------------------

     $($projectListBox).on('click', '.checkbox', checkboxStatus)

     function checkboxStatus() {
         if ($('.checkbox').is(':checked') === true) {
             view.showDelete();
         } else if ($('.checkbox').is(':checked') === false) {
             view.hideDelete();
         }
     }
     //------------------------------------------------------when delete is clicked--------------------------------
     var $delete = $('#delete');
     $delete.on('click', () => {
         var $checkbox = $('.checkbox');
         $($checkbox).each(function () {
             if (this.checked === true) {
                 var b = $(this).parent()
                 var c = $('li').index(b)
                 jsonProjectlist.splice(c, 1);
                 view.hideDelete();
                 view.appendList(jsonProjectlist);
             }
         });
     });

     //-------------------------------------------- when click on project Details------------------------------------

     $($projectListBox).on('click', '.button1', projectDetails);

     function projectDetails() {
         var $buttonName = $(this).attr('id');
         goToPageDetails($buttonName);
     }

     function goToPageDetails(buttonName) {
         view.showPartThree();
         route.goToProjectDetails(buttonName);
         view.appendPojectDetails(data.jsonFiles())
     }
     //---------------------------------------------------project detail page-------------------------------------------
     var $back = $('#backToHomePage');

     $($back).on('click', goToHomePage)

     function goToHomePage() {
         showPageOne();
     }
     //---------------------------------------------quick add project---------------------------------------------------- 
     $quickAdd.on('click', function () {
         var project = {
             ProjectID: undefined,
             Name: $projectNameInput.val(),
             Rating: undefined
         };
         jsonProjectlist.push(project);
         view.appendList(jsonProjectlist);
     });
     //-----------------------------------when add button is clicked------------------------------------------------------

     var $add = $('#add');

     $add.on('click', showPageTwo);

     function showPageTwo() {
         view.showPartTwo();
         route.goToAdd();
     }

     function showPageOne() {
         view.showPartOne();
         route.gotToDashboard();
     }
     //--------------------------------------------------add button page----------------------------------------------------
     var $projectId = $('#ProjectId');
     var $projectName = $('#ProjectName');
     var $rating = $('#Rating');
     var $createbtn = $('#createbtn');
     var $cancelbtn = $('#cancelbtn');

     $createbtn.on('click', () => {

         var newProject = {
             ProjectID: $projectId.val(),
             Name: $projectName.val(),
             Rating: $rating.val()
         };
         jsonProjectlist.push(newProject);
         view.appendList(jsonProjectlist);
         alert('project created successfully ');
         showPageOne();
     });

     $cancelbtn.on('click', showPageOne);
     //-------------------------------------------------Error Page---------------------------------------------------------
     var $homePage = $('#homePage');
     $homePage.on('click', showPageOne);

 });