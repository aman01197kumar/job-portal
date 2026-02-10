const Stepper = ({ steps, activeStep, setActiveStep }) => {
    return (
        <div className="mx-4 mt-4">
            <h2 className="sr-only">Steps</h2>

            <ol className="grid grid-cols-1 overflow-hidden rounded-lg border border-gray-300 text-sm sm:grid-cols-4">
                {steps.map((step, index) => {
                    const isActive = activeStep === step.id;
                    const isCompleted = activeStep > step.id;

                    return (
                        <li
                            key={step.id}
                            onClick={() => setActiveStep(step.id)}
                            className={`relative flex cursor-pointer items-center gap-3 px-6 py-4 transition
                ${isActive ? "bg-slate-900 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}
                ${index !== steps.length - 1 ? "border-r border-gray-300" : ""}
              `}
                        >
                            {/* diamond connector */}
                            {index !== 0 && (
                                <span
                                    className={`absolute left-0 top-1/2 z-10 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45
                    ${isActive || isCompleted ? "bg-slate-900" : "bg-white"}
                    border border-gray-300 sm:block`}
                                />
                            )}

                            {/* icon */}
                            <div
                                className={`shrink-0 ${isCompleted
                                        ? "text-green-400"
                                        : isActive
                                            ? "text-white"
                                            : "text-gray-400"
                                    }`}
                            >
                                {step.icon}
                            </div>

                            {/* text */}
                            <div className="leading-tight">
                                <p className="font-medium">{step.label}</p>
                                <p
                                    className={`text-xs ${isActive ? "text-gray-200" : "text-gray-500"
                                        }`}
                                >
                                    {step.description}
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
};

export default Stepper;
