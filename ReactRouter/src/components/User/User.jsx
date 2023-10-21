import { useParams } from "react-router-dom";

const User = () => {
  const { userId } = useParams();
  return (
    <div className="w-1/3 mx-auto my-20 rounded-xl p-5 text-2xl text-white text-center bg-slate-500">
      User: {userId}
    </div>
  );
};

export default User;
