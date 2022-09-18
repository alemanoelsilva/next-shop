import Head from "next/head"
import React from "react"
import NavBar from "./NavBar"
import Title from "./Title"

type ContentProps = {
  title: string,
}

const Page = ({ title, children }: React.PropsWithChildren<ContentProps>) => {
  const headTitle = `${title} - Next Shop`
  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <NavBar />
      <main className="px-6 py-4">
        <Title>{title}</Title>
        {children}
      </main>
    </>
  )
}

export default Page