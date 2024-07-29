const Filter = ({filterData, handleNewFilter,}) => {
return(
<form>
    <div>
      filter shown with: <input value ={filterData} onChange ={handleNewFilter}/>
    </div>
</form>
)
}

export default Filter;