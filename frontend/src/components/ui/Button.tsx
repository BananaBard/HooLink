'use client'
import clsx from 'clsx'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({className, ...rest}: Props) => {
    return <button className={clsx(`bg-teal-300 py-6 px-3 rounded-xl w-[128px] text-black font-semibold
    hover:transition-all hover:shadow-md hover:shadow-teal-300
    outline-none ring-teal-600 ring-offset-2
    focus-visible:ring-2 focus:scale-[0.98]
    disabled:bg-slate-500 disabled:text-gray-300 disabled:cursor-not-allowed disabled:shadow-none
    `, className)}{...rest}/>
}