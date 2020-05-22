export const ROUTES = {
  dashboard: "/",
  blogs: "/blogs",
  blogCategories: "/blogs/danh-muc",
  auth: "/auth",
  error: "/error",
  logout: "/logout"
};

export const NAV_ITEMS = [
  {
    title: "Trang chủ",
    link: ROUTES.dashboard
  },
  {
    title: "Blogs",
    link: ROUTES.blogs,
    children: [
      {
        title: "Danh sách blogs",
        link: ROUTES.blogs
      },
      {
        title: "Danh mục",
        link: ROUTES.blogCategories
      }
    ]
  }
]