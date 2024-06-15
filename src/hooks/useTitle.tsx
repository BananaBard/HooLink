import { useEffect } from "react";

export default function useTitle(title: string) {
    useEffect(() =>{
        const previousTitle = document.title
        document.title = title
        return () => {
            document.title = previousTitle
        }
    }, [])
}