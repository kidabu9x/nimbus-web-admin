const buildCmsCourseLink = (orgId) => {
  if (orgId == null) {
    orgId = ":orgId";
  }
  return "/org/" + orgId + "/course";
}

const buildCmsCourseCodeLink = (orgId, courseId) => {
  if (courseId == null) {
    courseId = ":courseId";
  }
  return buildCmsCourseLink(orgId) + "/" + courseId + "/code";
}

const buildCmsQuizLink = (orgId, courseId) => {
  if (courseId == null) {
    courseId = ":courseId";
  }
  return buildCmsCourseLink(orgId) + "/" + courseId + "/quiz";
}

const buildCmsQuestionLink = (orgId, courseId, quizId) => {
  if (quizId == null) {
    quizId = ":quizId";
  }
  return buildCmsQuizLink(orgId, courseId) + "/" + quizId + "/question";
};

export const ROUTES = {
  dashboard: "/",
  blogs: "/blogs",
  blogCategories: "/blogs/danh-muc",
  onlineCourses: "/khoa-hoc/online",
  offlineCourses: "/khoa-hoc/offline",
  settings: "/cai-dat",
  auth: "/dang-nhap",
  logout: "/logout",
  cms: {
    org: "/org",
    course: buildCmsCourseLink,
    quiz: buildCmsQuizLink,
    question: buildCmsQuestionLink,
    courseCode: buildCmsCourseCodeLink
  }
};

export const NAV_ITEMS = [
  {
    title: "Trang chủ",
    description: "",
    link: ROUTES.dashboard,
    disable: false,
    ignoreInPanel: true
  },
  {
    title: "Blogs",
    link: ROUTES.blogs,
    description: "Quản lí blogs, danh mục, ...",
    children: [
      {
        title: "Danh sách blogs",
        link: ROUTES.blogs
      },
      {
        title: "Danh mục",
        link: ROUTES.blogCategories
      }
    ],
    disable: false,
    ignoreInPanel: false
  },
  {
    title: "Khóa học Online",
    description: "Quản lý khóa học online",
    link: ROUTES.onlineCourses,
    disable: true,
    ignoreInPanel: false
  },
  {
    title: "Khóa học Offline",
    description: "Quản lý khóa học offline",
    link: ROUTES.offlineCourses,
    disable: true,
    ignoreInPanel: false
  },
  {
    title: "Cài đặt",
    description: "Thiết lập cài đặt trong hệ thống",
    link: ROUTES.settings,
    disable: true,
    ignoreInPanel: false
  }
]