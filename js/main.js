$(document).ready(function(){

    let getValue  = function (value) {
        let r = 0
        console.log(value)
        if (value > 22) {
            r = value - 22
        } else {
            r = value
        }
        console.log(parseInt(r))
        return parseInt(r);
    }

    let sumDigits = function (value) {
        let sum = 0;
        while (value) {
            sum += value % 10;
            value = Math.floor(value / 10);
        }
        return sum
    }

    let getPotByDate = function (dateValue) {
        let pot = {}
        let date = new Date(dateValue);
        let year = date.getFullYear();
        let month =  date.getMonth()+1;
        let day = date.getDate();
        console.log(date)
        console.log(pot)


        pot[0] = getValue(day)
        pot[1] = getValue(month)
        pot[2] = getValue(sumDigits(year))
        pot[3] = getValue(pot[0] + pot[1])
        pot[4] = getValue(pot[1] + pot[2])
        pot[5] = getValue(pot[3] + pot[4])

        return pot
    }

    let getComposite = function (pot1, pot2) {
        let sumPot = $.map(pot1, function (num, idx) {
            return getValue((num + pot2[idx]));
        });
        return sumPot
    }

    let drawTrapezium = function (type) {
        let pots = $('#'+type + ' .pot').length + 1
        $('#'+type).append('<div class="pot trapezium-' + pots +'"></div>')
        return pots
    }

    let drawPot = function (pot, type) {
        let pot_index = drawTrapezium(type)
        let pot_element = $('#'+type + ' .trapezium-' + pot_index)
        pot_position = pot_element.offset()

        let line_1 = '<div class="line-1">' +
            '<i class="pot-value-1">'+ pot[0] +'</i>' +
            '<i class="pot-value-1">'+ pot[1] +'</i>' +
            '<i class="pot-value-1">'+ pot[2] +'</i></div>'

        let line_2 = '<div class="line-2">' +
            '<i class="pot-value-1">'+ pot[3] +'</i>' +
            '<i class="pot-value-1">'+ pot[4] +'</i></div>'

        let line_3 = '<div class="line-3"><i class="pot-value-1">'+ pot[5] +'</i></div>'

        $(pot_element).append(line_1)
        $(pot_element).append(line_2)
        $(pot_element).append(line_3)
    }

    $('#main-pot').submit(function (event){

        let date_pot = getPotByDate($('#selection-date').val())
        let birth_pot = getPotByDate($('#birth-date').val())
        let composit_pot = getComposite(date_pot, birth_pot)
        console.log(birth_pot)
        console.log(composit_pot)

        drawPot(date_pot, 'date-pots')
        drawPot(birth_pot, 'birth-pots')
        drawPot(composit_pot, 'composite-pots')

        event.preventDefault();
        console.log();
    })
})