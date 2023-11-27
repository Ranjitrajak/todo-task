import Card from "./Card"



const CardContainer = ({el,todos}) => {

  return (
    <div className="shadow-2xl p-5 w-[300px] bg-white   xl:w-[400px]  rounded-md">
      <h2 className="text-xl font-bold p-2 uppercase">{el}</h2>
      <div className="w-full h-[2px] bg-black opacity-30"></div>
      {
        todos.filter((todo) => todo.status === el).map((el,index) => {
          return <Card el={el} key={index}/>
        })
      }
    </div>
  )
}

export default CardContainer