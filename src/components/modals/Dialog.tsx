import { MutableRefObject, ReactNode } from "react"

interface Dialog {
    dialogRef: MutableRefObject<HTMLDialogElement | null>,
    children: ReactNode,
}

const Dialog = ({dialogRef, children}: Dialog) => {
    return (
        <dialog
        className={`bg-neutral-800 text-neutral-300 border border-neutral-400 p-14 rounded-lg max-w-fit`}
        ref={dialogRef}>
            {children}
        </dialog>
    )
}

export default Dialog