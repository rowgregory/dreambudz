import LoginForm from '@/app/forms/LoginForm'
import LoginLogoSVG from '@/public/svg/LoginLogoSVG'
import Link from 'next/link'

const Login = () => {
  return (
    <div className="flex flex-col min-h-dvh md:justify-center md:items-center">
      <div className="md:max-w-[600px] w-full h-full md:max-h-[600px] flex flex-col py-7 md:py-12 px-3 md:px-20 items-center justify-center md:aspect-square md:shadow-shadow1 md:rounded-[32px]">
        <LoginLogoSVG />
        <LoginForm />
        <Link href="/auth/register" className="text-lime-500 text-sm text-center mt-10 font-medium">
          Register
        </Link>
      </div>
    </div>
  )
}

export default Login
