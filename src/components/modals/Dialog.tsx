import { MutableRefObject, ReactNode } from "react"

interface Dialog {
    dialogRef: MutableRefObject<HTMLDialogElement | null>,
    children: ReactNode,
}

const Dialog = ({dialogRef, children}: Dialog) => {
    return (
        <dialog
        className={`bg-neutral-900 text-neutral-300 border border-neutral-400 px-6 py-8 rounded-lg`}
        ref={dialogRef}>
            {children}
        </dialog>
    )
}

export default Dialog