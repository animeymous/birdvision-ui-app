// ProductDetails.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  let [selectedProduct, setSelectedProduct] = useState<{ id: string; title: string; thumbnail: string } | undefined>();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        if(data && data.thumbnail){
            setSelectedProduct(data);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!selectedProduct) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Product Details</h1>
      <img src={selectedProduct.thumbnail} alt={selectedProduct.title} />
      <p>{selectedProduct?.title}</p>
    </div>
  );
}

export default ProductDetails;
