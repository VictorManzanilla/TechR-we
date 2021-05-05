import React from 'react'

const FilterCategory = ({keyword, setKeyword}) => {

     //step 3
     const handleSearchChange = (e) => {
        e.preventDefault()
        setKeyword(e.target.value.toLowerCase())
    }

    return (
        // step 2
        
               <input
                type="search"
                placeholder="filter"
                value={keyword}
                onChange={handleSearchChange}
                className="form-control mb-4"
            />

        
    )

}

export default FilterCategory