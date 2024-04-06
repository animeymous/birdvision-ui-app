import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './productList.css'

function ProductList (){
    let [dummyJsonProduct, setDummyJsonProduct] = useState<Array<{id: number, title: string, thumbnail: string}>>();
    let [page, setPage] = useState(1);
    let [totalPages, setTotalPages] = useState(0);
  
    useEffect(() => {
      fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`)
      .then(res => res.json())
      .then((data: any)=> {
        if(data && data.products){
          setDummyJsonProduct(data.products)
          setTotalPages(data.total / 10)
        }
      });
  
    },[page])

    if (!dummyJsonProduct) {
        return null;
    }
    
      const selectPagination = (selectPage: number) => {
        if(
          selectPage >= 1 &&
          selectPage <= totalPages &&
          selectPage  !== page
        )
        setPage(selectPage)
      }
    
      return (
        <div>
          {
            dummyJsonProduct.length > 0 && (
              <div className='products'>
                {
                  dummyJsonProduct.map((prod) => {
                     return (
                    <Link key={prod.id} to={`/products/${prod.id}`}>
                      <div className='products__single'>
                        <img src={prod.thumbnail} alt={prod.title} />
                        <span> {prod.title} </span>
                      </div>
                      </Link>
                     )
                  })
                }
              </div>
            )
          }
    
          {
            dummyJsonProduct.length > 0 && 
            <div className='pagination'> 
              <span
              className={page > 1 ? "" : "pagination__disable"}
              onClick={()=> selectPagination(page - 1)}
              >
                👈
              </span>
              {
                [...Array(totalPages)].map((_, i) => {
                  return <span 
                  className={page === i+1? "pagination__selected": ""}
                  key={i} 
                  onClick={()=> selectPagination(i + 1)}> {i + 1} </span>
                })
              }
              <span
              className={page < totalPages ? "" : "pagination__disable"}
              onClick={()=> selectPagination(page + 1)}
              >
                👉
              </span>
            </div>
          }
        </div>
      )
}

export default ProductList