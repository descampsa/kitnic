pcbStackup  = require('pcb-stackup')

options =
    # copper finish
    cf:
        bare    : '#C87533'
        gold    : 'goldenrod'
        'Ni/Au' : 'whitesmoke'
        hasl    : 'silver'

    # soldermask
    sm:
        red    : 'rgba(139,   0,   0, 0.90)'
        orange : 'rgba(195, 107,   0, 0.90)'
        yellow : 'rgba(255, 255, 102, 0.50)'
        green  : 'rgba(  0,  68,   0, 0.90)'
        blue   : 'rgba(  0,  30, 104, 0.90)'
        purple : 'rgba( 46,   0,  81, 0.90)'
        black  : 'rgba(  0,   0,   0, 0.90)'
        white  : 'rgba(255, 255, 255, 0.90)'

    # silkscreen
    ss:
        red    : 'red'
        yellow : 'yellow'
        green  : 'green'
        blue   : 'blue'
        black  : 'black'
        white  : 'white'

styleToOption = ({copperFinish, solderMask, silkScreen}) ->
    fr4 : '#4D542C'
    cu  : 'lightgrey'
    cf  : options.cf[copperFinish]
    sm  : options.sm[solderMask]
    ss  : options.ss[silkScreen]
    sp  : 'rgba(0, 0, 0, 0.0)'
    out : 'black'

colorToStyle =
    green:
        solderMask   : 'green'
        copperFinish : 'gold'
        silkScreen   : 'white'
    red:
        solderMask   : 'red'
        copperFinish : 'gold'
        silkScreen   : 'white'
    blue:
        solderMask   : 'blue'
        copperFinish : 'hasl'
        silkScreen   : 'white'
    black:
        solderMask   : 'black'
        copperFinish : 'hasl'
        silkScreen   : 'white'
    white:
        solderMask   : 'white'
        copperFinish : 'gold'
        silkScreen   : 'black'
    orange:
        solderMask   : 'orange'
        copperFinish : 'hasl'
        silkScreen   : 'white'
    purple:
        solderMask   : 'purple'
        copperFinish : 'gold'
        silkScreen   : 'white'
    yellow:
        solderMask   : 'yellow'
        copperFinish : 'gold'
        silkScreen   : 'black'

module.exports = (layers, color, callback) ->
    pcbStackup layers,
        color: styleToOption(colorToStyle[color])
        outlineGapFill: 0.011
    , callback
