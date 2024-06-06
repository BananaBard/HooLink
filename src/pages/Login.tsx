import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import GoogleLoginBtn from '../components/buttons/GoogleLoginBtn';
import GithubLoginBtn from '../components/buttons/GithubLoginBtn';
import "../index.css";
import Pages from '../utils/pages.utils';

export default function Login() {
  const {signInWithGithub, user} = useAuth()

  const handleGithubLogin = async() => {
    console.log(signInWithGithub)
    await signInWithGithub()
  }
  console.log({user})
  if (user) return <Navigate to={Pages.dashboard}/>

  return (
    <main className="py-4 px-4 flex flex-col justify-start bg-neutral-900 flex-grow">
      <section className="lg:max-w-[1120px] lg:mx-auto lg:mt-44 text-center">
      <form className="border-2 rounded-md border-neutral-600 py-4 pb-8 px-8 flex flex-col gap-2 max-w-sm">
        <h1 className="text-3xl text-white font-semibold">Login</h1>
        <h2 className="text-white text-pretty py-4">Log in using your favorite social media provider to start using <strong>HooLink</strong> </h2>
        <GithubLoginBtn onClick={handleGithubLogin}/>
        <GoogleLoginBtn/>
      </form>
      </section>
    </main>
  );
}
