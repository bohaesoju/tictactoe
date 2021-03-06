const body : HTMLElement = document.body;
const table : HTMLTableElement = document.createElement('table');
const result : HTMLElement = document.createElement('h1')
const lines : any[] = [];
const cells : any[] = [];
let turn : string = 'X';
let total : number = 0;
const callback = (e:Event) : void => {
    let whichLine = lines.indexOf(e.target.parentNode);
    let whichCell = cells[whichLine].indexOf(e.target);
    if(cells[whichLine][whichCell].textContent !== ''){
    } else { // 빈칸이면
        cells[whichLine][whichCell].textContent = turn;
        let finish : boolean = false;
        // 가로줄 검사
        if(cells[whichLine][0].textContent === turn && cells[whichLine][1].textContent === turn && cells[whichLine][2].textContent === turn){
            finish = true;
        }
        //세로줄 검사
        if(cells[0][whichCell].textContent === turn && cells[1][whichCell].textContent === turn && cells[2][whichCell].textContent === turn)
            finish = true;
        //대각선 검사
        if(whichLine - whichCell === 0){
            if(cells[0][0].textContent === turn && cells[1][1].textContent === turn && cells[2][2].textContent === turn){
                finish = true;
            }
        }

        if(Math.abs(whichLine - whichCell) === 2){
            if(cells[0][2].textContent === turn && cells[1][1].textContent === turn && cells[2][0].textContent === turn){
                finish = true;
            }
        }
        total += 1;

        if(total === 9 && !finish){
            init('draw');
        }

        if(finish){ //다찼으면
            init('not draw');
        } else { //다 안찼으면
            turn === 'X' ? turn = 'O' : turn = 'X';
        }
    }
};

function init(e : string) : void {
    if(e === 'draw'){
        result.textContent = ('무승부 !')
    } else {
        result.textContent = (turn + '님이 승리 !')
    }
    total= 0;
    turn = 'X';
    cells.forEach((e) => {
        e.forEach((i) => {
            i.textContent = '';
        })
    })
}

for(let i = 1; i <= 3; i += 1){
    let line : HTMLTableRowElement = document.createElement('tr');
    lines.push(line);
    cells.push([]);
    for(let j = 1; j <= 3; j += 1){
        let cell : HTMLTableCellElement = document.createElement('td');
        cell.addEventListener('click', callback);
        line.appendChild(cell);
        cells[i - 1].push(cell)
    }
    table.appendChild(line);
}
body.appendChild(table);
body.appendChild(result);
