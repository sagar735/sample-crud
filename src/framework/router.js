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

export function getCurrentState() {
    return currentState;
}


export function getStateParams() {
    const currentUrl = window.location.hash.split('#').pop();
    const currentStateUrl = getCurrentState().url;
    const pattern = /([^{]*?)\w(?=\})/gmi;
    const currentUrlArray = currentUrl.split('/');
    const currentStateUrlArray = currentStateUrl.split('/');
    var paramsObj = {};
    const newArray = currentStateUrl.match(pattern);
    var paramsArray = [];
    for (var i = 0; i < currentUrlArray.length; i++) {
        if (currentUrlArray[i] != currentStateUrlArray[i]) {
            paramsArray.push(currentUrlArray[i]);
        }
    }
    newArray.forEach(function (value, index) {
        paramsObj[value] = paramsArray[index];
    });
    return paramsObj;
}

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