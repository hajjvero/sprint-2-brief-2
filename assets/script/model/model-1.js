import {loadResume, resumeObjet} from "../helper/resume-helper.js";

function fillHeader() {
    const jobTitle = document.getElementById("jobTitle");
    const fullName = document.getElementById("fullName");
    const profilePhoto = document.getElementById("profilePhoto");

    if (resumeObjet.professional.jobTitle) {
        jobTitle.innerText = resumeObjet.professional.jobTitle;
    }

    if (resumeObjet.personal.fullName && resumeObjet.personal.lastName) {
        fullName.innerText = `${resumeObjet.personal.fullName} ${resumeObjet.personal.lastName}`;
    } else if (resumeObjet.personal.fullName) {
        fullName.innerText = resumeObjet.personal.fullName;
    }

    // Handle photo display
    if (resumeObjet.personal.photo) {
        profilePhoto.src = resumeObjet.personal.photo;
        profilePhoto.style.display = "block";
    } else {
        // If no photo, hide the photo container
        profilePhoto.parentElement.style.display = "none";
        // Adjust header layout to single column when no photo
        const header = document.getElementById("cv-header");
        header.style.flexDirection = "column";
        header.style.textAlign = "center";
    }

    const contactInfo = document.getElementById("contactInfo");
    const items = [];

    if (resumeObjet.personal.email) items.push(`<span><a href="mailto:${resumeObjet.personal.email}" target="_blank">${resumeObjet.personal.email}</a></span>`);
    if (resumeObjet.personal.phone) items.push(`<span><a href="tel:${resumeObjet.personal.phone}" target="_blank">${resumeObjet.personal.phone}</a></span>`);
    if (resumeObjet.personal.address) items.push(`<span>${resumeObjet.personal.address}</span>`);
    if (resumeObjet.personal.portfolio) items.push(`<span><a href="${resumeObjet.personal.portfolio}" target="_blank">Portfolio</a></span>`);
    if (resumeObjet.personal.github) items.push(`<span><a href="${resumeObjet.personal.github}" target="_blank">GitHub</a></span>`);
    if (resumeObjet.personal.linkedin) items.push(`<span><a href="${resumeObjet.personal.linkedin}" target="_blank">LinkedIn</a></span>`);

    if (items.length > 0) {
        contactInfo.innerHTML = items.join('');
    }
}

function fillSummary() {
    const summarySection = document.querySelector('.summary');
    if (resumeObjet.professional.profileSummary) {
        summarySection.innerHTML = `
            <h2>Summary</h2>
            ${resumeObjet.professional.profileSummary}
        `;
    }
}

function fillExperience() {
    const experienceSection = document.querySelector('.work-experience');
    if (resumeObjet.experience && resumeObjet.experience.length > 0) {
        let experienceHTML = '<h2>Work Experience</h2>';
        
        resumeObjet.experience.forEach(exp => {
            const startDate = exp.startDate ? formatDate(exp.startDate) : '';
            const endDate = exp.endDate ? formatDate(exp.endDate) : 'Present';
            const dateRange = startDate && endDate ? `${startDate} - ${endDate}` : '';
            
            experienceHTML += `
                <div class="job">
                    <div class="job-header">
                        <span class="job-title">${exp.position || ''}</span>
                        <span class="job-date">${dateRange}</span>
                    </div>
                    <div class="job-description">
                        ${exp.company ? `<p><strong>${exp.company}</strong></p>` : ''}
                        ${exp.description || ''}
                    </div>
                </div>
            `;
        });
        
        experienceSection.innerHTML = experienceHTML;
    }
}

function fillProjects() {
    const projectsSection = document.querySelector('.projects');
    if (resumeObjet.projects && resumeObjet.projects.length > 0) {
        let projectsHTML = '<h2>Projects</h2>';
        
        resumeObjet.projects.forEach(project => {
            projectsHTML += `
                <div class="project">
                    <div class="project-header">
                        <span class="project-title">${project.name || ''}</span>
                        ${project.link ? `<span class="project-link"><a href="${project.link}" target="_blank">Link to Demo</a></span>` : ''}
                    </div>
                    <div class="project-description">
                        ${project.date ? `<p><strong>${formatDate(project.date)}</strong></p>` : ''}
                        ${project.description || ''}
                    </div>
                </div>
            `;
        });
        
        projectsSection.innerHTML = projectsHTML;
    }
}

