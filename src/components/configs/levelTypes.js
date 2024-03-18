import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

// const choices = ["interval", "note", "chord", "melody"]
const TRAIN_CHOICES = ["interval", "note", "chord"]
const levels = ["Easy", "Medium", "Hard", "Extreme", "Custom"]

// generate subnav item object 
export function upFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const generateSubNavFrom = (closeSideBarFunc, choices = TRAIN_CHOICES) => {
    return choices.map((choice, index) => {
        return {
            key: choice,
            path: choice,
            // icon: React.createElement(icon), 
            label: upFirst(choice),
            onClick: (e) => closeSideBarFunc(e, choice)
            // children: levels.map((level, j) => {
            //     const subKey = index * 4 + j + 1;
            //     return {
            //         key: `${level + subKey}`,
            //         label: <Link to={level}>{upFirst(level)}</Link>,
            //     };
            // }),
        }
    })
}
