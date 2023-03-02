// Находит картинку на спрайте соответствующую количеству бомб вокруг
function showMinesCount(count) {
    let res ='';

    switch(count) {
        case 1:
            res = 'url(../img/one_cell.png)'
            break;
        case 2:
            res = 'url(../img/two_cell.png)'
            break;
        case 3:
            res = 'url(../img/three_cell.png)'
            break;
        case 4:
            res = 'url(../img/four_cell.png)'
            break;
        case 5:
            res = 'url(../img/five_cell.png)'
            break;
        case 6:
            res = 'url(../img/six_cell.png)'
            break;
        case 7:
            res = 'url(../img/seven_cell.png)'
            break;
        case 8:
            res = 'url(../img/eight_cell.png)'
            break;  
    }

    return res;
}

export default showMinesCount;