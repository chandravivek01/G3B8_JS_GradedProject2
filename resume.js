// Fetching the JSON data into Javascript Object
import dataset from './Data.json' assert {type: 'json'};
let { resume: originalData } = dataset;
let data = originalData;

// DOM (Menu Bar)
const previous = document.getElementById('previous');
const search = document.getElementById('search');
const next = document.getElementById('next');
// DOM (Menu Bar) mobile-view
const previousMobile = document.getElementById('mobile-previous');
const searchMobile = document.getElementById('mobile-search');
const nextMobile = document.getElementById('mobile-next');

const noSearchResult = document.getElementById('no-search-result');
const resultSearched = document.getElementById('resultList');
const intro = document.getElementById('id');


// DOM (Aside Section)
const infoList = document.getElementById('info-list');
const skillList = document.getElementById('skill-list');
const hobbyList = document.getElementById('hobby-list');
// DOM (Aside Section) mobile-view
const infoListMobile = document.getElementById('mobile-info-list');
const skillListMobile = document.getElementById('mobile-skill-list');
const hobbyListMobile = document.getElementById('mobile-hobby-list');

// DOM (Work)
const workList = document.getElementById('work');
// DOM (Work) mobile-view
const workListMobile = document.getElementById('mobile-work');

// DOM (Projects)
const projectList = document.getElementById('project-bold');
const projectList2 = document.getElementById('project-description');
// DOM (Projects) mobile-view
const projectListMobile = document.getElementById('mobile-project-bold');
const projectList2Mobile = document.getElementById('mobile-project-description');


// DOM (Education)
const educationList = document.getElementById('education');
// DOM (Education) mobile-view
const educationListMobile = document.getElementById('mobile-education');

// DOM (Internship)
const internshipList = document.getElementById('internship');
// DOM (Internship) mobile-view
const internshipListMobile = document.getElementById('mobile-internship');

// DOM (Achievements)
const achieve = document.getElementById('achievements');
// DOM (Achievements) mobile-view
const achieveMobile = document.getElementById('mobile-achievements');

// DOM (Resume Header)
const employeeName = document.getElementById('employee-name');
const appliedFor = document.getElementById('applied-for');

// Index of the Employee-Array-Record
let employeeIndex = 0;
let searched = false;

window.onbeforeunload = function (event) {

    // Display the confirmation dialog
    const confirmationMessage = 'Are you sure you want to leave?';
    return confirmationMessage;
};

function searchItems() {

    searched = true;
    const searchTerm = document.getElementById('search').value.toLowerCase();

    if (window.innerWidth > 1000) {
        const searchTerm = search.value.toLowerCase();
        let filteredData = data.filter(itemObject => itemObject.basics.AppliedFor.toLowerCase().includes(searchTerm));

        if (searchTerm.length === 0) {

            data = originalData;
            filteredData = data;
            employeeIndex = 0;
        }
        loadResumeWithSearch(filteredData);
    }
    else {
        const searchTerm = searchMobile.value.toLowerCase();
        let filteredData = data.filter(itemObject => itemObject.basics.AppliedFor.toLowerCase().includes(searchTerm));

        if (searchTerm.length === 0) {

            data = originalData;
            filteredData = data;
            employeeIndex = 0;
        }
        loadResumeWithSearch(filteredData);
    }
}

function loadResumeWithSearch(filteredData) {

    // When there no results associated with the search
    if (filteredData.length === 0) {

        resultSearched.style.display = 'none';
        noSearchResult.style.display = 'block';

        if (window.innerWidth > 1000) {
            previous.style.display = 'none';
            next.style.display = 'none';
        }
        else {
            previousMobile.style.display = 'none';
            nextMobile.style.display = 'none';
        }

    }

    // Hiding Previous and Next Buttons
    else if (filteredData.length === 1) {

        resultSearched.style.display = 'block';
        noSearchResult.style.display = 'none';

        if (window.innerWidth > 1000) {
            previous.style.display = 'none';
            next.style.display = 'none';
        }
        else {
            previousMobile.style.display = 'none';
            nextMobile.style.display = 'none';
        }

        loadResume(filteredData);
    }

    else {

        resultSearched.style.display = 'block';
        noSearchResult.style.display = 'none';
        toggleButtons();
        loadResume(filteredData);
    }
}

