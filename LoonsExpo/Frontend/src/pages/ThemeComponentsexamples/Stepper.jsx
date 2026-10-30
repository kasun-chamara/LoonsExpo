import { Stepper } from "components";
import React from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';

function App() {
    const [activeStep, setActiveStep] = React.useState(1);
    const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];
    const icons = [<SettingsIcon />, <GroupAddIcon />, <VideoLabelIcon />];

    const handleStepClick = (step) => {
        setActiveStep(step);
        // Add your click logic here
    };

    return <div>
        <Stepper steps={steps} icons={icons} activeStep={activeStep} onClick={handleStepClick} />
    </div>



}

export default App;
