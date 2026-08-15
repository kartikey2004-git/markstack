export interface NavLink {
  title: string;
  url: string;
  public?: boolean; // Whether this link should be shown in public navbar
}

export interface NavGroup {
  title: string;
  items: NavLink[];
}

export const NAVIGATION_CONFIG: NavGroup[] = [
  {
    title: "Productivity",
    items: [
      {
        title: "Home",
        url: "/",
        public: true,
      },
      {
        title: "All Blogs",
        url: "/blogs",
        public: true,
      },
    ],
  },
  {
    title: "Workspace",
    items: [
      {
        title: "Canvases",
        url: "/canvases",
        public: true,
      },
      {
        title: "My Blogs",
        url: "/dashboard/blogs",
        public: true,
      },
    ],
  },
];

