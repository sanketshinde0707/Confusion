import { trigger, state, style, animate, transition } from '@angular/animations';

export function visibility() {
    //trigger('triggername',[state('statename',what to do)])
    return trigger('visibility',[
                state('shown', style({
                transform: 'scale(1.0)',
                opacity: 1,
                })),
                state('hidden', style({
                transform: 'scale(0.5)',
                opacity: 0,
                })),
                transition('* => *', animate('0.5s ease-in-out')) 
                //transition(from state 1 => to state 2 , animate('time and animation'))
            ])
}   

export function flyInOut() {
    return trigger('flyInOut', [
        state('*' , style({
            opacity: 1,
            transform: 'translateX(0)' /* the view is where it is originally */
        })),
        transition(':enter' /*when the view enters from void to any state */, [
            style({ transform: 'translateX(-100%)', /*the view is initially on the complete left side */
                    opacity: 0 }),
            animate('500ms ease-in')
        ]),
        transition(':leave' /*when the view leaves any state to void  */, [
            animate('500ms ease-out', style({
                transform: 'translateX(100%)',
                opacity: 0
            }))
        ])
    ])
}

export function expand() {
    return trigger('expand', [
        state('*', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition(':enter' /*when the view enters from void to any state */,[
                style({
            transform: 'translateY(-50%)',  /*its like translateY(-50%) to translateX(0) */
            opacity: 0 
        }),
        animate('500ms ease-in' /*when the view leaves any state to void  */, style({
            transform: 'translateX(0)',
            opacity: 1
        }))     
    ])
    ]);
}