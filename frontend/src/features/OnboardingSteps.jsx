import { useState } from "react";
import BasicDetails from "../forms/jobSeeker/BasicDetails";
import Experience from "../forms/jobSeeker/Experience";
import Resume from "../forms/jobSeeker/Resume";
import Education from "../forms/jobSeeker/Education";
import Stepper from "../components/Stepper";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const steps = [
    { id: 1, label: "Basic Details" },
    { id: 2, label: "Education" },
    { id: 3, label: "Experience" },
    { id: 4, label: "Resume" },
];

const OnboardingSteps = () => {
    const [activeStep, setActiveStep] = useState(1);
    // const { user_id } = useSelector(state => state.userInfo)
const user_id='12456'
    const handleStepChange = (step) => {
        // If basic details not completed, block other steps
        if (!user_id && step !== 1) {
            toast.error("Please complete Basic Details first");
            return;
        }

        setActiveStep(step);
    };  

    return (
        <div>
            <Stepper
                steps={steps}
                activeStep={activeStep}
                setActiveStep={handleStepChange}
                isBasicCompleted={!!user_id}
            />

            <div className="bg-white p-6 rounded-lg shadow">
                {activeStep === 1 && <BasicDetails setActiveStep={setActiveStep} />}
                {activeStep === 2 && <Education setActiveStep={setActiveStep} />}
                {activeStep === 3 && <Experience setActiveStep={setActiveStep} />}
                {activeStep === 4 && <Resume setActiveStep={setActiveStep} />}
            </div>

            <Toaster />
        </div>
    );
};

export default OnboardingSteps;
