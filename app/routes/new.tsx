import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { addUser, findUserByEmailPassword } from "users";
import { v4 as uuidv4 } from "uuid";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Hareesh's Remix!" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log(request, "request");
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email) {
    return Response.json(
      { error: "Email and password are required!" },
      { status: 400 }
    );
  }

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  const existentUser = findUserByEmailPassword(email, password);

  const user = existentUser || newUser;

  if (!existentUser) {
    addUser(user);
  }

  return Response.json({ user }, { status: 200 });
};

export default function Index() {
  const data = useActionData<typeof action>();
  console.log(data, "data");

  return (
    <div className="flex h-screen items-center flex-col justify-center">
      <div>
        <div className="p-10 shadow-xl border-[1px] rounded-2xl">
          <h1 className="text-center text-3xl font-bold underline">LOGIN</h1>
          <Form method="post" className="space-y-6 mt-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Login
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
