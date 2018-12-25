/**
 * Sums all of the cells in columnToTotal that are in the same row as a match in the columnToSearch.
 * A match is determined by checking that all of the values inside of valuesToMatchInSearch
 * (as delimited by the delimiter) are present in a cell within columnToSearch.
 *
 * As an example if you had:
 * <pre>
 * [   |   a  |   b       | c     | d   ]
 * [ 1 | item |   tags    | total | 1,2 ]
 * [ 2 |  1   |  1,2      | 1000  |     ]
 * [ 3 |  2   |  1,2,3    | 2000  | .   ]
 * [ 4 |  3   |  4,5      | 8000  | .   ]
 * </pre>
 * And you wanted to sum the total column for every item that included the tags 1 and 2, you could
 * use this function like so: sumIfMatchingMultipleValues(B:B, C:C, D1) and be returned 3000.
 *
 * @param {B:B} columnToSearch The column we are going to look in for matches
 * @param {C:C} columnToTotal The column we are going to total, if there are matches
 * @param {D1} valuesToMatchInSearch The cell where we can find a list of values, or the list of values as a string
 * @return the sum of all the matching values
 * @customfunction
 */
function sumIfMatchingMultipleValues(columnToSearch, columnToTotal, valuesToMatchInSearch) {
  var values = valuesToMatchInSearch.split(",")

  const columns = columnToSearch.map(
    function(col){
       return col.map(
        function(c){
          return c.split(",")
        }
      )[0]
    }
  )

  return columns.reduce(
    function(acc, col, index){
      if(values.every(function(val){ return col.indexOf(val) >= 0 })){
        return acc + columnToTotal[index][0]
      } else {
        return acc
      }
    }, 0
  )
}
// Use like this:
sumIfMatchingMultipleValues([["1,2"],["2,3"],["1,3"]], [[300],[400],[500]], "1,2")
