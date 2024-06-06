import { MutableRefObject, ReactNode } from "react"

interface Dialog {
    dialogRef: MutableRefObject<HTMLDialogElement | null>,
    children: ReactNode
}

const Dialog = ({dialogRef, children}: Dialog) => {
    return (
        <dialog
        ref={dialogRef}
        className="bg-neutral-800 backdrop:bg-black/80 text-neutral-300 border border-neutral-400 p-14 rounded-lg mt-44">
            {children}
        </dialog>
    )
}

export default Dialog