import { create } from "zustand";


interface useloginModalProps{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useLoginModal = create<useloginModalProps>((set) => ({
    isOpen:false,
    onOpen: () => set({isOpen:true}),
    onClose: () => set({isOpen:false})
}));


export default useLoginModal;