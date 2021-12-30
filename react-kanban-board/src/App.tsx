import Kanban from "./components/Kanban";
import GlobalStyle from "./GlobalStyle";
import styled from "@emotion/styled";
import KanbanContext from "./context/KanbanContext";

const App = () => {
    return (
        <KanbanContext>
            <AppLayout>
                <GlobalStyle />
                <Kanban />
            </AppLayout>
        </KanbanContext>
    );
};

export default App;

const AppLayout = styled.section`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #333;
`;
