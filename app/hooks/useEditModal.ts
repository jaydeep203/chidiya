import { create } from "zustand";


interface useEditModalProps{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useEditModal = create<useEditModalProps>((set) => ({
    isOpen:false,
    onOpen: () => set({isOpen:true}),
    onClose: () => set({isOpen:false})
}));


export default useEditModal;