// https://www.chess.com/play/computer

// console.log(documentElement);
console.log(Document);
console.log(document.documentElement);
console.log(document.body);

const board = document.querySelector('.board > ul');
const objectInfo = {
    name: '',
    move: [],
};

const movement = {
    black_pawn: [[1, 0], [2, 0], [1, -1], [1, 1]],
    white_pawn: [[-1, 0], [-2, 0], [-1, -1], [-1, 1]],
    rook: [[-1, 0], [1, 0], [0, -1], [0, 1]],
    bishop: [[-1, 1], [-1, -1], [1, -1], [1, 1]],
    knight: 
    [[-2, 1], [-1, 2],
    [1, 2], [2, 1],
    [2, -1], [1, -2],
    [-1, -2], [-2, -1]],
    queen: [[-1, 1], [-1, -1], [1, -1], [1, 1], [-1, 0], [1, 0], [0, -1], [0, 1]],
    king: [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]]
};


const character = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook', 'pawn'];
let count = 0;
const COLUMN = ['8', '7', '6', '5', '4', '3', '2', '1'];
const ROW = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let coordinations = [];
let able = [];
let result = [];
let save_Tag = null;
let turn = 'white';

function placeObject() {
    const {name, move} = objectInfo;

    const x = move[0];
    const y = move[1];

    const target = board.childNodes[y].childNodes[0].childNodes[x];
    target.classList.add(name);

    // const info = [y, x, target];
    // coordinations.push(info);
}

function init() {
    for (let i = 0; i < COLUMN.length; i++) {
        const ul = document.createElement('ul');
        const li = document.createElement('li');
        for (let j = 0; j < ROW.length; j++) {
            const matrix = document.createElement('li');
            matrix.textContent = [i, j];
            ul.append(matrix);
        }
        li.append(ul);
        board.append(li);
    }
   
    for (let i = 0; i < COLUMN.length; i++) {
        for (let j = 0; j < ROW.length; j++) {
            const target = board.childNodes[i].childNodes[0].childNodes[j];
            if (i % 2) {
                j % 2 === 0 ? target.classList.add('color_1') : target.classList.add('color_2');
            } else {
                j % 2 === 0 ? target.classList.add('color_2') : target.classList.add('color_1');
            }
        }
    }

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < ROW.length; j++) {
            i === 0 ? objectInfo.name = `black_${character[j]}` : objectInfo.name = `black_pawn`;
            objectInfo.move = [j, i];

            placeObject();
        }
    }

    for (let i = 6; i < 8; i++) {
        for (let j = 0; j < ROW.length; j++) {
            i === 7 ? objectInfo.name = `white_${character[j]}` : objectInfo.name = `white_pawn`;
            objectInfo.move = [j, i];

            placeObject();
        }
    }

    // console.log('board', board);
    
}

init();

function moveObject(tag, moveClass, special='') {
    const color = tag.classList[1].split('_')[0];
    const result = [];
    const coord = [];
    coord.push(Number(tag.textContent[0]));
    coord.push(Number(tag.textContent[2]));

    if (special === 'pawn') {
        let count = 1;
        if (coord[0] === 1 || coord[0] === 6) {
            count += 1;
        }

        for (let i = 0; i < count; i++) {
            const y = coord[0] + moveClass[i][0];
            const target = board.childNodes[y].childNodes[0].childNodes[coord[1]];
                
            if (!!target.classList[1]) {
                continue;
            }
            result.push(target);
        }
        for (let i = 2; i < moveClass.length; i++) {
            const y = coord[0] + moveClass[i][0];
            const x = coord[1] + moveClass[i][1];
            if (!board.childNodes[y].childNodes[0].childNodes[x]) {
                continue;
            }

            const target = board.childNodes[y].childNodes[0].childNodes[x]
            if (!target.classList[1]) {
                continue;
            }

            const targetColor = target.classList[1].split('_')[0];

            if (color !== targetColor) {
                result.push(target);
            }
        }
        console.log('폰 결과', result);
        return result;

    } else if (special === 'knight') {
        for (let i = 0; i < moveClass.length; i++) {
            const y = coord[0] + moveClass[i][0];
            const x = coord[1] + moveClass[i][1];
            
            if (!board.childNodes[y]) {
                continue;
            }

            if (!board.childNodes[y].childNodes[0].childNodes[x]) {
                continue;
            }

            const target = board.childNodes[y].childNodes[0].childNodes[x];
            
            if (!target.classList[1]) {
                result.push(target);
                continue;
            }

            const targetColor = target.classList[1].split('_')[0];

            if (color !== targetColor) {
                result.push(target);
            }
        }
        console.log('나이트 결과', result);
        return result;

    // } else if (special === 'king') {
    //     // 모든 기물은 왕을 먹지 못함
    //     // 왕은 체크, 체크메이트로 공격
    //     let y = coord[0];
    //     let x = coord[1];
    //     for (let j = 0; j < moveClass.length; j++) {
    //         y += moveClass[i][0];
    //         x += moveClass[i][1];

    //         if (!board.childNodes[y]) {
    //             break;
    //         }

    //         if (!board.childNodes[y].childNodes[0].childNodes[x]) {
    //             break;
    //         }

    //         const target = board.childNodes[y].childNodes[0].childNodes[x];
    //         result.push(target);

    //         if (!target.classList[1]) {
    //             continue;
    //         }

    //         const targetColor = target.classList[1].split('_')[0];

    //         if (color === targetColor) { 
    //             result.pop()
    //         }
    //         break;
    //     }
    //     console.log('왕 결과', ...result);  
    //     return result;

    } else {
        for (let i = 0; i < moveClass.length; i++) {
            let y = coord[0];
            let x = coord[1];
            for (let j = 0; j < 8; j++) {
                y += moveClass[i][0];
                x += moveClass[i][1];

                if (!board.childNodes[y]) {
                    break;
                }

                if (!board.childNodes[y].childNodes[0].childNodes[x]) {
                    break;
                }

                const target = board.childNodes[y].childNodes[0].childNodes[x];
                result.push(target);

                if (!target.classList[1]) {
                    continue;
                }

                const targetColor = target.classList[1].split('_')[0];

                if (color === targetColor) { 
                    result.pop()
                }
                break;
            }
        }
        // console.log('일반 기물 결과', result);  
        return result;
    }
}


