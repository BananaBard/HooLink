import { Button } from "../buttons/Button"

interface DeleteModal {
    hideModal: () => void,
    handleDeleteLink: () => Promise<void>
}

const DeleteModal = ({hideModal, handleDeleteLink}: DeleteModal) => {
    return (
        <div className="flex flex-col gap-8">
        <div>
            <p>Deleting this links will remove it permanently.</p>
            <p>This action can not be undone.</p>
        </div>
        <div className="flex flex-row justify-between">
        <button className="py-2 px-6 rounded-lg border-2 border-neutral-500" onClick={hideModal}>Cancel</button>
        <Button className="bg-red-600" onClick={handleDeleteLink}>Delete</Button>
        </div>
        </div>
    )
}

export default DeleteModal