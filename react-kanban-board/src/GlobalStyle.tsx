import { css, Global } from "@emotion/react";

const GlobalStyle = () => {
    return (
        <Global
            styles={css`
                html,
                body {
                    padding: 0;
                    margin: 0;
                }

                h1,
                p {
                    margin: 0;
                }
            `}
        ></Global>
    );
};

export default GlobalStyle;
