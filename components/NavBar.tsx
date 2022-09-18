import Link from "next/link"
import React from "react"
import { useSignOut, useUser } from "../hooks/users"

type ContentProps = {}

export const NavBar: React.FC<ContentProps> = () => {
  const user = useUser()
  const { signOut } = useSignOut()

  return (
    <nav className="px-4 py-1 text-sm">
      <ul className="flex gap-2">
        <li className="text-lg font-extrabold">
          <Link href="/">
            <a>
              Next Shop
            </a>
          </Link>
        </li>

        <li role="separator" className="flex-1" />

        {user ? (
          <>
          <li>
            <Link href="/cart">
              <a>
                Cart
              </a>
            </Link>
          </li>
            <li>
              {user.name}
            </li>
            <li>
              <button onClick={signOut}>
                Sign Out
              </button>
            </li>
          </>

        ) : (
          <li>
            <Link href="/sign-in">
              <a>
                Sign in
              </a>
            </Link>
          </li>
        )}

      </ul>
    </nav>
  )
}

export default NavBar
