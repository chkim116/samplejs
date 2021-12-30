import Kanban from "./components/Kanban";
import GlobalStyle from "./GlobalStyle";
import styled from "@emotion/styled";
import KanbanContext from "./context/KanbanContext";
import { createApi } from "unsplash-js";
import { useEffect, useState } from "react";

const App = () => {
    const [bgImg, setBgImg] = useState("");
    const api = createApi({
        accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY || "",
    });

    function setStorage(key: string, value: string) {
        localStorage.setItem(key, value);
    }
    function getStorage(key: string) {
        return localStorage.getItem(key);
    }

    function getRandomPhoto() {
        api.photos
            .getRandom({
                orientation: "landscape",
                query: "black landscape",
            })
            .then((res) => {
                if (res.response) {
                    const img = (res.response as any).urls.full;
                    setBgImg(img);
                    setStorage("bgImg", img);
                    setStorage(
                        "bgfreq",
                        new Date().setHours(24, 0, 0, 0).toString()
                    );
                }
            })
            .catch((err) => console.error(err));
    }

    useEffect(() => {
        const midNight = getStorage("bgfreq");

        if (!midNight) {
            getRandomPhoto();
            return;
        }

        const cntTime = Date.now();
        if (cntTime >= +midNight) {
            getRandomPhoto();
            setStorage("bgfreq", new Date().setHours(24, 0, 0, 0).toString());
        } else {
            const bg = getStorage("bgImg");
            bg ? setBgImg(bg) : getRandomPhoto();
        }
    }, [getStorage, getRandomPhoto]);

    return (
        <KanbanContext>
            <AppLayout bgImg={bgImg}>
                <GlobalStyle />
                <Kanban />
            </AppLayout>
        </KanbanContext>
    );
};

export default App;

const AppLayout = styled.section<{ bgImg: string }>`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #333;
    background-image: url(${({ bgImg }) => bgImg});
    background-size: cover;
    background-position: center;
`;
