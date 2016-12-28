import * as detail from './projectDetails.js'

function getCurrentState() {
    return window.location.hash;
}

function addHash(path) {
    window.location.hash = window.location.hash.split('#')[0];
    window.location.hash = '/' + path;
}

function removeHash() {
    if (window.location.hash === 'add') {
        window.location.hash = window.location.hash.split('#')[0];
    }
    window.location.hash = '/dashboard';
}

export function goToProjectDetails($buttonName) {
    //window.location.href = 'http://localhost:8080/#/details/' + $buttonName;
    window.location.href.split('/')[5] = $buttonName;
}
export function goToError() {
    addHash('error');
}

export function goToAdd() {
    addHash('add');
}

export function gotToDashboard() {
    removeHash();
}

function showPartTwo() {
    $('.page1').hide();
    $('.page2').show();
    $('.page3').hide();
    $('.page4').hide();
}

function showPartOne() {
    $('.page2').hide();
    $('.page1').show();
    $('.page3').hide();
    $('.page4').hide();
    gotToDashboard();
}


export function listen() {
    var current = getCurrentState();
    if (current === '#/add') {
        showPartTwo();
    } else if (current === '#/dashboard') {
        showPartOne();
    } else if (current === '#/') {
        showPartOne();
    } else if (current === '') {
        showPartOne();
    } else if (current === '#/details/1') {
        goToPage();
        detail.jsonFiles();
    } else if (current === '#/details/2') {
        goToPage();
        detail.jsonFiles();
    } else if (current === '#/details/3') {
        goToPage();
        detail.jsonFiles();
    } else if (current === '#/details/4') {
        goToPage();
        detail.jsonFiles();
    } else if (current === '#/details/5') {
        goToPage();
        detail.jsonFiles();
    } else {
        showError();
    }

    setTimeout(listen, 10);
};

function goToPage() {
    $('.page2').hide();
    $('.page1').hide();
    $('.page3').show();

}

function showError() {
    $('.page2').hide();
    $('.page1').hide();
    $('.page3').hide();
    $('.page4').show();
    goToError();
}