// import $ from 'jquery';
import {
    State
} from './state-entity.js';

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
            throw errorMessage();
        }
    } else {
        console.log('not instanceof State');
    }
}

function errorMessage() {
    alert('error Occur');
}

export function getCurrentState1() {
    //find current url
    // find stateObj associated with that url
    // return stateObj if exist 
    //else return not found .

    let currentUrl = window.location.hash;
    let currentURL = currentUrl.split('#').pop();

    var currentState = stateObjArray.filter((x) => {
        return x.url === currentURL;
    });

    if (currentState.length === 0) {
        throw errorMessage();
    } else {
        return currentState[0];
    }

}

// export function goToState(stateName, params) {
//     var paramsArray = $.map(params, function (el) {
//         return el;
//     });
//     console.log( paramsArray);
//     // console.log('params ' + JSON.stringify(params));
//     var stateObjA = stateObjArray.filter((x) => {
//         return x.stateName === stateName;
//     });

//     if (stateObjA.length === 0) {
//         console.log('error occur no such a state exist');
//     } else {
//         var url = stateObjA[0].url;
//         var pattern = /{([^}]+)}/gi;
//         var pattern = /([^{]*?)\w(?=\})/gmi
//         var urlArray = url.match(pattern);
//         console.log('url '+url)
//         console.log(urlArray);
//         for (var i = 0; i < urlArray.length; i++) {
//             url = url.replace(new RegExp('{' + urlArray[i] + '}', 'gi'), paramsArray[i]);
//           
//         }
//         console.log(url)
//         window.location.hash = url;
//     }
// }

export function goToState(stateName, params) {
    var stateObjA = stateObjArray.filter((x) => {
        return x.stateName === stateName;
    });
    if (stateObjA.length === 0) {
        console.log('error occur no such a state exist');
    } else {
        var url = stateObjA[0].url;
        console.log(params);
        var pattern = /([^{]*?)\w(?=\})/gmi;
        var urlArray = url.match(pattern);

        for (let i = 0; i < urlArray.length; i++) {
            if (params.hasOwnProperty(urlArray[i])) {
                console.log('object has properties');
            } else {
                throw Error;
            }
        }
    }

    for (let i = 0; i < urlArray.length; i++) {
        url = url.replace(new RegExp('{' + urlArray[i] + '}', 'gi'), params[urlArray[i]]);
    }
    window.location.hash = url;

}

// function listen1(){
//     let currentState=getCurrentState1();
//         goToState(currentState.Name)

// }
// setTimeout(listen1,200)

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
    setTimeout(listen, 20);

}