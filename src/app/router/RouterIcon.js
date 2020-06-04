import React from "react";
import SubjectIcon from '@material-ui/icons/Subject';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import AirplayIcon from '@material-ui/icons/Airplay';
import PeopleIcon from '@material-ui/icons/People';
import { ROUTES } from "./Routes";

export default function Icon({ link }) {
    switch (link) {
        case ROUTES.dashboard:
            return <HomeIcon />
        case ROUTES.blogs:
            return <SubjectIcon />
        case ROUTES.settings:
            return <SettingsIcon />
        case ROUTES.onlineCourses:
            return <AirplayIcon />
        case ROUTES.offlineCourses:
            return <PeopleIcon />
        default:
            return null;
    }
}