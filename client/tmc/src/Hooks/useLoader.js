import { useState, useEffect, useCallback } from "react";


export default function useLoader() {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    const stopLoading = useCallback(() => {
        const loader = document.querySelector(".loader-container");
        if (isLoading !== true) {
            loader.classList.add("stop");
        }
    }, [isLoading])
    useEffect(() => {
        // setInterval(() => {
        stopLoading();

        // }, 1000);

    }, [stopLoading])
}