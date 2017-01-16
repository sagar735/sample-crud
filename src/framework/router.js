import {
    State
} from '../entities/state-entity.js';
import {
    getTemplate
} from '../services/template.js';


var mountElement = null;
export function setMountElement(DOMElement) {
    mountElement = DOMElement;
}

var stateObjArray = [];
var currentState = null;

export function addState(stateObj) {
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

// export function getStateParams() {
//     //get current url 
//     //get state url
//     //match current and state url;
//     var currentUrl = window.location.hash.split('#').pop();
//     var currentstate = getCurrentState2();
//     console.log('current url ' + currentUrl);
//     console.log('currentstate ' + JSON.stringify(currentstate));
//     // var pattern2 = /{([^}]+)}/gi;
//     var pattern3 = /{([^)]+)/gi;
//     let match = pattern3.exec(currentstate.url);
//     var currentStateMatch = match[0];
//     var currentUrlMatch = currentUrl.charAt(match.index);
//     console.log('currentStateMatch ' + currentStateMatch);
//     console.log('match ' + match.index + ' ' + match);
//     console.log(match[0]);
//     console.log(currentUrl.charAt(match.index));
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

// export function listen(callback) {
//     var current = getCurrentState();
//     var currentStatus;

//     if (current === '/add') {
//         currentStatus = 'two';
//     } else if (current === '/dashboard') {
//         currentStatus = 'one';
//     } else if (current === '/') {
//         currentStatus = 'one';
//     } else if (current === '') {
//         currentStatus = 'one';
//     } else if (current === '/details/1') {
//         currentStatus = 'three';
//         callback();
//     } else if (current === '/details/2') {
//         currentStatus = 'three';
//         callback();
//     } else if (current === '/details/3') {
//         currentStatus = 'three';
//         callback();
//     } else if (current === '/details/4') {
//         currentStatus = 'three';
//         callback();
//     } else if (current === '/details/5') {
//         currentStatus = 'three';
//         callback();
//     } else {
//         currentStatus = 'error';
//         goToError();
//     }
//     return currentStatus;

// }