board.addEventListener('click', (event) => {
    let clicked = event.target;

    // 1. 검/백 번갈아가면서 기물을 움직여야함
    // if (!clicked.classList[1].contains(turn)) {
    
    // }

    // console.log('clicked', clicked);
    // console.log('before');
    // console.log('result', result);
    // console.log('save_tag', save_Tag);
    // console.log(result.includes(clicked));
    
    if (result.includes(clicked)) {
        const objInfo = save_Tag.classList[1];
        save_Tag.classList.remove(objInfo); // 없으면 클릭하고 움직일 기물이 원래있던 위치에서 사라지지않음

        console.log(clicked, clicked.classList.length);

        if (clicked.classList.length > 1) {
            let temp = clicked.classList[1]; // classList[1]을 담을 변수 반드시 필요
            clicked.classList.remove(temp); // 클릭한 태그의 클래스리스트에서 temp 삭제
        }

        clicked.classList.add(objInfo);
        clicked = null; // 없으면 기존에 클릭한 말이 다시 이동함
    } 

    result = [];
    save_Tag = null;

    // console.log('after');
    // console.log('result', result);
    // console.log('save_tag', save_Tag);
    // console.log(result.includes(clicked));

    // 상대 말을 먹을때 classList undefined 에러 발생
    // save_tag에는 기물의 클래스에 담겨있지 않음

    // 상대 기물 먹을때 그 기물의 클래스를 태그에서 삭제해야함
    // 2:00 완료

    // 1. 검/백 번갈아가면서 기물을 움직여야함
    // 2. 어떠한 기물이라도 왕을 먹으면 안됨. 왕은 못먹게해야함
    // 3. css 추가

    // console.log('클릭', clicked);

    if (!clicked || !clicked.classList[1]) {
    // if (!clicked.classList[1] || !clicked) {
        return false;
    }

    // console.log(clicked.classList);
    // console.log(!clicked.classList.contains(turn));

    // return false;

    // console.log('------');

    const objInfo = clicked.classList[1];
    const name = objInfo.split('_')[1];

    if (name === 'pawn') {
        // console.log('----');
        result = moveObject(clicked, movement[objInfo], name);
        save_Tag = clicked;
    } else {
        result = moveObject(clicked, movement[name], name);
        save_Tag = clicked;
    }

    // console.log('_result', result);

    // if (!!result.length) {
    //     console.log('결과', result);
    //     console.log('-------');

    //     console.log(typeof result, result.includes(clicked));
    // }
});



    // result에 아무것도 담겨있지 않을 때:
    //  clicked.classList[1]이 거짓이면 반환

    // result에 태그가 담겨있을 때:
    //  clicked 가 result에 들어있지 않으면 return false 
    // 기존에 클릭한 말이 아닌 새로운 말을 움직일 때
    //  result 배열 초기화 필요
    //  다시 result에 아무것도 담겨있지 않을 때 실행하는 코드 실행

    // addEventListener 최초실행?

    // 큰 조건은 result에 데이터가 할당됬냐, 할당되지 않았냐가 전부
    // result에 태그가 할당 됬을 때 실행하는 코드가 중요

    // result 배열에 태그가 들어있냐 안들어있냐 로 크게 볼 수 있음
    // result에 태그가 들어있지 않은 경우

    // '최초'로 새로운 기물을 선택하고 그 기물을 옮기는 과정임
    // clicked의 클래스리스트의 [1]번째 인덱스가 있는지 없는지 확인 필요
    // 있으면 기물을 선택, 없으면 기물이 선택되지 않음
    // 없으면 그대로 거짓 반환
    // 있으면 moveObject로부터 값 받아 result에 대입

    // result에 태그가 들어있는 경우
    
    // 크게 두 가지 경우로 나뉨
    // 선택한 기물에 대해서 옮기거나, 혹은 새 기물을 선택하는 경우임
    // 선택한 기물에 대해서 옮길때는
    // clicked가 result 객체 (배열 x) 에 포함이 되었는지 조건문을 돌려야 하고
    // 새 기물을 선택하는 경우는
    // result 객체를 초기화를 시켜줘야하고 다시 moveObject로부터 값을 받아 result에 할당해야함
    // result에 태그가 들어있을 때는 clicked에 따라서 조건문을 만들면 쉬움

    // 지금은 어떠한 조건문도 없기 때문에 
    // 기존에 클릭한 기물이 움직일 수 있는 좌표가 result에 들어가도
    // 새로 선택한 기물의 이동가능좌표가 result에 할당됨
    // console.log(typeof result, result.find(clicked));
