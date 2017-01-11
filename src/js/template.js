const Handlebars=require('handlebars');
var templateCache = {};
var compiledTemplateCache = {};


// export function getProject(templateName) {
//     return new Promise(function (resolve) {
//         getCompiledTemplate(templateName).then(function (compiledTemplate) {
//             resolve(compiledTemplate);
//         });
//     });

//     // return getCompiledTemplate(templateName);
// }

// function getTemplate(templateName) {
//     return new Promise(function (resolve) {
//         if (templateCache.hasOwnProperty(templateName)) {
//             resolve(templateCache.templateName);

//         } else {
//             getTemplateData(templateName, function (templateData) {
//                 templateCache.templateName = templateData;
//                 resolve(templateData);
//             });
//         }
//     });
// }

// function getCompiledTemplate(templateName) {
//     return new Promise(function (resolve) {
//         if (compiledTemplateCache.hasOwnProperty(templateName)) {
//             resolve(compiledTemplateCache.templateName);
//         } else {
//             getTemplate(templateName).then(function (template) {
//                 let compiledTemplate = Handlebars.compile(template);
//                 compiledTemplateCache.templateName = compiledTemplate;
//                 resolve(compiledTemplate);
//             });
//         }
//     });
// }

export function getProject(templateName) {
    return getCompiledTemplate(templateName);
}

function getTemplate(templateName) {
    if (templateCache.hasOwnProperty(templateName)) {
        return templateCache.templateName;
    } else {
        return new Promise(function (resolve) {
            getTemplateData(templateName, function (templateData) {
                templateCache.templateName = templateData;
                resolve(templateData);
            },function(){
                throw Error;
            });
        });
    }
}

function getCompiledTemplate(templateName) {
    if (compiledTemplateCache.hasOwnProperty(templateName)) {
        return compiledTemplateCache.templateName;
    } else {
        return new Promise(function (resolve) {
            getTemplate(templateName).then(function (template) {
                let compiledTemplate = Handlebars.compile(template);
                compiledTemplateCache.templateName = compiledTemplate;
                resolve(compiledTemplate);
            },function(){
                throw Error;
            });
        });
    }
}

function getTemplateData(templateName, callback,callbackError) {
    $.ajax({
        type: 'GET',
        url: templateName,
        dataType: 'html',
        success: function (html) {
            callback(html);
        },
        error: function () {
            callbackError() ;
        }
    });
}