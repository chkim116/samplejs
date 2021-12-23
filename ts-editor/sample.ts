// 샘플 글 출처 https://brunch.co.kr/@dogpalee/51

// img
export type ImgType = "img" | "img-grid";

// default
export type TagName = "p" | "h4" | "br" | "div" | "span";
export type Type = "text" | ImgType;
export type Style = { [key: string]: string };
export type Text = string;

export interface ImgTextData {
    url?: string;
    caption?: string;
}

export interface TextData extends ImgTextData {
    tagName?: TagName;
    type?: Type;
    style?: Style;
    text?: Text;
    data?: TextData[];
}

export interface TextDataWrapper extends TextData {
    id: number;
    tagName: TagName;
}

export const sampleTextData: TextDataWrapper[] = [
    {
        id: 1,
        tagName: "p",
        type: "text",
        data: [
            {
                type: "text",
                tagName: "span",
                style: { color: "#eb4b6a" },
                data: [
                    {
                        type: "text",
                        text: "테이블: 테이블 다리는 개가 쉬하는 곳, 테이블 위는 가끔 사람이 치우고 밥 먹는 곳.",
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        tagName: "h4",
        type: "text",
        text: "1, 붕어빵에 붕어는 없다?.",
        data: [
            {
                type: "text",
                tagName: "p",
                text: "1, 붕어빵에 붕어는 없다.",
                data: [
                    {
                        type: "text",
                        text: "(슬퍼할 일은 아니에요)",
                    },
                ],
            },
            { tagName: "br" },
            { tagName: "br" },
        ],
    },
    {
        id: 3,
        tagName: "p",
        type: "text",
        style: { color: "gray" },
        data: [
            {
                tagName: "span",
                type: "text",
                style: { color: "red" },
                data: [
                    {
                        type: "text",
                        text: "테이블: 테이블 다리는 개가 쉬하는 곳, 테이블 위는 가끔 사람이 치우고 밥 먹는 곳.",
                        data: [
                            {
                                tagName: "span",
                                type: "text",
                                style: { color: "blue" },
                                text: "테이dd.",
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 4,
        tagName: "p",
        type: "text",
        data: [
            {
                type: "text",
                style: { color: "red" },
                text: "?",
                data: [
                    {
                        type: "text",
                        style: { color: "blue" },
                        text: "침대: 귀퉁이는 내 자리, 중간부터 끝까진 개자리.",
                    },
                    {
                        type: "text",
                        style: { color: "#eb4b6a" },
                        data: [
                            {
                                type: "text",
                                text: "테이블: 테이블 다리는 개가 쉬하는 곳, 테이블 위는 가끔 사람이 치우고 밥 먹는 곳.",
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 5,
        tagName: "p",
        type: "text",
        data: [
            {
                type: "text",
                text: "21년 1월 줌 연수할 때도 행정직렬에 비해 소수인 직업상담직렬은 구체적으로 무슨 일을 하는지 궁금해 몇 명의 동기가 질문을 던졌지만 답변은 좀체 명확하지 않았다. 어떤 선배님은 직렬의 이름에 걸맞은 업무를 한다고 하면서 상담업무의 전문성을 키우는 것이 좋다고까지 했었다. 하지만 현실은 달랐다. 나 같은 경우는 처음 고용유지 지원금 업무를 맡았을 때 엑셀 학원을 다니고 싶었다. ",
            },
        ],
    },
    {
        id: 6,
        tagName: "div",
        type: "img",
        data: [
            {
                type: "img",
                url: "http://t1.daumcdn.net/brunch/service/user/5bb4/image/mED7NoOLiNSQII6S1labCniTpsU",
            },
        ],
        caption: "나와 함께 열일하고 있는 친구들",
    },
    {
        id: 7,
        tagName: "div",
        type: "img-grid",
        data: [
            {
                type: "img",
                url: "http://t1.daumcdn.net/brunch/service/user/2tcO/image/KyoW00nSQFYRR0xQdwH4hy770ig.png",
            },
            {
                type: "img",
                url: "http://t1.daumcdn.net/brunch/service/user/2tcO/image/0CPenEBy3jPk8KXprn-eMG5cdJo.png",
            },
        ],
        caption:
            "\u0027개는 훌륭하다\u0027 본방사수 하는김에 본인도 한번 출연신청 해보는건 어떨지 물어보고 싶다",
    },
];
