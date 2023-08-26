import { useState, useEffect } from "react";


export default function useLoader() {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
        const loader = document.querySelector(".loader-container");
        if (!isLoading) {
            loader.classList.add("stop");
        }
    }, [isLoading]);
}