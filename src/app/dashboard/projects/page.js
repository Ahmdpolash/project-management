"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const ProjectsOverviewPage = () => {
  const [projectss, setProject] = useState([]);

  const url = "https://6630e1d3c92f351c03db7082.mockapi.io/api/v1/projects";

  const fetchProjects = async () => {
    const response = await fetch(url);

    return response.json();
  };
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  //   if (isLoading) return <div>Loading...</div>;
  //   if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Projects Overview</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <button onClick={() => handleViewProject(project.id)}>View</button>
            <button onClick={() => handleEditProject(project.id)}>Edit</button>
            <button onClick={() => handleDeleteProject(project.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsOverviewPage;
