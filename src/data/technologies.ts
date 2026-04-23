export type Technology = {
  id: string;
  name: string;
  category: string;
  icon: string;
};

export const technologies: Technology[] = [
  {
    id: "csharp",
    name: "C#",
    category: "Language",
    icon: "/images/icons/tech/csharp.webp",
  },
  {
    id: "aspnet",
    name: "ASP.NET Core",
    category: "Framework",
    icon: "/images/icons/tech/aspnet.webp",
  },
  {
    id: "python",
    name: "Python",
    category: "Language",
    icon: "/images/icons/tech/python.webp",
  },
  {
    id: "docker",
    name: "Docker",
    category: "Platform",
    icon: "/images/icons/tech/docker.webp",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Database",
    icon: "/images/icons/tech/postgresql.webp",
  },
  {
    id: "sqlserver",
    name: "SQL Server",
    category: "Database",
    icon: "/images/icons/tech/sqlserver.webp",
  },
  {
    id: "aws",
    name: "AWS",
    category: "Cloud",
    icon: "/images/icons/tech/aws.webp",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    category: "Brand",
    icon: "/images/icons/tech/microsoft.webp",
  },
];
