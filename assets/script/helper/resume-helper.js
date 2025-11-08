// Resume object to store all data
export let resumeObjet = {
    personal: {
        photo: null,
        fullName: null,
        lastName: null,
        email: null,
        phone: null,
        address: null,
        nationality: null,
        status: null,
        portfolio: null,
        github: null,
        linkedin: null,
    },
    professional: {
        jobTitle: null,
        profileSummary: null
    },
    skills: {
        hard: [],
        soft: []
    },
    languages: [],
    education: [],
    experience: [],
    projects: [],
    hobbies: [],
    certifications: []
}

export const saveResume = () => {
    localStorage.setItem("resume", JSON.stringify(resumeObjet));
};

export const loadResume = () => {
    const resume = JSON.parse(localStorage.getItem("resume"));
    if (resume) {
        resumeObjet = resume;
    }
};