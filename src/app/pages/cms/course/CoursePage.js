import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useParams } from "react-router-dom";
import { ROUTES } from "../../../router/Routes";
import CourseList from "./CourseList";
import { setOrgById } from "../../../store/cms/org/actions";
import { CircularProgress, Box } from '@material-ui/core';
import QuizList from "./QuizList";
import QuestionList from "./QuestionList";

export default function CoursePage() {
  const { orgId } = useParams();
  const { org, orgs } = useSelector(({ cms }) => ({
    org: cms.org.org,
    orgs: cms.org.orgs
  }))
  const dispatch = useDispatch();

  useEffect(() => {
    if (orgId !== undefined && orgs.length > 0) {
      dispatch(setOrgById(orgId));
    }
  }, [orgId, orgs, dispatch]);

  if (org == null) {
    return (<Box display="flex" flexDirection="column" alignItems="center">
      <CircularProgress />
    </Box>);
  }
  return (
    <Switch>
      <Route path={`${ROUTES.cms.question()}`} component={QuestionList} />
      <Route path={`${ROUTES.cms.quiz()}`} component={QuizList} />
      <Route path={`${ROUTES.cms.course()}`} component={CourseList} />
    </Switch>
  );
}
