import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";

export default function Navbar({}) {
  const { data: session } = useSession();

  return (
    <div class="navbar bg-base-100 xl:px-32 md:px-10 xs:pr-8 py-6">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 24 24"
              strokeWidth="currentColor"
              className="fill-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabindex="0"
            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href={"/upload-song"}>Upload track</Link>
            </li>
            <li tabindex="0">
              <a class="justify-between">
                Parent
                <svg
                  class="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
              </a>
              <ul class="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <a class="btn btn-ghost normal-case text-xl">Leets</a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal p-0">
        </ul>
      </div>
      <div class="navbar-end ">
        {session?.user?.name ? (
          <div class="dropdown dropdown-end">
            <label
              tabindex="0"
              class="btn btn-ghost btn-circle avatar placeholder"
            >
              <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <span class="text-xl">{session?.user?.name.slice(0, 1)}</span>
              </div>
            </label>
            <ul
              tabindex="0"
              class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <p>{session?.user?.name.slice(0, 20)}</p>
              </li>
              <li>
                <a class="justify-between">Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={signOut}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <div class="dropdown dropdown-left">
            <label tabindex="0" class="btn m-1">
              Registrati
            </label>
            <ul
              tabindex="0"
              class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={() => signIn("spotify")}>Login with Spotify</a>
              </li>
              <li>
                <a onClick={() => signIn("google")}>Login with Google</a>
              </li>
              <li>
                <a onClick={() => signIn("facebook")}>Login with Facebook</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
