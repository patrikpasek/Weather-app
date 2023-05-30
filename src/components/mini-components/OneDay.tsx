import './Oneday.css'

const Oneday = (props: any) => {
    return <>
        <h3>{ props.pushDay }</h3>
        <span>{ props.pushDate }</span>
        <span>{ props.pushMaxTemp } °C / { props.pushMinTemp } °C</span>
    </>
}

export default Oneday