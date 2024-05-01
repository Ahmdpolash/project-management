"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Details = ({ params }) => {
  const [data, setData] = useState([]);

  let url = "https://6630e1d3c92f351c03db7082.mockapi.io/api/v1/projects";

  const fetchProjects = async () => {
    const response = await fetch(url);

    return response.json();
  };
  const {
    data: projects,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  console.log(projects);

  useEffect(() => {
    const filter = projects?.find((project) => project?.id == params?.id);

    setData(filter);
  }, [projects]);

  console.log(data);

  return <div>projecct id is {params.id}</div>;
};

export default Details;
