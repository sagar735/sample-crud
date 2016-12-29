 import {
     jsondata
 } from './index2.js';
 import * as view from './view.js';
 import * as route from './router.js';
 import * as detail from './projectDetails.js'

 $(function () {
     var $quickAdd = $('#quickAdd');
     var $projectNameInput = $('#projectNameInput');
     var $projectListBox = $('#projectListBox');
     var jsonProjectlist = jsondata;

     route.listen();
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
                 jsondata.splice(c, 1);
                 view.hideDelete();
                 view.appendList(jsondata);
             }
         });
     });

     //-------------------------------------------- when click on project Details------------------------------------

     $($projectListBox).on('click', '.button1', projectDetails);

     function projectDetails() {
         var $buttonName = $(this).attr('id');
         goToPageDetails($buttonName);
     }

     //DOM manipulation
     function goToPageDetails(buttonName) {
         view.showPartThree();
               route.goToProjectDetails(buttonName);
         detail.jsonFiles();
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
         jsondata.push(project);
         view.appendList(jsondata);
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
         jsondata.push(newProject);
         view.appendList(jsondata);
         alert('project created successfully ');
         showPageOne();
     });

     $cancelbtn.on('click', showPageOne);
     //-------------------------------------------------Error Page---------------------------------------------------------
     var $homePage = $('#homePage');
     $homePage.on('click', showPageOne);

     //-------------------------------------------------- handling error page-----------------------------------------------


 });