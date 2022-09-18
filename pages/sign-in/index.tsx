import { NextPage } from "next"
import { useRouter } from 'next/router'
import React, { useState } from "react"
import Button from "../../components/Button"
import Field from "../../components/Field"
import Input from "../../components/Input"
import Page from "../../components/Page"
import { useEmailSignIn } from "../../hooks/users"

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const SignInPage: NextPage = ({ }) => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn, signInError, signInLoading } = useEmailSignIn()

  const onChangeEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const onChangePasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // await sleep(5000)
    // run the http call
    const signInSuccessfully = await signIn(email, password)
    if (signInSuccessfully) {
      router.push('/')
    }
  }

  return (
    <Page title="Sign In">
      <form onSubmit={handleSubmit}>
        <Field label="Email">
          <Input type="email" value={email} required onChange={onChangeEmailHandler} />
        </Field>

        <Field label="Password">
          <Input type="password" value={password} required onChange={onChangePasswordHandler} />
        </Field>

        {signInError && <p className="text-red-600">Invalid Credentials</p>}

        {signInLoading ? (
          <p>Loading...</p>
        ) : (
          <Button type="submit">Sign In</Button>
        )}

      </form>
    </Page>
  )
}

export default SignInPage