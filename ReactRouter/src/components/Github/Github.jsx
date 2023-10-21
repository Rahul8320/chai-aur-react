// import { useState, useEffect } from "react";

import { useLoaderData } from "react-router-dom";

const Github = () => {
  //   const [data, setData] = useState([]);

  //   useEffect(() => {
  //     fetch("https://api.github.com/users/Rahul8320")
  //       .then((res) => res.json())
  //       .then((data) => setData(data));

  //     console.log(data);
  //   }, []);

  const data = useLoaderData();

  return (
    <div className="max-w-4xl flex gap-2 mx-auto my-20 rounded-xl p-5 bg-slate-500">
      <div className="w-1/2">
        <img
          className="rounded-full object-cover"
          src={data.avatar_url}
          alt="Github profile"
          width={300}
        />
      </div>
      <div className="w-1/2 text-xl text-white">
        <h2 className="text-2xl text-orange-600 mb-5">{data.bio}</h2>
        <p className="my-2">Github Followers: {data?.followers}</p>
        <p>Github Repository: {data?.public_repos}</p>
      </div>
    </div>
  );
};

export default Github;

export const GithubDataLoader = async () => {
  const response = await fetch(`https://api.github.com/users/Rahul8320`);
  return response.json();
};
