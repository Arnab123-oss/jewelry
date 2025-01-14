import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { Skeleton } from "../../../components/loader";
import {
  useDeleteProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
} from "../../../redux/api/productApi";
import { RootState } from "../../../redux/store";
import { responseToast } from "../../../utils/features";
import { ImSpinner } from "react-icons/im";

// const img =
//   "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const Productmanagement = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const params = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useProductDetailsQuery(params.id!);

  const { name, price, stock, category, photos } = data?.product || {
    name: "",
    photos: [""],
    category: "",
    stock: 0,
    price: 0,
  };

  let userId;
  let productId;

  if (user) userId = user?._id;
  if (data) productId = data?.product._id;

  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [photoUpdate, setPhotoUpdate] = useState<string[]>([]);
  const [photoFile, setPhotoFile] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const previews: string[] = [];
      const fileArray: File[] = [];

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            previews.push(reader.result);
            fileArray.push(file);

            if (previews.length === files.length) {
              setPhotoUpdate(previews);
              setPhotoFile(fileArray);
            }
          }
        };
      });
    }
  };
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    const formdata = new FormData();
    if (nameUpdate) formdata.set("name", nameUpdate);
    if (priceUpdate) formdata.set("price", priceUpdate.toString());
    if (stockUpdate !== undefined)
      formdata.set("stock", stockUpdate.toString());
    if (categoryUpdate) formdata.set("category", categoryUpdate);
    if (photoFile)
      photoFile.forEach((photo) => {
        formdata.append("photos", photo); // Append multiple photos
      });

    const res = await updateProduct({
      formdata,
      userId: userId!,
      productId: productId!,
    });

    if (res.data?.message || res.error) setIsProcessing(false);

    responseToast(res, navigate, "/admin/product");

    // const res = await updateProduct({
    //   formdata,
    //   userId: user?._id,
    //   productId: data?.product._id,
    // });
  };

  const deleteHandler = async () => {
    setIsProcessing(true);

    const res = await deleteProduct({
      userId: userId!,
      productId: productId!,
    });

    if (res.data?.message || res.error) setIsProcessing(false);

    responseToast(res, navigate, "/admin/product");

    // const res = await updateProduct({
    //   formdata,
    //   userId: user?._id,
    //   productId: data?.product._id,
    // });
  };

  useEffect(() => {
    if (data) {
      setNameUpdate(data.product.name);
      setPriceUpdate(data.product.price);
      setStockUpdate(data.product.stock);
      setCategoryUpdate(data.product.category);
    }
  }, [data]);

  if (isError) return <Navigate to={"/404"} />;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <section>
              <strong>ID - {data?.product._id}</strong>
              <img src={photos[0]} alt="Product" />
              <p>{name}</p>
              {stock > 0 ? (
                <span className="green">{stock} Available</span>
              ) : (
                <span className="red"> Not Available</span>
              )}
              <h3>₹{price}</h3>
            </section>
            <article>
              <button className="product-delete-btn" onClick={deleteHandler}>
                <FaTrash />
              </button>
              <form onSubmit={submitHandler}>
                <h2>Manage</h2>
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={nameUpdate}
                    onChange={(e) => setNameUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Price</label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={priceUpdate}
                    onChange={(e) => setPriceUpdate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label>Stock</label>
                  <input
                    type="number"
                    placeholder="Stock"
                    value={stockUpdate}
                    onChange={(e) => setStockUpdate(Number(e.target.value))}
                  />
                </div>

                <div>
                  <label>Category</label>
                  <input
                    type="text"
                    placeholder="eg. laptop, camera etc"
                    value={categoryUpdate}
                    onChange={(e) => setCategoryUpdate(e.target.value)}
                  />
                </div>

                <div>
                  <label>Photo</label>
                  <input type="file" onChange={changeImageHandler} />
                </div>

                {photoUpdate.length > 0 && (
                  <div className="photo-previews">
                    {photoUpdate.map((preview, index) => (
                      <img
                        key={index}
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        style={{ width: "50px", margin: "5px" }}
                      />
                    ))}
                  </div>
                )}
                <button type="submit">
                  {isProcessing ? (
                    <ImSpinner className="loading-icon" />
                  ) : (
                    "Update"
                  )}
                </button>
              </form>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

export default Productmanagement;
