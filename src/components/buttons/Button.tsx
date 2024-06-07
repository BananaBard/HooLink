'use client'
import clsx from 'clsx'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({className, ...rest}: Props) => {
    return <button className={clsx(`bg-purple-600 py-3 px-2 rounded-md w-[128px] font-medium
    hover:transition-all hover:scale-105
    outline-none ring-teal-600 ring-offset-2
    text-white
    focus-visible:ring-2 
    disabled:bg-slate-500 disabled:text-gray-300 disabled:cursor-not-allowed disabled:shadow-none
    disabled:scale-100
    `, className)}{...rest}/>
}