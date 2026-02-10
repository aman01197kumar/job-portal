import { useState } from "react";
import BasicDetails from "../forms/jobSeeker/BasicDetails";
import Experience from "../forms/jobSeeker/Experience";
import Resume from "../forms/jobSeeker/Resume";
import Education from "../forms/jobSeeker/Education";
import Stepper from "../components/Stepper";

const steps = [
    { id: 1, label: "Basic Details" },
    { id: 2, label: "Education" },
    { id: 3, label: "Experience" },
    { id: 4, label: "Resume" },
];

const OnboardingSteps = () => {
    const [activeStep, setActiveStep] = useState(1);
    console.log(activeStep,'ac')        

    return (
        <div>
            <Stepper
                steps={steps}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
            />

            {/* Step Content */}
            <div className="bg-white p-6 rounded-lg shadow">
                {activeStep === 1 && <BasicDetails setActiveStep = {setActiveStep}/>}
                {activeStep === 2 && <Education setActiveStep = {setActiveStep}/>}
                {activeStep === 3 && <Experience setActiveStep = {setActiveStep}/>}
                {activeStep === 4 && <Resume setActiveStep = {setActiveStep}/>}
            </div>
        </div>
    );
};

export default OnboardingSteps;
