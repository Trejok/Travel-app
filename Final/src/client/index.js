import { handleSubmit } from './js/formHandler'
import { dateNow } from './js/dateToday'
import { detection } from './js/detection'
import { dateCompare } from './js/dateCompare'



import './style/main.scss'


dateNow()
document.getElementById("generate").addEventListener('click', handleSubmit);


export {
    handleSubmit,
    dateNow,
    detection,
    dateCompare,

}

