import Kanban from "./components/Kanban";
import GlobalStyle from "./GlobalStyle";
import styled from "@emotion/styled";

const App = () => {
    return (
        <AppLayout>
            <GlobalStyle />
            <Kanban />
        </AppLayout>
    );
};

export default App;

const AppLayout = styled.section`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