function toggleButtons() {

    if (window.innerWidth > 1000) {
        if (employeeIndex === 0)
            previous.style.display = 'none'; // Hide previous button if at the beginning
        else
            previous.style.display = 'block'; // Show previous button otherwise

        if (employeeIndex === data.length - 1)
            next.style.display = 'none'; // Hide next button if at the end
        else
            next.style.display = 'block'; // Show next button otherwise
    }
    else {
        if (employeeIndex === 0)
            previousMobile.style.display = 'none'; // Hide previous button if at the beginning
        else
            previousMobile.style.display = 'block'; // Show previous button otherwise

        if (employeeIndex === data.length - 1)
            nextMobile.style.display = 'none'; // Hide next button if at the end
        else
            nextMobile.style.display = 'block'; // Show next button otherwise
    }

}

function nextResume() {

    if (employeeIndex < data.length - 1) {

        employeeIndex++;
        toggleButtons();
        loadResume(data);
    }
}

function previousResume() {

    if (employeeIndex > 0) {

        employeeIndex--;
        toggleButtons();
        loadResume(data);
    }
}

function createList(entry) {

    let li = document.createElement('li');
    li.textContent = entry;
    return li;
}

// Creating Link (<a>) for 'network' in 'Personal Information
function createLink(entry) {

    let link = document.createElement('a');
    link.setAttribute("href", "#");
    link.textContent = entry;
    return link;
}

function createListHTML(entry) {

    let li = document.createElement('li');
    li.innerHTML = entry;
    return li;
}

function loadResume(searchedData) {

    if (searchedData === undefined)
        noSearchResult.style.display = 'none';

    if (searched)
        data = searchedData;

    // Employee Introduction Header
    employeeName.innerText = data[employeeIndex].basics.name;
    appliedFor.innerText = data[employeeIndex].basics.AppliedFor;

    // Personal information
    loadPersonalInfo();

    // Technical Skills
    loadTechnicalSkills();

    // Hobbies
    loadHobbies();

    // Work in a previous company
    loadWork();

    // Projects
    loadProject();

    // Education
    loadEducation();

    // Internship
    loadInternship();

    // Achievements
    loadAchievements();
}

function loadPersonalInfo() {

    // Destructuring the relevant Object
    let { phone, email } = data[employeeIndex].basics;
    let network = data[employeeIndex].basics.profiles.network;

    if (window.innerWidth < 650) {

        infoListMobile.innerHTML = '';
        infoListMobile.appendChild(createList(phone));
        infoListMobile.appendChild(createList(email));
        infoListMobile.appendChild(createLink(network));
        infoListMobile.style.listStyleType = 'none';
    }
    else {

        infoList.innerHTML = '';
        infoList.appendChild(createList(phone));
        infoList.appendChild(createList(email));
        infoList.appendChild(createLink(network));
        infoList.style.listStyleType = 'none';
    }
}

function loadTechnicalSkills() {

    let skillArray = data[employeeIndex].skills.keywords;

    if (window.innerWidth < 650) {
        skillListMobile.innerHTML = '';
        skillArray.forEach(element => skillListMobile.appendChild(createList(element)));
        skillListMobile.style.listStyleType = 'none';
    }
    else {
        skillList.innerHTML = '';
        skillArray.forEach(element => skillList.appendChild(createList(element)));
        skillList.style.listStyleType = 'none';
    }
}

function loadHobbies() {

    let hobbyArray = data[employeeIndex].interests.hobbies;

    if (window.innerWidth < 650) {
        hobbyListMobile.innerHTML = '';
        hobbyArray.forEach(element => hobbyListMobile.appendChild(createList(element)));
        hobbyListMobile.style.listStyleType = 'none';
    }
    else {
        hobbyList.innerHTML = '';
        hobbyArray.forEach(element => hobbyList.appendChild(createList(element)));
        hobbyList.style.listStyleType = 'none';
    }
}

