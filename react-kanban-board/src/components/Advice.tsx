import styled from "@emotion/styled";
import { random } from "kadvice";
import { AdviceType } from "kadvice/dist/@types/type";
import { useEffect, useState } from "react";

const Advice = () => {
    const [randomAdvice, setRandomAdvice] = useState<AdviceType | null>(null);

    useEffect(() => {
        setRandomAdvice(random());
    }, []);

    if (!randomAdvice) {
        return null;
    }

    return (
        <Container>
            <div>{randomAdvice.message}</div>
            <div>{randomAdvice.author}</div>
        </Container>
    );
};

export default Advice;

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 1em;
    font-size: 14px;
    line-height: 20px;
    font-style: italic;
    div:nth-of-type(2) {
        font-size: 12px;
    }
`;
