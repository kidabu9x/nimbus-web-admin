export default class mockBlog {
  mockAllBlogs = () => {
    return {
      data: {
        data: [
          {
            id: "string",
            title: "string",
            contents: [
              {
                id: 99,
                content: "string",
                type: "string" // HTML
              }
            ],
            tags: ["string"],
            status: "string", // DELETED, PUBLISHED, DISABLED
            created_at: "string",
            updated_at: "string",
            authors: [
              {
                id: "string",
                email: "string",
                first_name: "string",
                last_name: "string",
                avatar: "string"
              },
              {
                id: "string",
                email: "string",
                first_name: "string",
                last_name: "string",
                avatar: "string"
              }
            ]
          },
          {
            id: "string",
            title: "string",
            contents: [
              {
                id: 99,
                content: "string",
                type: "string" // HTML
              }
            ],
            tags: ["string"],
            status: "string", // DELETED, PUBLISHED, DISABLED
            created_at: "string",
            updated_at: "string",
            authors: [
              {
                id: "string",
                email: "string",
                first_name: "string",
                last_name: "string",
                avatar: "string"
              },
              {
                id: "string",
                email: "string",
                first_name: "string",
                last_name: "string",
                avatar: "string"
              }
            ]
          }
        ],
        meta: {
          code: 200,
          offset: 0,
          limit: 10,
          total: 20
        }
      }
    };
  };
}
