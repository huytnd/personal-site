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
    icon: "/images/icons/tech/csharp.png",
  },
  {
    id: "aspnet",
    name: "ASP.NET Core",
    category: "Framework",
    icon: "/images/icons/tech/aspnet.png",
  },
  {
    id: "python",
    name: "Python",
    category: "Language",
    icon: "/images/icons/tech/python.png",
  },
  {
    id: "docker",
    name: "Docker",
    category: "Platform",
    icon: "/images/icons/tech/docker.png",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Database",
    icon: "/images/icons/tech/postgresql.png",
  },
  {
    id: "sqlserver",
    name: "SQL Server",
    category: "Database",
    icon: "/images/icons/tech/sqlserver.png",
  },
  {
    id: "aws",
    name: "AWS",
    category: "Cloud",
    icon: "/images/icons/tech/aws.png",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    category: "Brand",
    icon: "/images/icons/tech/microsoft.png",
  },
];
