import { css, Global } from "@emotion/react";

const GlobalStyle = () => {
    return (
        <Global
            styles={css`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-size: 16px;
                    background-color: #f6f8f9;
                }

                h1,
                p {
                    margin: 0;
                }

                button {
                    border: none;
                    cursor: pointer;
                }
            `}
        ></Global>
    );
};

export default GlobalStyle;
