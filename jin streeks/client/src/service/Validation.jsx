import { getStreek,editStreek } from "./api";

const today = new Date(new Date().getTime());
const nextday = new Date(new Date().getTime() + 24*60*60*1000);


const realtoday = `${today.getDate()}${today.getMonth()}${today.getFullYear()}`;
const realnextday = `${nextday.getDate()}${nextday.getMonth()}${nextday.getFullYear()}`;

// const initial = {
//     name:"",
//     time:"",
//     current:0,
//     done:false,
//     foreverDone: false,
//     streekDay:``,
//     streekNextDay:``
// }

// const [streek, setStreek] = useState(initial);

export const validate = async ()=>{
    const response = await getStreek();
    let data;
    if(response){
        data = response.data;
    }
    // setStreek(data);
    console.log(data);

    if(data){
    data.map((item)=>{
        if(item.foreverDone === false){
            if(item.current == item.time){
                item.foreverDone = true;
                editValidation(item,item.id)
            }
            else if(item.streekDay != realtoday){
                if(item.done == false){
                    item.current = 0;
                    editValidation(item,item.id)
                }
            }
            else{
                item.done = false;
                editValidation(item,item.id)
            }
        }
    })
    }
}

const editValidation = async (data,id)=>{
    await editStreek(data,id)
}