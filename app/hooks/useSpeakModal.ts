import { create } from "zustand";


interface useSpeakProps{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useSpeakModal = create<useSpeakProps>((set) => ({
    isOpen:false,
    onOpen: () => set({isOpen:true}),
    onClose: () => set({isOpen:false})
}));


export default useSpeakModal;