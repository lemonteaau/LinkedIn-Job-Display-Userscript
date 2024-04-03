// ==UserScript==
// @name         LinkedIn Job Display
// @namespace    https://github.com/lemonteaau/LinkedIn-Job-Display-Userscript
// @version      0.1
// @description  Display company name, job title, post date, applicant number, location and seniority in a floating window on LinkedIn jobs page
// @author       lemontea
// @match        https://www.linkedin.com/jobs/*
// ==/UserScript==



(function() {
    'use strict';

    function createFloatingWindow() {
        const floatWindow = document.createElement('div');
        floatWindow.style.position = 'fixed';
        floatWindow.style.bottom = '20px';
        floatWindow.style.right = '20px';
        floatWindow.style.padding = '10px';
        floatWindow.style.backgroundColor = 'white';
        floatWindow.style.border = '1px solid #ddd';
        floatWindow.style.borderRadius = '4px';
        floatWindow.style.boxShadow = '0 2px 4px rgba(0,0,0,.2)';
        floatWindow.style.zIndex = '1000';
        floatWindow.style.maxHeight = '500px';
        floatWindow.style.overflowY = 'scroll';
        document.body.appendChild(floatWindow);
        return floatWindow;
    }

    function extractJobDetails() {
        const jobTitle = document.querySelector(".job-details-jobs-unified-top-card__job-title-link")?.textContent.trim();
        const companyName = document.querySelector(".job-details-jobs-unified-top-card__primary-description-container a.app-aware-link")?.textContent.trim();
        const postDate = document.querySelector(".job-details-jobs-unified-top-card__primary-description-container .tvm__text--neutral span")?.textContent.trim();
        const applicantNumber = document.querySelectorAll(".job-details-jobs-unified-top-card__primary-description-container .tvm__text--neutral")[2]?.textContent.trim();
        const location = document.querySelector(".job-details-jobs-unified-top-card__primary-description-container")?.textContent.split("·")[1]?.trim();
        const seniorityElement = document.querySelectorAll(".job-details-jobs-unified-top-card__job-insight-view-model-secondary");
        const seniority = seniorityElement.length > 1 ? seniorityElement[1].textContent.trim() : null;
        // Updated part for extracting job description

        return { jobTitle, companyName, postDate, applicantNumber, location, seniority };
    }

    function updateFloatingWindow(floatWindow) {
        const { jobTitle, companyName, postDate, applicantNumber, location, seniority } = extractJobDetails();

        // Clear the existing content
        floatWindow.innerHTML = '';

        // Function to create a copy button
        function createCopyButton(textToCopy) {
            const button = document.createElement('button');
            button.textContent = 'Copy';
            button.style.marginLeft = '10px';
            button.style.color = '#FF1100';
            button.onclick = function() {
                navigator.clipboard.writeText(textToCopy).catch(err => {
                    console.error('Error copying text: ', err);
                });
            };
            return button;
        }

        if (companyName) {
            const companyDiv = document.createElement('div');
            companyDiv.innerHTML = `<strong>Company name:</strong> ${companyName}`;
            companyDiv.appendChild(createCopyButton(companyName));
            floatWindow.appendChild(companyDiv);
        }

        if (jobTitle) {
            const titleDiv = document.createElement('div');
            titleDiv.innerHTML = `<strong>Job Title:</strong> ${jobTitle}`;
            titleDiv.appendChild(createCopyButton(jobTitle));
            floatWindow.appendChild(titleDiv);
        }

        if (seniority) {
            const titleDiv = document.createElement('div');
            titleDiv.innerHTML = `<strong>Seniority:</strong> ${seniority}`;
            titleDiv.appendChild(createCopyButton(seniority));
            floatWindow.appendChild(titleDiv);
        }

        if (location) {
            const titleDiv = document.createElement('div');
            titleDiv.innerHTML = `<strong>Location:</strong> ${location}`;
            titleDiv.appendChild(createCopyButton(location));
            floatWindow.appendChild(titleDiv);
        }

        if (postDate) {
            const titleDiv = document.createElement('div');
            titleDiv.innerHTML = `<strong>Post Date:</strong> ${postDate}`;
            titleDiv.appendChild(createCopyButton(postDate));
            floatWindow.appendChild(titleDiv);
        }

        if (applicantNumber) {
            const titleDiv = document.createElement('div');
            titleDiv.innerHTML = `<strong>Applicant Number:</strong> ${applicantNumber}`;
            titleDiv.appendChild(createCopyButton(applicantNumber));
            floatWindow.appendChild(titleDiv);
        }

        if (!floatWindow.hasChildNodes()) {
            floatWindow.textContent = "Job details not found";
        }
    }

    const floatWindow = createFloatingWindow();

    setInterval(function() {
        updateFloatingWindow(floatWindow);
    }, 3000);
})();
