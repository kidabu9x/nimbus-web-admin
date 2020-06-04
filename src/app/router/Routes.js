export const ROUTES = {
  dashboard: "/",
  blogs: "/blogs",
  blogCategories: "/blogs/danh-muc",
  onlineCourses: "/khoa-hoc/online",
  offlineCourses: "/khoa-hoc/offline",
  settings: "/cai-dat",
  auth: "/auth",
  error: "/error",
  logout: "/logout"
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