function fillEducation() {
    const educationSection = document.querySelector('.education');
    if (resumeObjet.education && resumeObjet.education.length > 0) {
        let educationHTML = '<h2>Education</h2>';
        
        resumeObjet.education.forEach(edu => {
            const startYear = edu.startYear || '';
            const endYear = edu.endYear || '';
            const yearRange = startYear && endYear ? `${startYear} - ${endYear}` : (startYear || endYear || '');
            
            educationHTML += `
                <div class="education-item">
                    <span class="education-year">${yearRange}</span>
                    <span class="education-details">
                        ${edu.degree ? `${edu.degree}${edu.institution ? ' at ' + edu.institution : ''}` : (edu.institution || '')}
                        ${edu.city ? `, ${edu.city}` : ''}
                    </span>
                </div>
            `;
        });
        
        educationSection.innerHTML = educationHTML;
    }
}

function fillPublications() {
    const publicationsSection = document.querySelector('.publications');
    if (resumeObjet.certifications && resumeObjet.certifications.length > 0) {
        let publicationsHTML = '<h2>Certifications</h2>'; // Changed section title to better reflect content
        
        resumeObjet.certifications.forEach(cert => {
            publicationsHTML += `
                <div class="publication">
                    <p><strong>${cert.name || ''}</strong> - ${cert.organization || ''}
                    ${cert.date ? `<br/>${formatDate(cert.date)}` : ''}
                    ${cert.link ? `<br/><a href="${cert.link}" target="_blank">${cert.link}</a>` : ''}</p>
                </div>
            `;
        });
        
        publicationsSection.innerHTML = publicationsHTML;
    }
}

function fillSkills() {
    const skillsSection = document.querySelector('.skills');
    if ((resumeObjet.skills.hard && resumeObjet.skills.hard.length > 0) || 
        (resumeObjet.skills.soft && resumeObjet.skills.soft.length > 0) ||
        (resumeObjet.languages && resumeObjet.languages.length > 0)) {
        let skillsHTML = '<h2>Skills</h2>';
        
        if (resumeObjet.skills.hard && resumeObjet.skills.hard.length > 0) {
            skillsHTML += `
                <div class="skills-item">
                    <span class="skill-category">Technical Skills:</span>
                    <span class="skill-list"> ${resumeObjet.skills.hard.join(', ')}</span>
                </div>
            `;
        }
        
        if (resumeObjet.skills.soft && resumeObjet.skills.soft.length > 0) {
            skillsHTML += `
                <div class="skills-item">
                    <span class="skill-category">Soft Skills:</span>
                    <span class="skill-list"> ${resumeObjet.skills.soft.join(', ')}</span>
                </div>
            `;
        }
        
        if (resumeObjet.languages && resumeObjet.languages.length > 0) {
            const languages = resumeObjet.languages.map(lang => `${lang.name} (${lang.level})`).join(', ');
            skillsHTML += `
                <div class="skills-item">
                    <span class="skill-category">Languages:</span>
                    <span class="skill-list"> ${languages}</span>
                </div>
            `;
        }
        
        skillsSection.innerHTML = skillsHTML;
    }
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
    });
}

function initCV() {
    loadResume();

    fillHeader();
    fillSummary();
    fillExperience();
    fillProjects();
    fillEducation();
    fillPublications();
    fillSkills();

    // click to dowload
    const downloadPdf = document.getElementById("downloadPdf");

    downloadPdf.addEventListener("click", async () => {
        const element = document.getElementsByClassName('container')[0];

        // create canvas of contaner cv
        const canvas = await html2canvas(element, {
            scale: 2, // Higher quality
            useCORS: true,
            logging: false
        });

        const { jsPDF } = window.jspdf;

        // Create a new jsPDF instance
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: 'a4'
        });

        const pageWidth = pdf.internal.pageSize.getWidth(); // get with of page A4
        const pageHeight = pdf.internal.pageSize.getHeight(); // get height of page A4

        // Convert canvas to image data
        const imgData = canvas.toDataURL('image/png');

        // Calculate dimensions of image
        let imgHeight = (canvas.height * pageWidth) / canvas.width;
        let position = 0;
        let heightLeft = imgHeight;


        // add first page
        pdf.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add extra pages if needed (multi pages)
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // Open PDF in a new blank tab
        const pdfBlob = pdf.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank');
    });
}

initCV();