function getCurrentState() {
    if (window.location.href.split('/')[3] === '') {
        return window.location.href.split('/')[3];
    } else {
        return window.location.hash.split('#')[1];
    }
}

function addHash(path) {
    window.location.hash = window.location.hash.split('#')[0];
    window.location.hash = '/' + path;
}

function removeHash() {

    window.location.hash = window.location.hash.split('#')[0];
    window.location.hash = '/dashboard';
}

export function goToProjectDetails($buttonName) {
    window.location.href = 'http://localhost:8080/#/details/' + $buttonName;
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


export function listen(callback) {
    var current = getCurrentState();
    var currentStatus;
    if (current === '/add') {
        currentStatus = 'two';
    } else if (current === '/dashboard') {
        currentStatus = 'one';
    } else if (current === '/') {
        currentStatus = 'one';
    } else if (current === '') {
        currentStatus = 'one';
    } else if (current === '/details/1') {
        currentStatus = 'three';
        callback();
    } else if (current === '/details/2') {
        currentStatus = 'three';
        callback();
    } else if (current === '/details/3') {
        currentStatus = 'three';
        callback();
    } else if (current === '/details/4') {
        currentStatus = 'three';
        callback();
    } else if (current === '/details/5') {
        currentStatus = 'three';
        callback();
    } else {
        currentStatus = 'error';
        goToError();
    }
    return currentStatus;
    setTimeout(listen, 2000);
};


