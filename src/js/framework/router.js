// import $ from 'jquery';
import {
    State
} from './entities/state-entity.js';
import {
    getTemplate
} from './template.js';

function getCurrentState() {
    if (window.location.href.split('/')[3] === '') {
        return window.location.href.split('/')[3];
    } else {
        return window.location.hash.split('#')[1];
    }
}
var mountElement = null;
export function setMountElement(DOMElement) {
    mountElement = DOMElement;
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

    window.location.hash = '/details/' + $buttonName;
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



var stateObjArray = [];
var currentState = null;

export function addState(stateObj) {
    //check if state exist or not
    //if not then add state
    //else throw error message;
    // TODO: if (stateObj instanceof State)

    if (stateObj instanceof State) {
        var exist = stateObjArray.filter((obj) => {
            return obj.stateName === stateObj.stateName;
        });
        if (exist.length === 0) {
            stateObjArray.push(stateObj);
        } else {
            throw Error;
        }
    } else {
        console.log('not instanceof State');
    }
}

export function getCurrentState2() {
    return currentState;
}

export function getStateParams() {
    //get current url 
    //get state url
    //match current and state url;
    var currentUrl = window.location.hash.split('#').pop();
    var currentstate = getCurrentState2();
    console.log('current url ' + currentUrl);
    console.log('currentstate ' + JSON.stringify(currentstate));
    // var pattern2 = /{([^}]+)}/gi;
    var pattern3 = /{([^)]+)/gi;
    let match = pattern3.exec(currentstate.url);
    var currentStateMatch = match[0];
    var currentUrlMatch = currentUrl.charAt(match.index);
    console.log('currentStateMatch ' + currentStateMatch);
    console.log('match ' + match.index + ' ' + match);
    console.log(match[0]);
    console.log(currentUrl.charAt(match.index));
}

export function getCurrentState1() {
    //find current url
    // find stateObj associated with that url
    // return stateObj if exist 
    //else return not found .
    // many state associated with same url 
    let currentUrl = window.location.hash;
    let currentURL = currentUrl.split('#').pop();

    var currentState = stateObjArray.filter((x) => {
        return x.url === currentURL;
    });

    if (currentState.length === 0) {
        throw Error;
    } else {
        return currentState[0];
    }

}

// export function goToState(stateName, params) {

//     const states = stateObjArray.filter((x) => {
//         return x.stateName === stateName;
//     });

//     if (states.length != 1) {
//         console.log('error occur. Problematic state resolution');
//         return;
//     }

//     const state = states[0];

//     // download template

//     if (params) {
//         const pattern = /([^{]*?)\w(?=\})/gmi;
//         const urlParams = state.url.match(pattern);

//         // urlParams = ['id', 'memberId'];
//         const url = urlParams.reduce((partialUrl, param) => {
//             // 1st iteration
//             // partialUrl: '/projects/{id}/members/{memberId}'
//             // param: 'id'
//             return partialUrl.replace(new RegExp('{' + param + '}', 'gi'), params[param]);

//             // 2nd iteration
//             // partialUrl: '/projects/9/members/{memberId}'
//             // param: 'memberId'

//         }, state.url);
//         updateState(url, state);
//     } else {
//         updateState(state.url, state);
//     }
// }
export function goToState(stateName, params) {

    const states = stateObjArray.filter((x) => {
        return x.stateName === stateName;
    });

    if (states.length != 1) {
        console.log('error occur. Problematic state resolution');
        return;
    }

    const state = states[0];
    getTemplate(state.template).then(function (template) {
        //if mount element is not null
        //then append template
        mountElement.innerHTML = template;

        if (params) {
            const pattern = /([^{]*?)\w(?=\})/gmi;
            const urlParams = state.url.match(pattern);

            const url = urlParams.reduce((partialUrl, param) => {
                return partialUrl.replace(new RegExp('{' + param + '}', 'gi'), params[param]);
            }, state.url);

            updateState(url, state);
        } else {
            updateState(state.url, state);
        }

    });

}

function updateState(urlFragment, state) {
    window.location.hash = urlFragment;
    currentState = state;
    state.controller();

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

}