function loadWork() {

    let workArray = Object.keys(data[employeeIndex].work);
    let list = [];
    workArray.forEach(item => {
        let value = data[employeeIndex].work[item];
        let lineLiteral = `${'<b>' + item + ': ' + '</b>'} ${value}`;
        list.push(lineLiteral);
    });

    if (window.innerWidth < 650) {
        workListMobile.innerHTML = '';
        list.forEach(element => workListMobile.appendChild(createListHTML(element)));
        workListMobile.style.listStyleType = 'none';
        workListMobile.style.padding = '20px';
    }
    else {
        workList.innerHTML = '';
        list.forEach(element => workList.appendChild(createListHTML(element)));
        workList.style.listStyleType = 'none';
        workList.style.padding = '20px';
    }
}

function loadProject() {

    // Destructuring the relevant Object
    let { name: projectName, description } = data[employeeIndex].projects;

    let projectLiteral = `${'<b>' + projectName + '</b>'}:  `;

    if (window.innerWidth < 650) {
        projectListMobile.innerHTML = projectLiteral;
        projectList2Mobile.innerHTML = description;
    }
    else {
        projectList.innerHTML = projectLiteral;
        projectList2.innerHTML = description;
    }
}

function loadEducation() {

    let educationArray = Object.keys(data[employeeIndex].education);
    let list = [];
    educationArray.forEach(item => {

        let lineCSV = '';
        let property = Object.keys(data[employeeIndex].education[item]);
        property.forEach(element => lineCSV += data[employeeIndex].education[item][element] + ', ');
        let line = lineCSV.substring(0, lineCSV.length - 2);
        let lineLiteral = `${'<b>' + item + ': ' + '</b>'} ${line}`;
        list.push(lineLiteral);
    });

    if (window.innerWidth < 650) {
        educationListMobile.innerHTML = '';
        list.forEach(element => educationListMobile.appendChild(createListHTML(element)));
        educationListMobile.style.padding = '20px';
    }
    else {
        educationList.innerHTML = '';
        list.forEach(element => educationList.appendChild(createListHTML(element)));
        educationList.style.padding = '20px';
    }
}

function loadInternship() {

    let internshipArray = Object.keys(data[employeeIndex].Internship);
    let list = [];
    internshipArray.forEach(item => {

        let value = data[employeeIndex].Internship[item];
        let lineLiteral = `${'<b>' + item + ': ' + '</b>'} ${value}`;
        list.push(lineLiteral);
    });

    if (window.innerWidth < 650) {
        internshipListMobile.innerHTML = '';
        list.forEach(element => internshipListMobile.appendChild(createListHTML(element)));
        internshipListMobile.style.padding = '20px';
    }
    else {
        internshipList.innerHTML = '';
        list.forEach(element => internshipList.appendChild(createListHTML(element)));
        internshipList.style.padding = '20px';
    }

}

function loadAchievements() {

    let { Summary: achievementSummary } = data[employeeIndex].achievements;

    if (window.innerWidth < 650) {
        achieveMobile.innerHTML = '';
        achievementSummary.forEach(element => achieveMobile.appendChild(createList(element)));
    }
    else {
        achieve.innerHTML = '';
        achievementSummary.forEach(element => achieve.appendChild(createList(element)));
    }
}

toggleButtons();

loadResume();

previous.addEventListener('click', previousResume);
search.addEventListener('keyup', searchItems);
next.addEventListener('click', nextResume);

// listening to events when device-width is less than '1000px'
previousMobile.addEventListener('click', previousResume);
searchMobile.addEventListener('keyup', searchItems);
nextMobile.addEventListener('click', nextResume);

// capturing window onloading and resizing events and accordingly adjusting buttons and display
window.onresize = window.onload = function () {
    toggleButtons();
    loadResume();
}
