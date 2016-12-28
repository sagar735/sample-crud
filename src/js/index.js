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

     function goToPageDetails(buttonName) {
         $('.page1').hide();
         $('.page2').hide();
         $('.page3').show();

         route.goToProjectDetails(buttonName);
         detail.jsonFiles();
     }
     //---------------------------------------------------project detail page-------------------------------------------
     var $back = $('#backToHomePage');

     $($back).on('click', goToHomePage)

     function goToHomePage() {
         showPartOne();
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

     $add.on('click', showPartTwo);

     function showPartTwo() {
         $('.page1').hide();
         $('.page2').show();
         $('.page3').hide();
         $('.page4').hide();
         route.goToAdd();
     }

     function showPartOne() {
         $('.page2').hide();
         $('.page1').show();
         $('.page3').hide();
         $('.page4').hide();
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
         showPartOne();
     });

     $cancelbtn.on('click', showPartOne);
     //-------------------------------------------------Error Page---------------------------------------------------------
     var $homePage = $('#homePage');
     $homePage.on('click', showPartOne);

     //-------------------------------------------------- handling error page-----------------------------------------------

     //   var jsondata2 = (function () {
     //       var json = null;
     //       $.ajax({
     //           type: 'GET',
     //           async: false,
     //           url: '/{p*}',
     //           dataType: 'json',
     //           'success': function (data) {
     //               json = data;
     //               console.log('welcome')
     //           },
     //           error: function (data) {
     //               //alert('error in loading the data');
     //               errorHandle(data);
     //           },
     //       });
     //       return json;
     //   })();

     //   function errorHandle(data) {

     //       console.log('welcome to error hanlde')
     //       $('.page1').hide();
     //       $('.page2').hide();
     //       $('.page3').hide();
     //       $('.page4').show();
     //       route.goToError();
     //       console.log(data)
     //       $.each(data, function (i, project) {
     //           $('#errorCode').html(project.statusCode);
     //           $('#errorType').html(project.error);

     //       });

     //   }
 });