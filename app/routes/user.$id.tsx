import { redirect, type MetaFunction } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { findUser, type User } from "users";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Hareesh's Remix!" },
  ];
};

export const loader = ({ params }: { params: { id: string } }) => {
  const user = findUser(params.id);
  console.log(user, "user");

  if (!user) {
    return redirect("/");
  }

  return new Response(JSON.stringify(user), {
    headers: { "Content-Type": "application/json" },
  });
};

export default function User() {
  const user = useLoaderData<User>();
  const navigate = useNavigate();

  console.log(user, "user");
  4;

  const handleNavigate = () => {
    navigate(`/new`);
    localStorage.removeItem("userLogged");
  };

  return (
    <div className="flex h-screen items-center flex-col justify-center">
      <div className="p-10 shadow-xl border-[1px] rounded-2xl">
        <h1 className="text-2xl text-center mb-2">Hey, {user.name}</h1>
        <h3 className="text-xl">This is your email: {user.email}</h3>
        <h3 className="text-xl">This is your password: {user.password}</h3>
        <div className="flex justify-center items-center mt-4">
          <button
            className="w-40 border-2 rounded-lg text-center"
            onClick={handleNavigate}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
