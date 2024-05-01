import React from "react";
import { Typography, StepLabel, Step, Stepper } from "@mui/material";
import { MdLocalShipping } from "react-icons/md";
import { RiBankFill } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
import "./activeSteps.css";

export const ActiveSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <MdLocalShipping />,
    },
    {
      label: <Typography>Order Summary</Typography>,
      icon: <GiConfirmed />,
    },
    {
        label: <Typography>Payment </Typography>,
        icon: <RiBankFill />,
      },
  ];

  const stepStyle = {
    boxSizing:"border-box"
  };

  return (
    <>
       <Stepper alternativeLabel activeStep={activeStep} style={stepStyle} >
        {steps.map((item, index)=>(
            <Step key={index}
                    active={activeStep===index ? true : false}
                    completed={activeStep>=index ? true: false}
            >
                <StepLabel style={{color : activeStep>=index&& "green"}} icon={item.icon}>{item.label}</StepLabel>
            </Step>
        ))}
       </Stepper>
    </>
  )
};
