import '../styles/globals.css'
import { AppProps } from 'next/app'
import { ButtonHTMLAttributes, FC } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // no custom props
}

const Title: FC<ButtonProps> = ({  }) => {
  return null
}

export default Title