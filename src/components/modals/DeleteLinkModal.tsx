import { Button } from "../buttons/Button"

interface DeleteLinkModal {
    hideModal: () => void,
    handleDeleteLink: () => Promise<void>
}

const DeleteLinkModal = ({hideModal, handleDeleteLink}: DeleteLinkModal) => {
    return (
        <div className="flex flex-col gap-4">
        <div>
            <p>Deleting this links will remove it permanently.</p>
            <p>This action can not be undone.</p>
        </div>
        <div className="flex flex-row gap-8 justify-between">
        <button className="py-2 px-6 rounded-lg border-2 border-neutral-500" onClick={hideModal}>Cancel</button>
        <Button className="bg-red-800/60 border border-red-800 hover:border-transparent hover:bg-red-800 transition-all" onClick={handleDeleteLink}>Delete</Button>
        </div>
        </div>
    )
}

export default DeleteLinkModal